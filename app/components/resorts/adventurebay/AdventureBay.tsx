import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdventureBayRetreat() {
  const [showMore, setShowMore] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const galleryImages = [
    "/resorts/adventurebay/gallery/gallery1.png",
    "/resorts/adventurebay/gallery/gallery2.png",
    "/resorts/adventurebay/gallery/gallery3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveSlide((current) => {
      const newIndex = current === 0 ? galleryImages.length - 1 : current - 1;
      scrollToThumbnail(newIndex);
      return newIndex;
    });
  };

  const handleNext = () => {
    setActiveSlide((current) => {
      const newIndex = (current + 1) % galleryImages.length;
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
              src="/resorts/adventurebay/logo.png"
              alt="Adventure Bay Logo"
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
            <h1 className="text-3xl font-bold text-gray-800">Adventure Bay </h1>
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
                Marari{" "}
              </span>{" "}
              <span className="text-gray-400">•</span>
              <span className="bg-blue-400 text-black px-2 py-0.5 rounded-full">
                Adventure
              </span>
            </div>
            <p className="text-sm md:text-base">
              Nestled along a stretch of pristine white sands, Adventure Bay is
              your perfect beachside escape. Whether you're chasing the golden
              glow of sunrise or unwinding to the colors of sunset, this retreat
              offers something for everyone. From laid-back beach strolls to
              lively group games and quiet moments of reflection, Adventure Bay
              is where memories are made—for families, friends, and solo seekers
              alike.
            </p>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100 rounded-full p-3 mb-2">
                  <Image
                    src="/resorts/adventurebay/featuredicons/icon3.png"
                    alt="Ayurvedic"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                    quality={100}
                  />
                </div>
                <p className="text-xs md:text-sm">
                  Beachfront stays with endless ocean views{" "}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100 rounded-full p-3 mb-2">
                  <Image
                    src="/resorts/adventurebay/featuredicons/icon1.png"
                    alt="Tranquil"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                    quality={100}
                  />
                </div>
                <p className="text-xs md:text-sm">
                  Group activities, beach sports, and bonfires{" "}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100 rounded-full p-3 mb-2">
                  <Image
                    src="/resorts/adventurebay/featuredicons/icon2.png"
                    alt="Healing"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                    quality={100}
                  />
                </div>
                <p className="text-xs md:text-sm">
                  Ideal for solo travelers, friend circles, and family getaways{" "}
                </p>
              </div>
            </div>
          </div>

          {/* Right Banner Image Section + Gallery Carousel */}
          <div className="md:w-1/2 space-y-2">
            {/* Main Banner Image */}
            <div className="relative">
              <Image
                src="/resorts/adventurebay/bannersection.png"
                alt="Adventure Bay Retreat Main View"
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
                      alt={`Adventure Bay Gallery Image ${index + 1}`}
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
            Welcome to the Shoreline
          </h2>
          <p className="max-w-3xl mx-auto text-sm md:text-base">
            Where the tide carries your worries away and the breeze brings you
            back to life. At Adventure Bay, every day is a mix of sun, sea, and
            a little something unexpected. Come for the waves—stay for the
            stories.
          </p>
        </div>

        {/* Large Image with Pool - Full width */}
        <div className="w-full mt-4">
          <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden">
            <Image
              src="/resorts/adventurebay/welcome.png"
              alt="Adventure Bay Villa with Pool"
              fill
              className="object-cover w-full h-full"
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
                    Morning dips in crystal-clear waters and golden beach walks{" "}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Beach games, volleyball matches, and sandcastle throwdowns{" "}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Evenings around a bonfire with music, laughter, and grilled
                    bites
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Oceanfront cottages with hammocks and chill-out zones{" "}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Local seafood, tropical fruit spreads, and fresh coconut
                    sips by the shore
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
                      img: "/resorts/adventurebay/propertiesamenties/parking.png",
                    },
                    {
                      alt: "Books",
                      label: "Books, DVDs, music for children",
                      img: "/resorts/adventurebay/propertiesamenties/books.png",
                    },
                    {
                      alt: "Yoga",
                      label: "Yoga classes",
                      img: "/resorts/adventurebay/propertiesamenties/yoga.png",
                    },
                    {
                      alt: "Free WiFi",
                      label: "Free WiFi",
                      img: "/resorts/adventurebay/propertiesamenties/freewifi.png",
                    },
                    {
                      alt: "Bicycle",
                      label: "Bicycle rental",
                      img: "/resorts/adventurebay/propertiesamenties/bicycle.png",
                    },
                    {
                      alt: "Bicycle",
                      label: "Bicycle Available",
                      img: "/resorts/adventurebay/propertiesamenties/bicycleavailable.png",
                    },
                    {
                      alt: "Play area",
                      label: "Indoor play area for children",
                      img: "/resorts/adventurebay/propertiesamenties/playarea.png",
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
                      img: "/resorts/adventurebay/roomfeatures/airconditioning.png",
                    },
                    {
                      alt: "Housekeeping",
                      label: "House keeping",
                      img: "/resorts/adventurebay/roomfeatures/housekeeping.png",
                    },
                    {
                      alt: "Balcony",
                      label: "Private balcony",
                      img: "/resorts/adventurebay/roomfeatures/balcony.png",
                    },
                    {
                      alt: "Room service",
                      label: "Room service",
                      img: "/resorts/adventurebay/roomfeatures/roomservice.png",
                    },
                    {
                      alt: "Kitchenette",
                      label: "Kitchenette",
                      img: "/resorts/adventurebay/roomfeatures/kitchen.png",
                    },
                    {
                      alt: "Radio",
                      label: "Radio",
                      img: "/resorts/adventurebay/roomfeatures/radio.png",
                    },
                    {
                      alt: "Extra long beds",
                      label: "Extra long beds",
                      img: "/resorts/adventurebay/roomfeatures/longbed.png",
                    },
                    {
                      alt: "Bath/Shower",
                      label: "Bath/Shower",
                      img: "/resorts/adventurebay/roomfeatures/bath.png",
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
            Adventure Bay is where joy meets the shoreline. It's vibrant,
            playful, and endlessly refreshing—perfect for those who want both
            action and ease. Whether you are reconnecting with old friends,
            making new ones, or just soaking in the sun with salt in your hair,
            this retreat is about living in the moment and loving every bit of
            it.
          </p>
        </div>

        {/* Full width image - fixed to be truly full width */}
        <div className="w-full">
          <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden">
            <Image
              src="/resorts/adventurebay/whychoose.png"
              alt="Ayurvedic herbs and treatments"
              fill
              className="object-cover w-full h-full"
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
