"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/app/components/apiconfig/axios";
import { API_URLS } from "@/app/components/apiconfig/api_urls";
import Subscription from "./subscription/page";
import Rewardpoints from "./rewardpoints/page";
import Profilepage from "./profile/page";

interface User {
  uuid: string;
  full_name: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: string;
  firebase_user_id?: string;
}

interface Address {
  uuid: string;
  user_details: {
    uuid: string;
  };
  image: string;
  address: string;
  id: number;
}

export default function Profile() {
  const params = useParams();
  const router = useRouter();
  const { uuid } = params;

  const [profileData, setProfileData] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    dob: "",
  });
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [addressData, setAddressData] = useState({
    address: "",
    image: null,
    user_uuid: "",
  });

  console.log(addressData);
  

  console.log(currentUser);
  console.log(formData);
  console.log("User Address:", userAddress);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);

      if (!uuid && parsedUser.uuid) {
        router.push(`/profile/${parsedUser.uuid}`);
      }
    } else {
      router.push("/");
    }
  }, [uuid, router]);

  const fetchUserAddress = async (user?: User) => {
    try {
      const response = await axiosInstance.get(API_URLS.ADDRESS.GET_ADDRESS);
      const userToFind = user || currentUser;

      if (userToFind) {
        const userAddr = response.data.find(
          (addr: Address) => addr.user_details.uuid === userToFind.uuid
        );
        setUserAddress(userAddr || null);
        if (userAddr) {
          setAddressData({
            address: userAddr.address || "",
            image: userAddr.image || null,
            user_uuid: userAddr.user_details.uuid || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    if (uuid) {
      fetchUserProfile();
    }
  }, [uuid]);

  useEffect(() => {
    if (currentUser) {
      fetchUserAddress(currentUser);
    }
  }, [currentUser]);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        API_URLS.REGISTRATION.GET_REGISTRATION
      );
      const users = response.data;

      const matchedUser = users.find((user: User) => user.uuid === uuid);

      if (matchedUser) {
        setProfileData(matchedUser);
        setFormData({
          full_name: matchedUser.full_name || "",
          email: matchedUser.email || "",
          phone_number: matchedUser.phone_number || "",
          gender: matchedUser.gender || "",
          dob: matchedUser.dob || "",
        });
        
        // After setting profile data, fetch address for this user
        fetchUserAddress(matchedUser);
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Use user's address image if available, otherwise use placeholder
  const profileImage = userAddress && userAddress.image 
    ? userAddress.image 
    : "/profile-placeholder.jpg";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 font-sans">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <div className="relative w-10 h-10 mr-3 overflow-hidden rounded-full">
            <Image
              src={profileImage}
              alt="Profile"
              width={40}
              height={40}
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="text-md font-semibold text-gray-800">
              {profileData?.full_name || "User"}
            </h2>
            <div className="text-xs text-gray-500">{profileData?.email}</div>
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-gray-700 focus:outline-none"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar - Modified for responsive behavior */}
      <div
        className={`w-64 bg-white shadow-md fixed lg:static 
        lg:block transition-all duration-300 ease-in-out h-full z-20
        ${sidebarOpen ? "left-0" : "-left-64"}`}
      >
        <div className="flex justify-between items-center p-4 lg:hidden">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none"
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

        <div className="flex flex-col items-start p-6 border-b border-gray-200">
          <div className="relative w-20 h-20 mb-4 overflow-hidden rounded-lg">
            <Image
              src={profileImage}
              alt="Profile"
              width={80}
              height={80}
              className="object-cover"
              unoptimized
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            {profileData?.full_name || "User"}
          </h2>
          <div className="text-sm text-gray-500">{profileData?.email}</div>
          {userAddress && (
            <div className="text-sm text-gray-500 mt-1">{userAddress.address}</div>
          )}
        </div>

        <nav className="py-2">
          <button
            className={`flex items-center w-full px-6 py-3 text-left font-medium ${
              activeTab === "profile"
                ? "bg-gray-200 text-black font-bold"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("profile");
              setSidebarOpen(false);
            }}
          >
            <span>About</span>
          </button>
          <button
            className={`flex items-center w-full px-6 py-3 text-left font-medium ${
              activeTab === "subscription"
                ? "bg-gray-200 text-black font-bold"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("subscription");
              setSidebarOpen(false);
            }}
          >
            <span>Subscription</span>
          </button>
          <button
            className={`flex items-center w-full px-6 py-3 text-left font-medium ${
              activeTab === "reward-points"
                ? "bg-gray-200 text-black font-bold"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("reward-points");
              setSidebarOpen(false);
            }}
          >
            <span>Reward Points</span>
          </button>
        </nav>

        <div className="mt-auto p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-500 text-sm"
          >
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
        {activeTab === "profile" && <Profilepage   />}

        {activeTab === "subscription" && <Subscription />}

        {activeTab === "reward-points" && <Rewardpoints />}
      </div>
    </div>
  );
}