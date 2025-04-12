// components/BannerCarousel.tsx
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import Image from 'next/image';

interface BannerSlide {
  id: number;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
}

const BannerCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      title: "Drifter's Valley",
      location: "Nedumkandam, Idukki",
      description:
        "Tucked away in the misty highlands of Idukki, Drifters Valley is where silence speaks and nature leads the way. Wake to the scent of wild eucalyptus, follow hidden trails that whisper old forest tales, and lose yourself in the rhythm of rustling leaves. Designed for the wanderer at heart, this retreat is your pause between the pages — a soulful escape into the untouched.",
      imageUrl: "/banner/Drifters_Valley.png",
    },
    {
      id: 2,
      title: "Mountain Haven",
      location: "Munnar, Kerala",
      description:
        "Nestled among the rolling hills, Mountain Haven offers panoramic views of lush green valleys and mist-covered peaks. Experience the tranquility of nature while enjoying modern comforts in our eco-friendly accommodations.",
      imageUrl: "/banner/VayaloramRetreat.png",
    },
    {
      id: 3,
      title: "Forest Retreat",
      location: "Silent Valley, Kerala",
      description:
        "Immerse yourself in the heart of ancient forests, where time slows down and every breath connects you deeper with nature. Our sustainable cottages blend seamlessly with the surroundings, offering a truly authentic wilderness experience.",
      imageUrl: "/banner/Drifters_Valley.png",
    },
    {
      id: 4,
      title: "Riverside Escape",
      location: "Periyar, Kerala",
      description:
        "Let the gentle sounds of flowing water soothe your soul at our riverside sanctuary. Wake up to birdsong and spend your days exploring nearby waterfalls, wildlife, and the rich biodiversity of the Western Ghats.",
      imageUrl: "/banner/VayaloramRetreat.png",
    },
    {
      id: 5,
      title: "Tea Garden Hideaway",
      location: "Vagamon, Kerala",
      description:
        "Surrounded by endless waves of emerald tea plantations, this exclusive retreat offers a glimpse into Kerala's rich agricultural heritage while providing a peaceful sanctuary for relaxation and rejuvenation.",
      imageUrl: "/banner/Drifters_Valley.png",
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

            {/* Content */}
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
                  <button className="border border-white text-white px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-2 text-sm md:text-base hover:bg-white hover:text-gray-900 transition">
                    Explore Packages
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator Dots - Centered on small screens */}
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

      {/* Feature Icons Section - Centered on mobile, right aligned on desktop */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 w-full md:w-auto md:right-6 lg:right-16 z-30">
        <div className="text-center md:text-right mb-1 sm:mb-2">
          <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl text-white font-medium">
            Explore the Unexplored
          </h3>
        </div>
        <div className="flex items-center justify-center md:justify-end space-x-6 sm:space-x-8 md:space-x-8">
          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1.5 sm:p-2 md:p-3 mb-0.5 sm:mb-1 md:mb-2">
              <Image
                src="/bannerbottomrightlogo/Untouchedtrails.png"
                alt="Untouched trails"
                width={24} // Adjust size as per sm:h-5 or md:h-6 equivalents
                height={24}
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
              />
            </div>
            <span className="text-xxs xs:text-tiny sm:text-xs text-center text-white leading-tight">
              Untouched
              <br />
              trails
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1.5 sm:p-2 md:p-3 mb-0.5 sm:mb-1 md:mb-2">
              <Image
                src="/bannerbottomrightlogo/Mountainserenity.png"
                alt="Mountain serenity"
                width={24} // Adjusted to match md:h-6 and md:w-6
                height={24}
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
              />
            </div>
            <span className="text-xxs xs:text-tiny sm:text-xs text-center text-white leading-tight">
              Mountain
              <br />
              serenity
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1.5 sm:p-2 md:p-3 mb-0.5 sm:mb-1 md:mb-2">
              <Image
                src="/bannerbottomrightlogo/Naturehikes.png"
                alt="Nature hikes"
                width={24} // Matches md:h-6 and md:w-6
                height={24}
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
              />
            </div>
            <span className="text-xxs xs:text-tiny sm:text-xs text-center text-white leading-tight">
              Nature
              <br />
              hikes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
