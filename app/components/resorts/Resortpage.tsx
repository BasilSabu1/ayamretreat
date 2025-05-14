// app/partner-resorts/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Types
type Resort = {
  id: string;
  name: string;
  location: string;
  image: string;
  district: string;
  slug: string;
  price?: number;
};

// Sample data
const resorts: Resort[] = [
  {
    id: "1",
    name: " Jo And Sams Villa",
    location: "Kochi",
    image: "/resorts/home.avif",
    district: "Ernakulam",
    slug: "jo-and-sams-villa",
    price: 5500,
  },
  // {
  //   id: "2",
  //   name: "Ocean Breeze",
  //   location: "Varkala, Kerala",
  //   image: "/resorts/home.avif",
  //   district: "Kerala",
  //   price: 5500,
  // },
  {
    id: "3",
    name: "Saantara",
    location: "Palakkad",
    image: "/resorts/vayaloram.png",
    district: "Palakkad",
    slug: "saantara",
    // price: 3800,
  },
  {
    id: "4",
    name: "Drifters Valley",
    location: "Nedumkandam",
    image: "/resorts/driftersvalley.png",
    district: "Idukki",
    slug: "drifters-valley",
    // price: 5200,
  },
  {
    id: "5",
    name: "Vayaloram",
    location: "Kuttanad",
    image: "/resorts/saantara.png",
    district: "Alappuzha",
    slug: "vayaloram",
    // price: 4900,
  },
  {
    id: "6",
    name: "Adventure Bay",
    location: "Marari",
    image: "/resorts/adventurebay.png",
    district: "Alappuzha",
    slug: "adventure-bay",
    // price: 4200,
  },
  {
    id: "7",
    name: "kailasam",
    location: "Idukki",
    image: "/resorts/kailasam.png",
    district: "Idukki",
    slug: "kailasam",
    // price: 5600,
  },
];

// Get unique districts
const districts = [
  "All",
  ...Array.from(new Set(resorts.map((resort) => resort.district))),
];

export default function PartnerResorts() {
  const [activeDistrict, setActiveDistrict] = useState("All");
  const router = useRouter();

  const filteredResorts =
    activeDistrict === "All"
      ? resorts
      : resorts.filter((resort) => resort.district === activeDistrict);

  const handleKnowMore = (resortId: string, resortSlug: string) => {
    router.push(`/resorts/${resortSlug}?id=${resortId}`);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Browse Partner Resorts</h1>
        <p className="text-gray-700 max-w-3xl mx-auto">
          As part of our exclusive subscription model, members gain access not
          only to our five signature retreats, but also to a curated collection
          of partner resorts across Kerala and beyond. Each partner resort
          reflects our shared ethos — sustainable hospitality, immersive design,
          and soulful experiences that stay with you long after your journey
          ends.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Explore our wide network of retreats
        </h2>

        {/* District Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {districts.map((district) => (
            <button
              key={district}
              onClick={() => setActiveDistrict(district)}
              className={`rounded-full px-4 py-1 text-sm border ${
                activeDistrict === district
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
              aria-pressed={activeDistrict === district}
            >
              {district}
            </button>
          ))}
        </div>

        {/* Resort Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredResorts.map((resort) => (
            <div
              key={resort.id}
              className={`rounded overflow-hidden shadow-md ${
                resort.id === "1" ? "border-2 border-amber-500 relative" : ""
              }`}
            >
              {resort.id === "1" && (
                <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-md z-10 shadow-md flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <span className="font-semibold text-xs">FEATURED</span>
                </div>
              )}
              <div className="relative h-48">
                <Image
                  src={resort.image}
                  alt={resort.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{resort.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{resort.location}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-gray-800">
                      {resort.price && (
                        <div className="text-gray-800 font-medium">
                          <div className="text-black text-xl font-bold">
                            ₹{resort.price.toLocaleString()}
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="line-through text-gray-500">
                              ₹11,000
                            </span>
                            <span className="text-green-600 font-semibold">
                              {Math.round(
                                ((11000 - resort.price) / 11000) * 100
                              )}
                              % off
                            </span>
                          </div>
                        </div>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => handleKnowMore(resort.id, resort.slug)}
                    className="bg-black text-white text-xs px-3 py-1 rounded-sm hover:bg-gray-800"
                  >
                    Know More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Link */}
        <div className="text-right mt-4">
          <Link
            href="/resorts"
            className="text-black font-medium hover:underline"
          >
            Browse all &gt;
          </Link>
        </div>
      </div>

      {/* Why Subscribe Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Why Subscribe?</h2>
          <p className="text-gray-700">
            Whether you&apos;re a frequent traveler, a wellness seeker, or
            someone who loves sharing soulful experiences with others — this is
            your key to a deeper connection with our world. Our retreats are
            accessible only through subscription, making this your exclusive
            path in.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded">
          <h3 className="font-semibold mb-2">One stay free for 2 guests</h3>
          <p className="text-sm text-gray-600 mb-4">
            Every year for 3 years at any of our AyamRetreat properties
          </p>

          <h3 className="font-semibold mb-2">2-30% Discount on all stays</h3>
          <p className="text-sm text-gray-600 mb-4">
            At associated resorts/homestays throughout the entirety of the year
          </p>

          <h3 className="font-semibold mb-2">5 Referral Benefit</h3>
          <p className="text-sm text-gray-600">
            Get 50% back on your subscription
          </p>
        </div>
      </div>
    </div>
  );
}
