"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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

interface Points {
  uuid: string;
  points: string;
}

export default function RewardPoints() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [userpoints, setuserpoints] = useState<Points[]>([]);

  console.log(currentUser);

  const fetchPoints = async () => {
    try {
      const response = await axiosInstance.get(
        API_URLS.POINTS.GET_POINTS
      );
      setuserpoints(response.data);
    } catch (err) {
      console.error("Error fetching points:", err);
      console.log("Failed to fetch points data");
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);

      const [first] = (parsedUser.username || "User").split(" ", 1);
      setFirstName(first);
    }
  }, []);

  // Get the user's points (assuming the API returns an array with at least one item)
  const userPoints = userpoints.length > 0 ? parseInt(userpoints[0].points) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mx-auto w-full max-w-6xl overflow-y-auto">
      {/* Header with user name */}
      <div className="p-8 bg-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
          Hi {firstName}!
        </h1>
      </div>

      {/* Rewards section with background image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
        {/* Background image with proper container sizing */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/profile/rewardspoints.png"
            alt="Reward Points Background"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 text-center text-white">
          <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-lg">
            {/* Points Display */}
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              {userPoints} pts
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-lg mx-auto">
              Redeem your reward coins by clicking the below button
            </p>

            <button className="bg-white text-blue-500 px-4 py-2 sm:px-6 sm:py-3 rounded-md font-medium hover:bg-gray-100 transition-colors text-xs sm:text-sm md:text-base">
              Redeem Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}