import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function KailasamRetreat() {
  const [showMore, setShowMore] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const galleryImages = [
    "/resorts/kailasam/gallery/gallery1.png",
    "/resorts/kailasam/gallery/gallery2.png",
    "/resorts/kailasam/gallery/gallery3.png",
  ];

  const handleNext = () => {
    setActiveSlide((current) => {
      const newIndex = (current + 1) % galleryImages.length;
      scrollToThumbnail(newIndex);
      return newIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 1000);
    return () => clearInterval(interval);
  }, [handleNext]);

  const handlePrev = () => {
    setActiveSlide((current) => {
      const newIndex = current === 0 ? galleryImages.length - 1 : current - 1;
      scrollToThumbnail(newIndex);
      return newIndex;
    });
  };

  const scrollToThumbnail = (index: number) => {
    if (carouselRef.current) {
      const scrollAmount = index * (72 + 8); // thumbnail width (72px) + gap (8px)
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth" as ScrollBehavior,
      });
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <div className="p-4 md:p-6">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <Image
              src="/resorts/kailasam/logo.png"
              alt="Kailasam Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
              quality={100}
            />
          </div>
        </div>

        {/* Main Content Section */}
        {/* Main Section with Text and Banner Image */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Text Section */}
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Kailasam Retreat
            </h1>
            <div className="flex items-center space-x-2 text-sm">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Munnar
              </span>{" "}
              <span className="text-gray-400">•</span>
              <span className="bg-blue-400 text-black px-2 py-0.5 rounded-full">
                Mountain & Tea Estate Stay
              </span>
            </div>
            <p className="text-sm md:text-base">
              Nestled in the lush tea gardens of Munnar, Kailasam Retreat offers
              a serene escape amidst the Western Ghats. This boutique property
              blends colonial charm with modern comforts, providing breathtaking
              views of rolling hills and misty valleys. At Kailasam, experience
              the tranquility of nature while enjoying personalized hospitality
              that makes you feel at home in the mountains.
            </p>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full p-2 mb-2">
                  <Image
                    src="/resorts/kailasam/featuredicons/icon1.png"
                    alt="Tea Estate"
                    width={32}
                    height={32}
                    className="h-8 w-8 md:h-10 md:w-10"
                    quality={100}
                  />
                </div>
                <p className="text-xs md:text-sm">
                  Private tea estate with panoramic mountain views
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full p-2 mb-2">
                  <Image
                    src="/resorts/kailasam/featuredicons/icon2.png"
                    alt="Heritage"
                    width={32}
                    height={32}
                    className="h-8 w-8 md:h-10 md:w-10"
                    quality={100}
                  />
                </div>
                <p className="text-xs md:text-sm">
                  Heritage bungalow with colonial-era architecture
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full p-2 mb-2">
                  <Image
                    src="/resorts/kailasam/featuredicons/icon3.png"
                    alt="Nature"
                    width={32}
                    height={32}
                    className="h-8 w-8 md:h-10 md:w-10"
                    quality={100}
                  />
                </div>
                <p className="text-xs md:text-sm">
                  Nature walks and tea plantation tours
                </p>
              </div>
            </div>
          </div>

          {/* Right Banner Image Section + Gallery Carousel */}
          <div className="md:w-1/2 space-y-2">
            {/* Main Banner Image */}
            <div className="relative">
              <Image
                src="/resorts/kailasam/bannersection.png"
                alt="Kailasam Retreat Main View"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
                quality={100}
              />
            </div>

            {/* Gallery Carousel Section - Below Banner */}
            <div className="relative">
              {/* Navigation Controls */}
              <div className="absolute inset-y-0 left-0 z-10 flex items-center">
                <button
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-800" />
                </button>
              </div>

              {/* Thumbnails Carousel */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto scrollbar-hide gap-2 py-2 px-12"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 cursor-pointer transition-opacity duration-300 ${
                      activeSlide === index ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Kailasam Gallery Image ${index + 1}`}
                      width={120}
                      height={80}
                      className="h-16 w-24 object-cover rounded-md"
                      quality={90}
                    />
                  </div>
                ))}
              </div>

              {/* Right Navigation */}
              <div className="absolute inset-y-0 right-0 z-10 flex items-center">
                <button
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                  onClick={handleNext}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5 text-gray-800" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="relative mb-8">
        <div className="text-center py-8 px-4 md:px-8 bg-green-50">
          <h2 className="text-3xl font-serif text-green-800 mb-4">
            Welcome to Kailasam
          </h2>
          <p className="max-w-3xl mx-auto text-sm md:text-base">
            Perched among the clouds, Kailasam offers a sanctuary where time
            slows to the rhythm of nature. Wake up to misty mornings, spend your
            days exploring endless tea gardens, and retire to the warmth of a
            heritage bungalow. This is where mountain dreams come alive, with
            every detail crafted for your comfort and delight.
          </p>
        </div>

        {/* Large Image with Pool - Full width with aspect ratio */}
        <div className="w-full mt-4 aspect-w-16 aspect-h-9">
          <div
            className="relative w-full h-auto overflow-hidden"
            style={{ paddingBottom: "56.25%" }}
          >
            {" "}
            {/* 16:9 aspect ratio */}
            <Image
              src="/resorts/kailasam/welcome.png"
              alt="Kailasam Villa with Tea Garden View"
              fill
              className="object-contain w-full h-full"
              quality={100}
            />
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="px-4 md:px-6 mb-8">
        <div className="border border-green-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* What to Expect */}
            <div className="md:w-1/2">
              <h3 className="font-bold text-lg mb-4">What to Expect:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Private tea estate tours and tasting sessions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Guided nature walks through cardamom hills and spice gardens
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Stay in beautifully restored colonial-era rooms with modern
                    amenities
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Bonfire evenings with local storytelling and music
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Authentic Kerala cuisine with fresh, local ingredients
                  </span>
                </li>
              </ul>
            </div>

            {/* Property Amenities & Room Features */}
            <div className="md:w-1/2">
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Property Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      alt: "Parking",
                      label: "Secured parking",
                      img: "/resorts/kailasam/propertiesamenties/parking.png",
                    },
                    {
                      alt: "Books",
                      label: "Library with curated collection",
                      img: "/resorts/kailasam/propertiesamenties/books.png",
                    },
                    {
                      alt: "Yoga",
                      label: "Yoga deck with mountain views",
                      img: "/resorts/kailasam/propertiesamenties/yoga.png",
                    },
                    {
                      alt: "Free WiFi",
                      label: "Free WiFi",
                      img: "/resorts/kailasam/propertiesamenties/freewifi.png",
                    },
                    {
                      alt: "Bicycle",
                      label: "Nature trail access",
                      img: "/resorts/kailasam/propertiesamenties/bicycle.png",
                    },
                    {
                      alt: "View",
                      label: "Panoramic viewing deck",
                      img: "/resorts/kailasam/propertiesamenties/bicycleavailable.png",
                    },
                    {
                      alt: "Dining",
                      label: "Al fresco dining area",
                      img: "/resorts/kailasam/propertiesamenties/playarea.png",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <Image
                        src={item.img}
                        alt={item.alt}
                        width={16}
                        height={16}
                        className="mr-2"
                        quality={100}
                      />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Room features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      alt: "AC",
                      label: "Air conditioning",
                      img: "/resorts/kailasam/roomfeatures/airconditioning.png",
                    },
                    {
                      alt: "Housekeeping",
                      label: "Daily housekeeping",
                      img: "/resorts/kailasam/roomfeatures/housekeeping.png",
                    },
                    {
                      alt: "Balcony",
                      label: "Private balcony",
                      img: "/resorts/kailasam/roomfeatures/balcony.png",
                    },
                    {
                      alt: "Room service",
                      label: "24-hour room service",
                      img: "/resorts/kailasam/roomfeatures/roomservice.png",
                    },
                    {
                      alt: "Tea",
                      label: "Tea-making facilities",
                      img: "/resorts/kailasam/roomfeatures/kitchen.png",
                    },
                    {
                      alt: "Fireplace",
                      label: "Wooden fireplace",
                      img: "/resorts/kailasam/roomfeatures/radio.png",
                    },
                    {
                      alt: "Beds",
                      label: "Four-poster beds",
                      img: "/resorts/kailasam/roomfeatures/longbed.png",
                    },
                    {
                      alt: "Bath",
                      label: "Rain shower",
                      img: "/resorts/kailasam/roomfeatures/bath.png",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <Image
                        src={item.img}
                        alt={item.alt}
                        width={16}
                        height={16}
                        className="mr-2"
                        quality={100}
                      />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right mt-4">
                <button
                  className="text-green-700 text-sm flex items-center ml-auto"
                  onClick={() => setShowMore(!showMore)}
                >
                  Show more <span className="ml-1">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose This Retreat */}
      <div className="mb-1">
        <div className="px-4 md:px-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Why Choose This Retreat
          </h2>
          <p className="text-center mb-8 max-w-3xl mx-auto text-sm md:text-base">
            Kailasam offers a unique blend of heritage charm and natural beauty,
            where every window frames a postcard-perfect view. Unlike commercial
            resorts, we provide an intimate experience with personalized
            attention, allowing you to truly connect with Munnar&apos;s magical
            landscape. For those seeking authenticity, tranquility, and a deep
            immersion in tea country, Kailasam is your perfect mountain home.
          </p>
        </div>

        {/* Full width image with aspect ratio */}
        <div className="w-full">
          <div
            className="relative w-full overflow-hidden"
            style={{ paddingBottom: "56.25%" }}
          >
            {" "}
            {/* 16:9 aspect ratio */}
            <Image
              src="/resorts/kailasam/whychoose.png"
              alt="Tea gardens and mountain views"
              fill
              className="object-contain w-full h-full"
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
