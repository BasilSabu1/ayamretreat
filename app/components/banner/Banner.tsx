// components/BannerCarousel.tsx
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Image from 'next/image';

interface FeatureIcon {
  id: number;
  iconUrl: string;
  iconText: string;
}

interface BannerSlide {
  id: number;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  featureIcons: FeatureIcon[];
}

const BannerCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      title: "Drifters Valley",
      location: "Nedumkandam, Idukki",
      description:
        "Tucked away in the misty highlands of Idukki, Drifters Valley is where silence speaks and nature leads the way. Wake to the scent of wild eucalyptus, follow hidden trails that whisper old forest tales, and lose yourself in the rhythm of rustling leaves. Designed for the wanderer at heart, this retreat is your pause between the pages — a soulful escape into the untouched.",
      imageUrl: "/banner/Drifters_Valley.png",
      featureIcons: [
        {
          id: 1,
          iconUrl: "/bannerbottomrightlogo/Untouchedtrails.png",
          iconText: "Untouched\ntrails",
        },
        {
          id: 2,
          iconUrl: "/bannerbottomrightlogo/Mountainserenity.png",
          iconText: "Mountain\nserenity",
        },
        {
          id: 3,
          iconUrl: "/bannerbottomrightlogo/Naturehikes.png",
          iconText: "Nature\nhikes",
        },
      ],
    },
    {
      id: 2,
      title: "Vayaloram",
      location: "Kuttanad, Allapuzha",
      description:
        "Cradled on the edge of endless paddy fields, Vayaloram is where time slows to the rhythm of rustling palms and golden sunsets. Wake to birdsong and drifting morning mist. Walk barefoot on earthen paths, dine on heirloom recipes, and unwind in spaces designed to breathe. This is the heart of rural Kerala — quiet, grounded, and deeply nourishing.",
      imageUrl: "/banner/VayaloramRetreat.png",
      featureIcons: [
        {
          id: 1,
          iconUrl: "/bannerbottomrightlogo/Vayaloram1.png",
          iconText: "Backwaters",
        },
        {
          id: 2,
          iconUrl: "/bannerbottomrightlogo/Vayaloram2.png",
          iconText: "Paddy fields",
        },
        {
          id: 3,
          iconUrl: "/bannerbottomrightlogo/Vayaloram3.png",
          iconText: "Local cuisine",
        },
      ],
    },
    {
      id: 3,
      title: "Adventure Bay",
      location: "AdventureBay,Marari",
      description:
        "Where the land meets the sea and thrill meets tranquility. Adventure Bay is your gateway to coastal escapades — from kayaking through mangroves and hidden coves to evenings around beachside bonfires. Bold, untamed, and buzzing with energy, this retreat is made for the spirited soul who seeks movement, meaning, and moments that stay.",
      imageUrl: "/banner/adventure.png",
      featureIcons: [
        {
          id: 1,
          iconUrl: "/bannerbottomrightlogo/Bay1.png",
          iconText: "Water sports",
        },
        {
          id: 2,
          iconUrl: "/bannerbottomrightlogo/Bay3.png",
          iconText: "Beach trails",
        },
        {
          id: 3,
          iconUrl: "/bannerbottomrightlogo/Bay2.png",
          iconText: "Calm yet thrilling",
        },
      ],
    },
    {
      id: 4,
      title: "Saantara",
      location: "Palakkad",
      description:
        "A sanctuary of stillness nestled amidst whispering trees and sacred silence. Saantara is a retreat for the inward journey — where ancient wellness traditions, mindful spaces, and nature's quiet embrace come together. Whether you're here to heal, reflect, or simply pause, Saantara offers the space to just be — deeply, gently, and wholly.",
      imageUrl: "/banner/Saantararetreat.png",
      featureIcons: [
        {
          id: 1,
          iconUrl: "/bannerbottomrightlogo/Saantara1.png",
          iconText: "Cultural immersion",
        },
        {
          id: 2,
          iconUrl: "/bannerbottomrightlogo/Saantara2.png",
          iconText: "Heritage architecture",
        },
        {
          id: 3,
          iconUrl: "/bannerbottomrightlogo/Saantara3.png",
          iconText: "Ayurveda",
        },
      ],
    },
    {
      id: 5,
      title: "Kailasam",
      location: "Idukki, Kerala",
      description:
        "Shrouded in mist and myth, Kailasam rises like a whisper from the earth — a place where ancient energy flows and the spirit feels held. Set high in the hills, this retreat invites you into stillness, sacred stories, and the quiet power of presence. A haven for seekers, dreamers, and those drawn to the mystical rhythm of the mountains.",
      imageUrl: "/banner/Saantara.png",
      featureIcons: [
        {
          id: 1,
          iconUrl: "/bannerbottomrightlogo/Untouchedtrails.png",
          iconText: "Mountain wellness",
        },
        {
          id: 2,
          iconUrl: "/bannerbottomrightlogo/Mountainserenity.png",
          iconText: "Yoga",
        },
        {
          id: 3,
          iconUrl: "/bannerbottomrightlogo/Naturehikes.png",
          iconText: "NO alcohol",
        },
      ],
    },
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === bannerSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Navigation function for "Explore Packages" button
  const handleExplorePackages = (retreatId: number, retreatTitle: string) => {
    const slug = retreatTitle.toLowerCase().replace(/\s+/g, "-");
    router.push(`/resorts/${slug}?id=${retreatId}`);
  };

  return (
    <div className="relative w-[95%] h-[75vh]  md:h-screen max-w-full mx-auto my-3 overflow-hidden rounded-2xl">
      {/* Banner Images */}
      <div className="relative w-full h-full">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 md:bg-gradient-to-r md:from-black/40 to-transparent z-10" />
            <div className="absolute inset-0 md:bg-black/20 z-10" />

            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />

            <div className="absolute inset-0 flex flex-col justify-center z-20 px-4 sm:px-8 md:px-16 lg:px-24">
              <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto md:mx-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-1 sm:mb-2 text-center md:text-left">
                  {slide.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-white/90 mb-2 sm:mb-3 md:mb-4 text-center md:text-left">
                  © {slide.location}
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mb-4 sm:mb-6 md:mb-8 line-clamp-3 sm:line-clamp-4 md:line-clamp-none text-center md:text-left">
                  {slide.description}
                </p>
                <div className="flex justify-center md:justify-start">
                  <button 
                    className="border border-white text-white px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-2 text-sm md:text-base hover:bg-white hover:text-gray-900 transition"
                    onClick={() => handleExplorePackages(bannerSlides[currentSlide].id, bannerSlides[currentSlide].title)}
                  >
                    Explore Packages
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-28 sm:bottom-16 md:bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-30">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 sm:h-1.5 md:h-2 rounded-full transition-all ${
              currentSlide === index
                ? "w-3 sm:w-4 md:w-6 bg-white"
                : "w-1 sm:w-1.5 md:w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Feature Icons Section */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 w-full md:w-auto md:right-6 lg:right-16 z-30">
        <div className="text-center md:text-right mb-1   sm:mb-2">
          <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl text-white font-medium">
            Explore the Unexplored
          </h3>
        </div>
        <div className="flex items-center justify-center md:justify-end space-x-6 sm:space-x-8 md:space-x-8">
          {bannerSlides[currentSlide].featureIcons.map((icon) => (
            <div key={icon.id} className="flex flex-col items-center">
              <div className="rounded-full p-1.5 sm:p-2  md:p-3 mb-0.5 sm:mb-1 md:mb-2 hover:bg-blue-400">
                <Image
                  src={icon.iconUrl}
                  alt={icon.iconText.replace("\n", " ")}
                  width={24}
                  height={24}
                  className="h-6 w-6 sm:h-5 sm:w-5 md:h-10 md:w-10"
                />
              </div>
              <span className="text-xxs xs:text-tiny  sm:text-xs text-center text-white leading-tight hover:text-blue-600">
                {icon.iconText.split("\n")[0]}
                <br />
                {icon.iconText.split("\n")[1]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;