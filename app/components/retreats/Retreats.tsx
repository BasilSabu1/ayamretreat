"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axiosInstance from "../apiconfig/axios";
import { API_URLS } from "../apiconfig/api_urls";

interface RetreatCardProps {
  id: number;
  imageSrc: string;
  title: string;
  location: string;
}

interface ResortData {
  id: string;
  name: string;
  location: string;
  image: string;
  place:
    | {
        id: number;
        name: string;
      }
    | number; // Place can be an object with id and name properties or just a number
  description: string;
  price: number;
  slug: string;
  is_featured?: boolean;
}

const RetreatCard: React.FC<RetreatCardProps> = ({
  id,
  imageSrc,
  title,
  location,
}) => {
  const router = useRouter();

  const handleKnowMore = (retreatId: number, retreatName: string) => {
    const slug = retreatName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/resorts/${slug}?id=${retreatId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="relative h-48 md:h-40 lg:h-48">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized // Add this to bypass image optimization for external URLs
        />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{location}</p>
      </div>
      <div className="px-3 pb-3">
        <button
          onClick={() => handleKnowMore(id, title)}
          className="bg-black text-white text-xs px-3 py-1 rounded hover:bg-gray-800 transition-colors"
        >
          Know more
        </button>
      </div>
    </div>
  );
};

// Example data for the retreats (fallback data)
const dummyRetreats = [
  {
    id: 1,
    title: "Drifters Valley",
    location: "Nedumkandam, Idukki",
    imageSrc: "/resorts/driftersvalley.png",
  },
  {
    id: 2,
    title: "Vayaloram",
    location: "Kuttannad, Alappuzha",
    imageSrc: "/resorts/saantara.png",
  },
  {
    id: 3,
    title: "Adventure Bay",
    location: "Marari",
    imageSrc: "/resorts/adventurebay.png",
  },
  {
    id: 4,
    title: "Kailasam",
    location: "Idukki",
    imageSrc: "/resorts/kailasam.png",
  },
  {
    id: 5,
    title: "Saantara",
    location: "Palakkad",
    imageSrc: "/resorts/vayaloram.png",
  },
];

const RetreatSection: React.FC = () => {
  const [resorts, setResorts] = useState<ResortData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchResorts();
  }, []);

  const fetchResorts = async () => {
    try {
      setLoading(true);
      setError(false);

      // Fetch resorts data
      const resortsResponse = await axiosInstance.get(
        API_URLS.RESORTS.GET_RESORTS
      );

      if (resortsResponse.data && Array.isArray(resortsResponse.data)) {
        setResorts(resortsResponse.data);
      } else {
        console.warn(
          "Invalid resort data format received, using fallback data"
        );
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching resort data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Transform API resort data to match the format needed for RetreatCard
  const getRetreatData = () => {
    if (error || !resorts.length) {
      return dummyRetreats; // Use dummy data if API call failed or no data
    }

    return resorts.map((resort) => ({
      id: parseInt(resort.id),
      title: resort.name,
      location:
        typeof resort.place === "object"
          ? resort.place.name
          : resort.location || "Kerala",
      imageSrc: resort.image, // Use the full image URL directly from the API
    }));
  };

  const displayRetreats = getRetreatData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero section */}
      <div className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Explore Our Retreats
          </h1>

          <div className="flex flex-col md:flex-row items-center min-h-[500px] relative">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8 flex flex-col justify-center">
              <div className="flex items-center">
                <div className="relative w-40 h-40">
                  <Image
                    src="/retreats/five.png"
                    alt="Number 5"
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
                <div className=""></div>
                <div className="ml-2">
                  <p className="text-4xl font-bold text-blue-500">unique</p>
                  <p className="text-4xl font-bold text-black">stays</p>
                </div>
              </div>
              <p className="text-gray-600 text-xl mt-4">
                One soul-stirring journey
              </p>
            </div>

            <div className="w-full md:w-1/2 border-l-0 md:border-l border-gray-200 md:pl-8 relative min-h-[400px]">
              <div className="absolute right-0 top-0 w-full h-full overflow-visible z-0">
                <div className="relative h-[120%] w-full">
                  <Image
                    src="/retreats/retreatbackground.png"
                    alt="Background landscape with traveler"
                    fill
                    className="object-contain object-right-bottom"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="relative z-10 p-6">
                <h2 className="text-3xl font-bold mb-4">What Sets Us Apart</h2>
                <p className="text-gray-800 mb-6 text-lg">
                  Reconnect with nature, culture, and calm across five
                  handpicked destinations across Kerala.
                </p>
                <div>
                  <h3 className="font-bold text-lg mb-2">Each retreat is:</h3>
                  <ul className="space-y-3 text-gray-800">
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">•</span>
                      <span>
                        Designed to blend with its natural surroundings
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">•</span>
                      <span>
                        Built on principles of sustainability and slow living
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">•</span>
                      <span>
                        Ideal for mindful explorers, creatives, and wanderers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">•</span>
                      <span>
                        Deeply connected to local culture and community
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">•</span>
                      <span>Rooted in story, simplicity, and soul</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retreat cards section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Our Retreats</h2>
        {loading ? (
          <div className="text-center py-8">Loading retreats...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRetreats.map((retreat) => (
              <RetreatCard
                key={retreat.id}
                id={retreat.id}
                imageSrc={retreat.imageSrc}
                title={retreat.title}
                location={retreat.location}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RetreatSection;
