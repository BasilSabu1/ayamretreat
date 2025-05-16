"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {  useRouter } from "next/navigation";
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

interface CurrentUser {
  username: string;
  phone_number: number;
  email: string;
  dob: string;
  uuid: string;
  firebase_uid: string;
}

export default function Subscription() {
//   const params = useParams();
  const router = useRouter();
//   const { uuid } = params;

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setuserData] = useState<User | null>(null);
  const [isPaidSubscription, setIsPaidSubscription] = useState(false);

  const [referrals, setReferrals] = useState([
    { id: 1, name: "", phone: "", email: "" },
    { id: 2, name: "", phone: "", email: "" },
    { id: 3, name: "", phone: "", email: "" },
    { id: 4, name: "", phone: "", email: "" },
  ]);
  console.log(userData);

  useEffect(() => {
    fetchUserdata();

    // Check subscription status from localStorage
    const subscriptionStatus = localStorage.getItem("subscription");
    if (subscriptionStatus === "true") {
    setIsPaidSubscription(true);
    }
  }, []);

  const addReferral = () => {
    const newId =
      referrals.length > 0 ? referrals[referrals.length - 1].id + 1 : 1;
    setReferrals([...referrals, { id: newId, name: "", phone: "", email: "" }]);
  };

  //    const router = {
  //     push: (path) => console.log(`Navigating to: ${path}`)
  //   };

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

  // Paid Subscription UI
  if (isPaidSubscription) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with back button */}
          {/* <div className="flex items-center mb-8">
            <button
              onClick={() => router.push(`/profile/${currentUser?.uuid}`)}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Profile
            </button>
          </div> */}

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
                Hi {currentUser?.username?.split(" ")[0] || "Divya"}!
              </h1>
            <div className="bg-purple-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full flex items-center">
  <span className="text-xs sm:text-sm mr-1 sm:mr-2 font-medium">Reward points</span>
  <span className="text-xl sm:text-3xl font-bold text-green-300">
    280 pt
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

            {/* Referrals Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Referrals
              </h2>

              {/* Referral Fields */}
              {referrals.map((referral) => (
                <div key={referral.id} className="flex items-center mb-4">
                  <span className="mr-4 text-gray-500">{referral.id}</span>
                  <input
                    type="text"
                    placeholder="Name"
                    className="border rounded-md p-2 mr-2 w-1/3"
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
                    className="border rounded-md p-2 mr-2 w-1/3"
                    value={referral.phone}
                    onChange={(e) => {
                      const updatedReferrals = referrals.map((r) =>
                        r.id === referral.id
                          ? { ...r, phone: e.target.value }
                          : r
                      );
                      setReferrals(updatedReferrals);
                    }}
                  />
                  <input
                    type="email"
                    placeholder="email address"
                    className="border rounded-md p-2 w-1/3"
                    value={referral.email}
                    onChange={(e) => {
                      const updatedReferrals = referrals.map((r) =>
                        r.id === referral.id
                          ? { ...r, email: e.target.value }
                          : r
                      );
                      setReferrals(updatedReferrals);
                    }}
                  />
                </div>
              ))}

              {/* Add button - properly aligned after the fields */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={addReferral}
                  className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unpaid Subscription UI (Original code)
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        {/* <div className="flex items-center mb-8">
          <button
            onClick={() => router.push(`/profile/${uuid}`)}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Profile
          </button>
        </div> */}

        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-500">
              Hi {currentUser?.username?.split(" ")[0] || "User"}!
            </h1>
          </div>
          <div className="flex items-center">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
              <span className="text-xs mr-1 font-medium">Reward points:</span>
              <span className="text-lg font-bold">0 pt</span>
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
    </div>
  );
}
