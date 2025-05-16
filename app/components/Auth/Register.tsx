import React, { useState, useEffect } from "react";
import { API_URLS } from "../apiconfig/api_urls";
import { auth } from "./firebase";
import {
//   RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import axiosInstance from "../apiconfig/axios";
import Image from "next/image";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void; // Make this optional
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    dob: "",
    gender: "",
    firebase_user_id: "",
  });

  const [error, setError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [verificationId, setVerificationId] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpMessage, setOtpMessage] = useState<string>("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set up recaptcha on component mount
  useEffect(() => {
    if (isOpen) {
      setupRecaptcha();
    }

    return () => {
      // Cleanup any recaptcha containers when component unmounts
      const recaptchaContainer = document.getElementById("recaptcha-container");
      if (recaptchaContainer) {
        recaptchaContainer.innerHTML = "";
      }
    };
  }, [isOpen]);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              // reCAPTCHA solved, allow sending OTP
            },
          }
        );
      } catch (error) {
        console.error("Error setting up reCAPTCHA:", error);
        setError("Failed to initialize verification service");
      }
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!formData.full_name.trim()) {
      errors.full_name = "Name is required";
    } else if (formData.full_name.length < 2) {
      errors.full_name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Phone validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone_number)) {
      errors.phone_number = "Please enter a valid phone number";
    }

    // Date of birth validation
    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        errors.dob = "You must be at least 18 years old";
      }
    }

    // Gender validation
    if (!formData.gender) {
      errors.gender = "Please select a gender";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSendOTP = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!formData.phone_number) {
      setFormErrors((prev) => ({
        ...prev,
        phone_number: "Phone number is required",
      }));
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setupRecaptcha();

      const phoneNumber = formData.phone_number.startsWith("+")
        ? formData.phone_number
        : `+${formData.phone_number}`;

      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      setVerificationId(confirmationResult.verificationId);
      setOtpSent(true);
      setOtpMessage("OTP has been sent to your phone number");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(
        "Failed to send OTP. Please check your phone number and try again."
      );

      // Reset recaptcha for retry
      window.recaptchaVerifier.clear();
      setupRecaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOTP = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Create the credential
      const credential = PhoneAuthProvider.credential(verificationId, otp);

      // Sign in with the credential
      const userCredential = await signInWithCredential(auth, credential);

      // Get the user's UID from the auth response
      const firebaseUid = userCredential.user.uid;

      // Update the formData with firebase_user_id
      setFormData((prev) => ({
        ...prev,
        firebase_user_id: firebaseUid,
      }));

      setPhoneVerified(true);
      setOtpMessage("Phone number verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!phoneVerified) {
      setError("Please verify your phone number first");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Call registration API with axiosInstance
      const response = await axiosInstance.post(
        API_URLS.REGISTRATION.POST_REGISTRATION,
        formData
      );

      console.log(response);

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
          username: formData.full_name,
          phone_number: formData.phone_number,
          dob: formData.dob,
          uuid: response.data.uuid,
          firebase_uid: formData.firebase_user_id,
        })
      );

      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during registration");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg flex w-full max-w-4xl h-[600px] relative overflow-hidden">
        {/* Left Side: Background Image */}
        <div className="hidden md:block w-1/2 h-full relative">
          <Image
            src="/loginimage.png"
            alt="Floating houses"
            fill
            className="object-cover"
            priority // optional: only if this is a critical image
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 text-xl"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Join AYAM Retreat!
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full p-3 border ${
                  formErrors.full_name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {formErrors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.full_name}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full p-3 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full p-3 border ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="flex">
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Phone Number (with country code)"
                  className={`w-full p-3 border ${
                    formErrors.phone_number
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                  disabled={phoneVerified}
                />
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={otpSent || phoneVerified || isSubmitting}
                  className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {otpSent ? "Resend" : "Send OTP"}
                </button>
              </div>
              {formErrors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.phone_number}
                </p>
              )}
            </div>

            {/* Hidden reCAPTCHA container */}
            <div id="recaptcha-container"></div>

            {otpSent && !phoneVerified && (
              <div className="mt-4">
                <p className="text-green-600 text-sm mb-2">{otpMessage}</p>
                <div className="flex">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={verifyOTP}
                    disabled={isSubmitting}
                    className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            {phoneVerified && (
              <p className="text-green-600 text-sm">{otpMessage}</p>
            )}

            <div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
                className={`w-full p-3 border ${
                  formErrors.dob ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {formErrors.dob && (
                <p className="text-red-500 text-sm mt-1">{formErrors.dob}</p>
              )}
            </div>

            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  formErrors.gender ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                {/* <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option> */}
              </select>
              {formErrors.gender && (
                <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!phoneVerified || isSubmitting}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isSubmitting ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin || onClose}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Add this to fix TypeScript errors for the RecaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export default RegisterModal;
