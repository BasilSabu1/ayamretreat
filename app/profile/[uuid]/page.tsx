"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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

interface AlertInfo {
  isOpen: boolean;
  title: string;
  message: string;
}

export default function Profile() {
  const params = useParams();
  const router = useRouter();
  const { uuid } = params;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
    image: null as File | null,
    user_uuid: "",
  });
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    isOpen: false,
    title: "",
    message: "",
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
            image: null,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSaveImage = async () => {
    if (!selectedImage || !currentUser) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("user_uuid", currentUser.uuid);
      formDataToSend.append("image", selectedImage);

      if (userAddress && userAddress.address) {
        formDataToSend.append("address", userAddress.address);
      } else {
        formDataToSend.append("address", "");
      }

      if (userAddress) {
        await axiosInstance.patch(
          API_URLS.ADDRESS.PATCH_ADDRESS(userAddress.id),
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        showAlert("Success", "Profile image updated successfully");
      } else {
        await axiosInstance.post(
          API_URLS.ADDRESS.POST_ADDRESS,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        showAlert("Success", "Profile image added successfully");
      }

      await fetchUserAddress();
      setIsEditingImage(false);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error updating profile image:", error);
      showAlert("Error", "Failed to update profile image");
    }
  };

  const showAlert = (title: string, message: string) => {
    setAlertInfo({
      isOpen: true,
      title,
      message,
    });

    setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, isOpen: false }));
    }, 3000);
  };

  const cancelImageEdit = () => {
    setIsEditingImage(false);
    setSelectedImage(null);
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
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

  const profileImage =
    userAddress && userAddress.image
      ? userAddress.image
      : "/profile-placeholder.jpg";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 font-sans">
      {alertInfo.isOpen && (
        <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4 max-w-sm">
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                alertInfo.title === "Success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {alertInfo.title === "Success" ? (
                <svg
                  className="h-5 w-5 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3
                className={`text-sm font-medium ${
                  alertInfo.title === "Success"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {alertInfo.title}
              </h3>
              <div className="mt-1 text-sm text-gray-700">
                {alertInfo.message}
              </div>
            </div>
            <button
              onClick={() =>
                setAlertInfo((prev) => ({ ...prev, isOpen: false }))
              }
              className="ml-auto flex-shrink-0 flex p-1"
            >
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
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
        </div>
      )}

      <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center ">
          <div className="relative w-12 h-12 mr-3 overflow-hidden rounded-full">
            <Image
              src={profileImage}
              alt="Profile"
              width={48}
              height={48}
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

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      <div
        className={`w-64 bg-white shadow-md fixed lg:static 
        lg:block transition-all duration-300 ease-in-out h-full z-20 mt-9
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

        <div className="flex flex-col items-start p-6 border-b border-gray-200 mt-10">
          <div className="relative mb-4">
            <div
              className="w-24 aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setIsEditingImage(true)}
            >
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <button
              onClick={() => setIsEditingImage(true)}
              className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            {profileData?.full_name || "User"}
          </h2>
          <div className="text-sm text-gray-500">{profileData?.email}</div>
          {userAddress && (
            <div className="text-sm text-gray-500 mt-1">
              {userAddress.address}
            </div>
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
            onClick={openLogoutModal}
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

      {isEditingImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden transform transition-all animate-fadeIn">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 relative">
              <h3 className="text-xl font-bold text-white mb-1">
                Personalize Your Profile
              </h3>
              <p className="text-blue-100 text-sm">
                Choose an image that represents you
              </p>
              <button
                onClick={cancelImageEdit}
                className="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors"
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

            {/* Image Preview Area */}
            <div className="p-6 flex flex-col items-center">
              {selectedImage ? (
                <div className="mb-6 relative">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg transform transition-all hover:scale-105 relative">
                    <Image
                      src={
                        selectedImage ? URL.createObjectURL(selectedImage) : ""
                      }
                      alt="Preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      unoptimized
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
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
                </div>
              ) : (
                <div className="mb-6 relative">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg transform transition-all hover:scale-105">
                    <Image
                      src={profileImage}
                      alt="Current Profile"
                      fill // Fills the parent container
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center group mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                {selectedImage ? "Choose Another Photo" : "Select Your Photo"}
              </button>

              {/* Action Buttons */}
              <div className="flex w-full space-x-3">
                <button
                  onClick={cancelImageEdit}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveImage}
                  className="flex-1 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium transition-colors flex items-center justify-center"
                  disabled={!selectedImage}
                >
                  <span>Apply Changes</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Adding a note at the bottom */}
            <div className="bg-blue-50 p-3 text-xs text-center text-blue-600 border-t border-blue-100">
              For best results, use a square image at least 400x400 pixels
            </div>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
        {activeTab === "profile" && <Profilepage />}

        {activeTab === "subscription" && <Subscription />}

        {activeTab === "reward-points" && <Rewardpoints />}
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
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
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Confirm Logout
              </h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to log out?
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  closeLogoutModal();
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
