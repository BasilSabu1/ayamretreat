"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import axiosInstance from "@/app/components/apiconfig/axios";
import { API_URLS } from "@/app/components/apiconfig/api_urls";
import AlertComponent from "./Alert";

interface User {
  uuid: string;
  full_name: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: string;
  firebase_user_id?: string;
  username?: string;
}

interface AxiosErrorResponse {
  response?: {
    data?: unknown;
    status?: number;
    headers?: Record<string, string>;
  };
  request?: unknown;
  message?: string;
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

export default function ProfileContent() {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    dob: "",
  });
  const [addressData, setAddressData] = useState({
    user_uuid: "",
    address: "",
    image: null as File | null,
  });
  //   const [addresses, setAddresses] = useState<Address[]>([]);
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileData, setProfileData] = useState<User | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Alert state
  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // Update form data when profile data changes
  useEffect(() => {
    if (currentUser && profileData) {
      // Ensure we're working with the correct user's data
      if (currentUser.uuid === profileData.uuid) {
        setFormData({
          full_name: profileData.full_name || "",
          email: profileData.email || "",
          phone_number: profileData.phone_number || "",
          gender: profileData.gender || "",
          dob: profileData.dob || "",
        });

        // Extract first and last name
        if (profileData.full_name) {
          const nameParts = profileData.full_name.split(" ");
          setFirstName(nameParts[0] || "");
          setLastName(nameParts.slice(1).join(" ") || "");
        }
      }
    }
  }, [currentUser, profileData]);

  // Update address data when user address changes
  useEffect(() => {
    if (userAddress) {
      setAddressData({
        address: userAddress.address || "",
        image: null,
        user_uuid: userAddress.user_details.uuid,
      });
    }
  }, [userAddress]);

  const fetchUserProfile = useCallback(
    async (user?: User) => {
      try {
        const response = await axiosInstance.get(
          API_URLS.REGISTRATION.GET_REGISTRATION
        );

        if (Array.isArray(response.data)) {
          const userToFind = user || currentUser;
          if (!userToFind) return;

          const userProfile = response.data.find(
            (u: User) => u.uuid === userToFind.uuid
          );

          if (userProfile) {
            setProfileData(userProfile);
          } else {
            console.error("No matching profile found");
          }
        } else {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
    [currentUser]
  );

  const fetchUserAddress = useCallback(
    async (user?: User) => {
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
    },
    [currentUser]
  );

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);

        // Extract names immediately from stored user
        if (parsedUser.username) {
          const nameParts = parsedUser.username.split(" ");
          setFirstName(nameParts[0] || "User");
          setLastName(nameParts.slice(1).join(" ") || "");
        } else if (parsedUser.full_name) {
          const nameParts = parsedUser.full_name.split(" ");
          setFirstName(nameParts[0] || "User");
          setLastName(nameParts.slice(1).join(" ") || "");
        }

        // Now fetch profile with the parsedUser directly
        await fetchUserProfile(parsedUser);
        await fetchUserAddress(parsedUser);
      }
    };

    loadUserData();
  }, [fetchUserAddress, fetchUserProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddressData({
        ...addressData,
        image: file,
      });
    }
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const handleCloseAlert = () => {
    setAlertInfo((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const showAlert = (title: string, message: string) => {
    setAlertInfo({
      isOpen: true,
      title,
      message,
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentUser && currentUser.uuid) {
        // Combine firstName and lastName into full_name before sending
        const updatedFormData = {
          ...formData,
          full_name: `${firstName} ${lastName}`.trim(),
        };

        // Validate form data before sending
        if (!updatedFormData.full_name) {
          showAlert("Validation Error", "Full name cannot be blank");
          return;
        }

        if (!updatedFormData.phone_number) {
          showAlert("Validation Error", "Phone number cannot be blank");
          return;
        }

        if (!updatedFormData.gender || updatedFormData.gender === "") {
          showAlert("Validation Error", "Please select a gender");
          return;
        }

        // Ensure dob is in YYYY-MM-DD format if present
        if (
          updatedFormData.dob &&
          !/^\d{4}-\d{2}-\d{2}$/.test(updatedFormData.dob)
        ) {
          showAlert(
            "Validation Error",
            "Date of birth must be in YYYY-MM-DD format"
          );
          return;
        }

        // Update user profile
        await axiosInstance.patch(
          API_URLS.REGISTRATION.PATCH_REGISTRATION(currentUser.uuid),
          updatedFormData
        );

        // Refresh profile data
        await fetchUserProfile();
        setIsEditingPersonal(false);

        // Show success message
        showAlert("Success", "Personal information updated successfully");
      }
    } catch (error: unknown) {
      console.error("Error updating profile:", error);

      // Type-safe error handling
      const axiosError = error as AxiosErrorResponse;
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        axiosError.response &&
        "data" in axiosError.response
      ) {
        showAlert(
          "Error",
          `Error: ${JSON.stringify(axiosError.response.data)}`
        );
      } else {
        showAlert("Error", "Error updating profile");
      }
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!currentUser) {
        showAlert("Error", "No user found. Please log in again.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("user_uuid", currentUser.uuid);
      formDataToSend.append("address", addressData.address);

      if (addressData.image) {
        formDataToSend.append("image", addressData.image);
      }

      if (userAddress) {
        // Update existing address
        await axiosInstance.patch(
          API_URLS.ADDRESS.PATCH_ADDRESS(userAddress.id),
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        showAlert("Success", "Address or image updated successfully");
      } else {
        // Create new address
        await axiosInstance.post(
          API_URLS.ADDRESS.POST_ADDRESS,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        showAlert("Success", "New address or image added successfully");
      }

      await fetchUserAddress();
      setIsEditingAddress(false);
    } catch (error: unknown) {
      console.error("Error saving address:", error);

      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as { response?: { data?: unknown } };
        showAlert(
          "Error",
          `Error: ${JSON.stringify(axiosError.response?.data)}`
        );
      } else if (error instanceof Error) {
        showAlert("Error", error.message || "Error saving address");
      } else {
        showAlert("Error", "An unknown error occurred");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 mb-8 shadow-md relative">
      {/* Alert Component */}
      <AlertComponent
        title={alertInfo.title}
        message={alertInfo.message}
        isOpen={alertInfo.isOpen}
        onClose={handleCloseAlert}
      />

      {/* Gold Member Tag */}
      <div className="absolute top-0 left-0 -mt-6 sm:-mt-8 lg:-mt-10 -ml-2">
        <div className="px-2 py-1">
          <Image
            src="/goldmember.png"
            alt="Gold Member"
            width={80}
            height={24}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-500 mt-13">
          Hi {firstName}!
        </h1>
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mt-2 sm:mt-0">
          0 pts
        </div>
      </div>

      <hr className="my-4 sm:my-6 border-gray-200" />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Personal Information
            </h2>
            <button
              onClick={() => setIsEditingPersonal(!isEditingPersonal)}
              className="text-blue-500 text-sm font-medium"
            >
              <span className="text-xs">✏️</span> Edit
            </button>
          </div>

          {!isEditingPersonal ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={firstName || ""}
                    disabled
                    className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={lastName || ""}
                    disabled
                    className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">Your Gender</div>
                <div className="flex flex-wrap space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender-view"
                      checked={formData.gender === "Male"}
                      disabled
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender-view"
                      checked={formData.gender === "Female"}
                      disabled
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender-view"
                      checked={formData.gender === "Other"}
                      disabled
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <div className="flex items-center justify-between">
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                  <button
                    className="ml-2 text-blue-500 text-sm"
                    onClick={() => setIsEditingPersonal(true)}
                  >
                    <span className="text-xs">✏️</span> Edit
                  </button>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">Mobile Number</div>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={formData.phone_number || ""}
                    disabled
                    className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                  <button
                    className="ml-2 text-blue-500 text-sm"
                    onClick={() => setIsEditingPersonal(true)}
                  >
                    <span className="text-xs">✏️</span> Edit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="first_name"
                    value={firstName || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-md"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="last_name"
                    value={lastName || ""}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-md"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2">Your Gender</div>
                <div className="flex flex-wrap space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="inline-flex items-center mt-2 sm:mt-0">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={formData.gender === "Other"}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md"
                />
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">Mobile Number</div>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditingPersonal(false)}
                  className="px-4 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Addresses */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Address</h2>
            <button
              onClick={() => setIsEditingAddress(!isEditingAddress)}
              className="text-blue-500 text-sm font-medium"
            >
              <span className="text-xs">✏️</span> Edit
            </button>
          </div>

          {!isEditingAddress ? (
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Address</div>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={addressData.address || "No address saved"}
                    disabled
                    className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                  <button
                    className="ml-2 text-blue-500 text-sm"
                    onClick={() => setIsEditingAddress(true)}
                  >
                    <span className="text-xs">✏️</span> Edit
                  </button>
                </div>
              </div>
              {userAddress && userAddress.image && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Image Preview
                  </div>
                  <Image
                    src={userAddress.image}
                    alt="Address reference"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="max-w-full h-auto rounded-md border border-gray-200"
                  />
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Address</div>
                <textarea
                  name="address"
                  value={addressData.address}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-200 rounded-md"
                  rows={4}
                  placeholder="Enter your full address"
                />
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">
                  Upload Image (optional)
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-2 border border-gray-200 rounded-md text-left bg-white hover:bg-gray-50"
                >
                  {addressData.image ? addressData.image.name : "Select Image"}
                </button>
              </div>

              {addressData.image && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Preview</div>
                  <div className="mt-2">
                    Selected file: {addressData.image.name}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(false)}
                  className="px-4 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
