"use client";

import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import axiosInstance from "../apiconfig/axios";
import { API_URLS } from "../apiconfig/api_urls";
import Image from "next/image";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

interface User {
  uuid: string;
  full_name: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: string;
  password?: string;
  firebase_user_id?: string;
}

// interface AlertProps {
//   type: "success" | "error";
//   message: string;
//   isVisible: boolean;
// }

const ImprovedLoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
}) => {
  // Form states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Login method states
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  // Auth states
  const [verificationId, setVerificationId] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);

  // UI states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Alert states
  const [centeredAlert, setCenteredAlert] = useState<{
    isVisible: boolean;
    title: string;
    message: string;
  }>({
    isVisible: false,
    title: "",
    message: "",
  });

  // Data states
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Fetch users on component mount
  useEffect(() => {
    if (isOpen) {
      fetchUsers();
      if (activeTab === "phone") {
        setupRecaptcha();
      }
    }

    // Cleanup
    return () => {
      const recaptchaContainer = document.getElementById("recaptcha-container");
      if (recaptchaContainer) {
        recaptchaContainer.innerHTML = "";
      }
    };
  }, [isOpen, activeTab]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        API_URLS.REGISTRATION.GET_REGISTRATION
      );
      setAllUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch user data");
    }
  };

  // Setup reCAPTCHA only for phone authentication
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier && activeTab === "phone") {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              // reCAPTCHA solved
            },
          }
        );
      } catch (error) {
        console.error("Error setting up reCAPTCHA:", error);
        setError("Failed to initialize verification service");
      }
    }
  };

  // Show alert function with creative success styling
  // Show alert function with creative success styling
  const showCenteredAlert = (title: string, message: string): void => {
    setCenteredAlert({
      isVisible: true,
      title,
      message,
    });

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      setCenteredAlert((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  // Email login handler - MODIFIED
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Check if user exists in your database first
      const userExists = allUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (!userExists) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // User exists in the database, so store info and proceed
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          uuid: userExists.uuid,
          full_name: userExists.full_name,
          phone_number: userExists.phone_number,
          dob: userExists.dob,
          gender: userExists.gender,
          login: true,
        })
      );

      // Show success alert
      showCenteredAlert(
        "Your Sign In  Successfully",
        "Welcome back to AYAM Retreat! Your relaxation journey awaits."
      );

      // Close modal after delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Failed to sign in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Send OTP handler
  const handleSendOTP = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!phoneNumber) {
      setError("Please enter your phone number");
      setLoading(false);
      return;
    }

    // Check if phone number exists in our database
    const userExists = allUsers.find(
      (user) => user.phone_number === phoneNumber
    );

    if (!userExists) {
      setError("No account found with this phone number");
      setLoading(false);
      return;
    }

    try {
      setupRecaptcha();

      const formattedPhoneNumber = phoneNumber.startsWith("+")
        ? phoneNumber
        : `+${phoneNumber}`;

      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        appVerifier
      );

      setVerificationId(result.verificationId);
      setOtpSent(true);
      setSuccess("OTP sent successfully to your phone!");
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError(
        "Failed to send OTP. Please check your phone number and try again."
      );

      // Reset recaptcha for retry
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
      setupRecaptcha();
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP handler
  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      if (!verificationId) {
        setError("No OTP verification ID available");
        setLoading(false);
        return;
      }

      // Create the credential
      const credential = PhoneAuthProvider.credential(verificationId, otp);

      // Sign in with the credential
      const userCredential = await signInWithCredential(auth, credential);
      const firebaseUid = userCredential.user.uid;

      // Find user with this phone number
      const userExists = allUsers.find(
        (user) => user.phone_number === phoneNumber
      );

      if (!userExists) {
        setError("User verification failed");
        setLoading(false);
        return;
      }

      // Store user info in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          phone_number: phoneNumber,
          uuid: userExists.uuid,
          full_name: userExists.full_name,
          email: userExists.email,
          dob: userExists.dob,
          gender: userExists.gender,
          firebase_uid: firebaseUid,
          login: true,
        })
      );

      // Show creative success alert
      // showAlert(
      //   "success",
      //   "Welcome back! Successfully signed in to your AYAM Retreat account!"
      // );

      showCenteredAlert(
        "Your Sign In  Successfully",
        "Welcome back to AYAM Retreat! Your relaxation journey awaits."
      );

      // Close modal after delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("Invalid OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Reset form when switching tabs
  const switchTab = (tab: "email" | "phone") => {
    setActiveTab(tab);
    setError("");
    setSuccess("");
    setOtpSent(false);
    setOtp("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");

    // Set up recaptcha if switching to phone tab
    if (tab === "phone") {
      setupRecaptcha();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50 p-4">
      {/* Alert Component */}

      <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl flex shadow-xl">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="w-full h-full relative">
            <Image
              src="/loginimage.png"
              alt="AYAM Retreat"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent flex items-end p-8">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-sm opacity-90">
                Sign in to access your AYAM Retreat account and continue your
                wellness journey.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-600">Sign In</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Login tabs */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${
                    activeTab === "email"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => switchTab("email")}
                >
                  Email
                </button>
                <button
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${
                    activeTab === "phone"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => switchTab("phone")}
                >
                  Phone Number
                </button>
              </div>
            </div>

            {/* Error and success messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {success}
              </div>
            )}

            {/* Social login buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>

              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.12 2.29-.84 3.46-.75 1.57.12 2.78.89 3.55 2.18-3.19 1.89-2.5 5.95.63 7.19-.71 1.65-1.66 3.07-2.72 4.56zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.26 2.01-1.76 4.07-3.74 4.25z" />
                </svg>
                Sign in with Apple
              </button>
            </div>

            <div className="flex items-center gap-2 my-6">
              <div className="h-px bg-gray-300 flex-grow"></div>
              <span className="text-gray-500 text-sm">or continue with</span>
              <div className="h-px bg-gray-300 flex-grow"></div>
            </div>

            {/* Hidden recaptcha container */}
            <div id="recaptcha-container" className="hidden"></div>

            {/* Email login form */}
            {activeTab === "email" && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pr-10 text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            )}

            {/* Phone number login form */}
            {activeTab === "phone" && (
              <form onSubmit={verifyOTP} className="space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1234567890"
                      className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
                      required
                      disabled={otpSent}
                    />
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={loading || !phoneNumber || otpSent}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap disabled:bg-blue-400"
                    >
                      {loading && !otpSent ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : otpSent ? (
                        "Resend OTP"
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Enter OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit OTP"
                      maxLength={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
                      required
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      We&apos;ve sent a 6-digit code to your phone. It will expire in
                      5 minutes.
                    </p>
                  </div>
                )}

                {otpSent && (
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center"
                    disabled={loading || !otp}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      "Verify & Sign In"
                    )}
                  </button>
                )}
              </form>
            )}
          </div>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>

        {centeredAlert.isVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-11/12 mx-auto text-center transform transition-colors duration-300 ease-in-out translate-y-0 opacity-100">
              <div className="mb-4 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {centeredAlert.title}
              </h3>

              <p className="text-gray-600 mb-6">{centeredAlert.message}</p>

              <button
                onClick={() => {
                  setCenteredAlert((prev) => ({ ...prev, isVisible: false }));
                  onClose(); // Close the modal after dismissing the alert
                }}
                className="w-full p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium text-sm"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovedLoginModal;
