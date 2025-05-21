"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/app/components/apiconfig/axios";
import { API_URLS } from "@/app/components/apiconfig/api_urls";

interface User {
  uuid: string;
  full_name: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: string;
  firebase_user_id?: string;
}

interface Referrals {
  user_uuid: string;
  name: string;
  email: string;
  phone_number: number;
}

interface CurrentUser {
  full_name: string;
  phone_number: number;
  email: string;
  dob: string;
  uuid: string;
  firebase_uid: string;
}

interface ReferralInput {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface Points {
  user_uuid: string;
  points: number;
}

interface Payment {
  id: number;
  user_uuid: string;
  subscription_plan: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function Subscription() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setuserData] = useState<User | null>(null);
  const [isPaidSubscription, setIsPaidSubscription] = useState(false);
  const [referralsList, setReferralsList] = useState<Referrals[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [payment, setPayment] = useState<Payment | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("add");
  const [points, setpoints] = useState<Points | null>(null);

  const [referrals, setReferrals] = useState<ReferralInput[]>([
    { id: 1, name: "", phone: "", email: "" },
  ]);

  useEffect(() => {
    fetchUserdata();
    fetchRefferals();
    fetchPayment();
    fetchPoints();
  }, []);

  useEffect(() => {
    if (payment && currentUser) {
      // Check if payment belongs to current user and has "paid" status
      const isPaid =
        payment.user_uuid === currentUser.uuid && payment.status === "paid";
      setIsPaidSubscription(isPaid);
    }
  }, [payment, currentUser]);

  const addReferral = () => {
    const newId =
      referrals.length > 0 ? referrals[referrals.length - 1].id + 1 : 1;
    setReferrals([...referrals, { id: newId, name: "", phone: "", email: "" }]);
  };

  const removeReferral = (id: number) => {
    if (referrals.length > 1) {
      const updatedReferrals = referrals.filter(
        (referral) => referral.id !== id
      );
      setReferrals(updatedReferrals);
    }
  };

  const fetchUserdata = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        API_URLS.REGISTRATION.GET_REGISTRATION
      );
      setuserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRefferals = async () => {
    try {
      const response = await axiosInstance.get(
        API_URLS.REFFERALS.GET_REFFERALS
      );
      setReferralsList(response.data);
    } catch (error) {
      console.error("Error fetching Refferals data:", error);
    }
  };

  const fetchPoints = async () => {
    try {
      const response = await axiosInstance.get(API_URLS.POINTS.GET_POINTS);
      setpoints(response.data);
    } catch (error) {
      console.error("Error fetching  user Points:", error);
    }
  };

  const fetchPayment = async () => {
    try {
      const response = await axiosInstance.get(API_URLS.PAYMENT.GET_PAYMENT);
      setPayment(response.data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const saveReferrals = async () => {
    // Check if user has paid subscription
    if (!isPaidSubscription) {
      setShowAlert(true);
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      // Filter out empty referrals
      const validReferrals = referrals.filter(
        (ref) =>
          ref.name.trim() !== "" ||
          ref.phone.trim() !== "" ||
          ref.email.trim() !== ""
      );

      if (validReferrals.length === 0) {
        setSaveError("Please add at least one valid referral");
        setIsSaving(false);
        return;
      }

      // Email validation regex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Phone validation - simple check for now (can be enhanced based on requirements)
      const phonePattern = /^\d{10,15}$/;

      // Check for validation and self-referral
      for (const referral of validReferrals) {
        // Check if fields are empty
        if (
          referral.name.trim() === "" ||
          referral.phone.trim() === "" ||
          referral.email.trim() === ""
        ) {
          setSaveError("All fields are required for each referral");
          setIsSaving(false);
          return;
        }

        // Validate email format
        if (!emailPattern.test(referral.email)) {
          setSaveError(`Invalid email format for ${referral.name}`);
          setIsSaving(false);
          return;
        }

        // Validate phone format
        if (!phonePattern.test(referral.phone)) {
          setSaveError(`Invalid phone number format for ${referral.name}`);
          setIsSaving(false);
          return;
        }

        // Check if referral email matches current user's email
        if (
          referral.email.toLowerCase() ===
          (currentUser?.email || "").toLowerCase()
        ) {
          setSaveError("You cannot refer yourself: Email matches your own");
          setIsSaving(false);
          return;
        }

        // Check if referral phone matches current user's phone
        if (referral.phone === (currentUser?.phone_number?.toString() || "")) {
          setSaveError(
            "You cannot refer yourself: Phone number matches your own"
          );
          setIsSaving(false);
          return;
        }
      }

      // Call the API for each valid referral
      for (const referral of validReferrals) {
        const referralData = {
          user_uuid: currentUser?.uuid || userData?.uuid,
          name: referral.name,
          email: referral.email,
          phone_number: referral.phone,
        };

        await axiosInstance.post(
          API_URLS.REFFERALS.POST_REFFERALS,
          referralData
        );
      }

      setSaveSuccess(true);
      fetchRefferals(); // Refresh referral data
      // Reset form after successful save
      setReferrals([{ id: 1, name: "", phone: "", email: "" }]);
    } catch (error) {
      console.error("Error saving referrals:", error);
      setSaveError("Failed to save referrals. Please try again.");
    } finally {
      setIsSaving(false);

      // Reset success message after 3 seconds
      if (saveSuccess) {
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    }
  };

  const handleEmailChange = (id: number, value: string) => {
    const updatedReferrals = referrals.map((r) =>
      r.id === id ? { ...r, email: value } : r
    );
    setReferrals(updatedReferrals);

    // Check for self-referral during typing
    if (
      value.toLowerCase() === (currentUser?.email || "").toLowerCase() &&
      value !== ""
    ) {
      setSaveError("You cannot refer yourself: Email matches your own");
    } else {
      // Clear error if it was about self-referral
      if (saveError === "You cannot refer yourself: Email matches your own") {
        setSaveError("");
      }
    }
  };

  const handlePhoneChange = (id: number, value: string) => {
    const updatedReferrals = referrals.map((r) =>
      r.id === id ? { ...r, phone: value } : r
    );
    setReferrals(updatedReferrals);

    // Check for self-referral during typing
    if (
      value === (currentUser?.phone_number?.toString() || "") &&
      value !== ""
    ) {
      setSaveError("You cannot refer yourself: Phone number matches your own");
    } else {
      // Clear error if it was about self-referral
      if (
        saveError === "You cannot refer yourself: Phone number matches your own"
      ) {
        setSaveError("");
      }
    }
  };



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setIsLoading(false);
    } else {
      router.push("/");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Alert Modal for Non-Subscribers
  const renderSubscriptionAlert = () => {
    if (!showAlert) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-3">
            Subscription Required
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Referral features are only available for subscribed members. Would
            you like to subscribe now?
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/membership">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition">
                Subscribe
              </button>
            </Link>
            <button
              onClick={() => setShowAlert(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Paid Subscription UI
  if (isPaidSubscription) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Paid Subscription Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
            {/* Gold Badge - slightly moved to the right */}
            <div className="absolute -top-4 -left-2">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src="/goldmember.png"
                  alt="Gold Member"
                  width={60}
                  height={60}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* User greeting and points */}
            <div className="flex justify-between items-center mb-8 pt-6">
              <h1 className="text-5xl font-bold text-blue-500">
                Hi {currentUser?.full_name?.split(" ")[0] || "User"}!
              </h1>
              <div className="bg-purple-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full flex items-center">
                <span className="text-xs sm:text-sm mr-1 sm:mr-2 font-medium">
                  Reward points
                </span>
                <span className="text-xl sm:text-3xl font-bold text-green-300">
                  {points?.points || 0} pt
                </span>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Subscription Details
              </h2>
              <p className="text-gray-600">
                Started from 01/05/2025 and will end on 30/04/2026.
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("add")}
                  className={`py-3 px-6 font-medium text-sm leading-5 rounded-t-lg focus:outline-none mr-2
                    ${
                      activeTab === "add"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Referrals
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("view")}
                  className={`py-3 px-6 font-medium text-sm leading-5 rounded-t-lg focus:outline-none
                    ${
                      activeTab === "view"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    View Referrals
                  </div>
                </button>
              </div>
            </div>

            {/* Status Messages */}
            {saveSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                Referrals saved successfully!
              </div>
            )}
            {saveError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {saveError}
              </div>
            )}

            {/* Tab Content */}
            {activeTab === "add" ? (
              /* Add Referrals Tab */
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Add New Referrals
                </h2>

                {/* Referral Fields */}
                {referrals.map((referral) => (
                  <div key={referral.id} className="flex items-center mb-4">
                    <span className="mr-4 text-gray-500">{referral.id}</span>
                    <input
                      type="text"
                      placeholder="Name"
                      className="border rounded-md p-2 mr-2 w-1/4"
                      value={referral.name}
                      onChange={(e) => {
                        const updatedReferrals = referrals.map((r) =>
                          r.id === referral.id
                            ? { ...r, name: e.target.value }
                            : r
                        );
                        setReferrals(updatedReferrals);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Phone number"
                      className={`border rounded-md p-2 mr-2 w-1/4 ${
                        referral.phone ===
                          (currentUser?.phone_number?.toString() || "") &&
                        referral.phone !== ""
                          ? "border-red-500 bg-red-50"
                          : ""
                      }`}
                      value={referral.phone}
                      onChange={(e) =>
                        handlePhoneChange(referral.id, e.target.value)
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      className={`border rounded-md p-2 w-1/4 ${
                        referral.email.toLowerCase() ===
                          (currentUser?.email || "").toLowerCase() &&
                        referral.email !== ""
                          ? "border-red-500 bg-red-50"
                          : ""
                      }`}
                      value={referral.email}
                      onChange={(e) =>
                        handleEmailChange(referral.id, e.target.value)
                      }
                    />
                    <div className="ml-4 flex">
                      <button
                        onClick={() => removeReferral(referral.id)}
                        className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2"
                        title="Remove"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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
                      <button
                        onClick={addReferral}
                        className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        title="Add Another"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={saveReferrals}
                    disabled={isSaving}
                    className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center ${
                      isSaving ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSaving ? (
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
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
                        Save Referrals
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* View Referrals Tab */
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Your Referrals
                </h2>

                {referralsList && referralsList.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Phone Number
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {referralsList.map((referral, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {referral.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {referral.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {referral.phone_number}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-md p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600">
                      You haven&apos;t added any referrals yet.
                    </p>
                    <button
                      onClick={() => setActiveTab("add")}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Add Referrals
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Unpaid Subscription UI (Original code)
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-500">
              Hi {currentUser?.full_name?.split(" ")[0] || "User"}!
            </h1>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
              <span className="text-xs mr-1 font-medium">Reward points:</span>
              <span className="text-lg font-bold">
                {points?.points || 0} pt
              </span>
            </div>
          </div>
        </div>

        {/* Alert Message */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-center">
          <div className="flex items-center text-gray-600">
            <div className="bg-gray-200 rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span>You currently don&apos;t have any active plan.</span>
          </div>
        </div>

        {/* Updated Subscription Banner with Image on Left */}
        <div className="bg-black rounded-lg shadow-lg mb-6 flex flex-col sm:flex-row">
          {/* Left Image */}
          <div className="md:w-2/5 relative">
            <Image
              src="/profile/subscription.png"
              alt="Subscription Plans"
              width={500}
              height={500}
              priority={true}
              quality={100}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Right Content */}
          <div className="sm:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-500 mb-4">
                Subscribe now to avail exclusive benefits!
              </h2>
              <p className="text-gray-300 mb-6">
                Ayam offers 2 exclusive plans for our customers with a variety
                of benefits. Browse through the plans and find one that suits
                you!
              </p>
            </div>
            <div className="flex justify-end">
              <Link href="/membership">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Browse plans
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Render subscription alert modal */}
      {renderSubscriptionAlert()}
    </div>
  );
}
