import Image from "next/image";
import {  useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function JoAndSamsVilla() {
  const [showMore, setShowMore] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showCarousel, setShowCarousel] = useState(true);
  const defaultBanner = "/resorts/house/bannersection.avif";
  const [currentBanner, setCurrentBanner] = useState<string>(defaultBanner);


  const galleryImages = [
    "/resorts/house/bannersection.avif",
    "/resorts/house/gallery/galleryimage1.avif",
    "/resorts/house/gallery/galleryimage2.avif",
    "/resorts/house/gallery/galleryimage3.avif",
  ];


  const handleNext = () => {
    setActiveSlide((current) => {
      const newIndex = (current + 1) % galleryImages.length;
      scrollToThumbnail(newIndex);
      setCurrentBanner(galleryImages[newIndex]);
      return newIndex;
    });
  };

  const handlePrev = () => {
    setActiveSlide((current) => {
      const newIndex = current === 0 ? galleryImages.length - 1 : current - 1;
      scrollToThumbnail(newIndex);
      // Update main banner image
      setCurrentBanner(galleryImages[newIndex]);
      return newIndex;
    });
  };

  const selectThumbnail = (index: number) => {
    setActiveSlide(index);
    scrollToThumbnail(index);
    // Update main banner image
    setCurrentBanner(galleryImages[index]);
  };

  const scrollToThumbnail = (index: number) => {
    if (carouselRef.current) {
      const scrollAmount = index * (72 + 8); 
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth" as ScrollBehavior,
      });
    }
  };

  // For auto-scroll, removing this as it could be annoying to users
  // useEffect(() => {
  //   const interval = setInterval(handleNext, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // Toggle carousel visibility
  const toggleCarousel = () => {
    setShowCarousel(!showCarousel);
  };
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <div className="p-4 md:p-6 bg-stone-50">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Logo, title, and features */}
          <div className="md:w-1/2 flex flex-col space-y-4">
            <div className="space-y-4">
              {/* <Image
                src="/resorts/house/logo.png"
                alt="Jo And Sams Villa Logo"
                width={220}
                height={100}
                className="h-20 md:h-32 w-auto"
                quality={100}
                priority
              /> */}
              <h1 className="text-3xl font-bold text-gray-800">
                Jo And Sams Villa
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
                  Kochi, Kerala
                </span>
                <span className="text-gray-400">•</span>
                <span className="bg-blue-400 text-black px-2 py-0.5 rounded-full">
                  Luxury Heritage Stay
                </span>
              </div>
              <p className="text-sm md:text-base">
                Nestled in the vibrant city of Kochi, Jo And Sams Villa offers a
                perfect blend of traditional Kerala architecture and modern
                comforts. This heritage villa provides an intimate experience of
                Kerala&apos;s rich culture while being conveniently located near all
                the attractions of Kochi. Experience authentic hospitality and
                personalized service in this beautifully restored property.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gray-100 rounded-full p-4 mb-3">
                    <Image
                      src="/resorts/house/featuredicons/icon1.png"
                      alt="Heritage Architecture"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                      quality={100}
                      priority
                    />
                  </div>
                  <p className="text-xs md:text-sm font-bold">
                    Authentic Kerala heritage architecture
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gray-100 rounded-full p-4 mb-3">
                    <Image
                      src="/resorts/house/featuredicons/icon2.png"
                      alt="City Access"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                      quality={100}
                      priority
                    />
                  </div>
                  <p className="text-xs md:text-sm font-bold">
                    Prime location with easy access to Kochi attractions
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gray-100 rounded-full p-4 mb-3">
                    <Image
                      src="/resorts/house/featuredicons/icon3.png"
                      alt="Personalized Service"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                      quality={100}
                      priority
                    />
                  </div>
                  <p className="text-xs md:text-sm font-bold">
                    Personalized service and authentic local experiences
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Banner image and gallery */}
          <div className="md:w-1/2 flex flex-col space-y-4">
            <div className="relative">
              <Image
                src={currentBanner}
                alt="Jo And Sams Villa Main View"
                width={700}
                height={500}
                className="w-full h-72 md:h-96 object-cover rounded-lg cursor-pointer"
                quality={100}
                onClick={toggleCarousel}
              />
              {/* <div className="absolute bottom-4 right-4">
                <button 
                  className="bg-white bg-opacity-80 text-gray-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-opacity-100 transition duration-200"
                  onClick={toggleCarousel}
                >
                  {showCarousel ? "Hide Gallery" : "View Gallery"}
                </button>
              </div> */}
            </div>

            {/* Gallery carousel - only shown when toggled */}
            {showCarousel && (
              <div className="relative mt-2 bg-gray-100 p-4 rounded-lg">
                <div className="absolute inset-y-0 left-0 z-10 flex items-center">
                  <button
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                    onClick={handlePrev}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-800" />
                  </button>
                </div>

                <div
                  ref={carouselRef}
                  className="flex overflow-x-auto scrollbar-hide gap-2 py-2 px-12"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                        activeSlide === index 
                          ? "opacity-100 scale-105 border-2 border-green-500" 
                          : "opacity-70 hover:opacity-90"
                      }`}
                      onClick={() => selectThumbnail(index)}
                    >
                      <Image
                        src={image}
                        alt={`Jo And Sams Villa Gallery Image ${index + 1}`}
                        width={120}
                        height={80}
                        className="h-16 w-24 object-cover rounded-md"
                        quality={90}
                      />
                    </div>
                  ))}
                </div>

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
            )}
          </div>
        </div>
      {/* </div> */}
        {/* </div> */}
      </div>

      {/* Welcome Section */}
      <div className="relative mb-8">
        <div className="text-center py-8 px-4 md:px-8 bg-green-50">
          <h2 className="text-3xl font-serif text-green-800 mb-4">
            Welcome to Jo And Sams Villa
          </h2>
          <p className="max-w-3xl mx-auto text-sm md:text-base">
            Experience the perfect blend of Kochi&apos;s vibrant culture and the
            tranquility of a heritage home. Jo And Sams Villa offers a unique
            opportunity to immerse yourself in Kerala&apos;s traditions while enjoying
            modern comforts in the heart of the city.
          </p>
        </div>

        <div className="w-full mt-4 aspect-w-16 aspect-h-9">
          <div
            className="relative w-full h-auto overflow-hidden"
            style={{ paddingBottom: "56.25%" }}
          >
            <Image
              src="/resorts/house/welcomesection.avif"
              alt="Jo And Sams Villa with Traditional Courtyard"
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
            <div className="md:w-1/2">
              <h3 className="font-bold text-lg mb-4">What to Expect:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Authentic Kerala heritage architecture with modern amenities
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Spacious rooms with traditional wooden furniture and decor
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Central location near Fort Kochi attractions and beaches
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Personalized service from knowledgeable local hosts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Authentic Kerala cuisine prepared with local ingredients
                  </span>
                </li>
              </ul>
            </div>

            <div className="md:w-1/2">
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">Property Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      alt: "Parking",
                      label: "Secured parking",
                      img: "/resorts/house/propertiesamenties/parking.png",
                    },
                    {
                      alt: "Books",
                      label: "Books, DVDs, music for children",
                      img: "/resorts/house/propertiesamenties/books.png",
                    },
                    {
                      alt: "Yoga",
                      label: "Yoga classes",
                      img: "/resorts/house/propertiesamenties/yoga.png",
                    },
                    {
                      alt: "Free WiFi",
                      label: "Free WiFi",
                      img: "/resorts/house/propertiesamenties/freewifi.png",
                    },
                    {
                      alt: "Bicycle",
                      label: "Bicycle rental",
                      img: "/resorts/house/propertiesamenties/bicycle.png",
                    },
                    {
                      alt: "Bicycle",
                      label: "Bicycle Available",
                      img: "/resorts/house/propertiesamenties/bicycleavailable.png",
                    },
                    {
                      alt: "Play area",
                      label: "Indoor play area for children",
                      img: "/resorts/house/propertiesamenties/playarea.png",
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
                      img: "/resorts/house/roomfeatures/airconditioning.png",
                    },
                    {
                      alt: "Housekeeping",
                      label: "House keeping",
                      img: "/resorts/house/roomfeatures/housekeeping.png",
                    },
                    {
                      alt: "Balcony",
                      label: "Private balcony",
                      img: "/resorts/house/roomfeatures/balcony.png",
                    },
                    {
                      alt: "Room service",
                      label: "Room service",
                      img: "/resorts/house/roomfeatures/roomservice.png",
                    },
                    {
                      alt: "Kitchenette",
                      label: "Kitchenette",
                      img: "/resorts/house/roomfeatures/kitchen.png",
                    },
                    {
                      alt: "Radio",
                      label: "Radio",
                      img: "/resorts/house/roomfeatures/radio.png",
                    },
                    {
                      alt: "Extra long beds",
                      label: "Extra long beds",
                      img: "/resorts/house/roomfeatures/longbed.png",
                    },
                    {
                      alt: "Bath/Shower",
                      label: "Bath/Shower",
                      img: "/resorts/house/roomfeatures/bath.png",
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

      {/* Why Choose This Villa */}
      <div className="mb-1">
        <div className="px-4 md:px-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Why Choose Jo And Sams Villa
          </h2>
          <p className="text-center mb-8 max-w-3xl mx-auto text-sm md:text-base">
            Jo And Sams Villa offers the perfect combination of heritage charm
            and city convenience. Whether you&apos;re exploring Kochi&apos;s historic
            sites, enjoying the local cuisine, or simply relaxing in our
            beautiful courtyard, you&apos;ll experience authentic Kerala hospitality
            at its finest. Our villa provides a peaceful retreat after a day of
            city exploration, with all the comforts of home in a uniquely
            beautiful setting.
          </p>
        </div>

        <div className="w-full">
          <div
            className="relative w-full overflow-hidden"
            style={{ paddingBottom: "56.25%" }}
          >
            <Image
              src="/resorts/house/whychoose.avif"
              alt="Jo And Sams Villa courtyard and traditional architecture"
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