import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SaantaraRetreat() {
  const [showMore, setShowMore] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const galleryImages = [
    "/resorts/saantara/gallery/gallery1.png",
    "/resorts/saantara/gallery/gallery2.png",
    "/resorts/saantara/gallery/gallery3.png",
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
        {/* Main Content Section */}
        {/* Main Section with Text and Banner Image */}
        {/* <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Saantara Retreat
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
                Palakkad
              </span>{" "}
              <span className="text-gray-400">•</span>
              <span className="bg-blue-400 text-black px-2 py-0.5 rounded-full">
                Wellness & Luxury Stay
              </span>
            </div>
            <p className="text-sm md:text-base">
              Rooted in the heart of a traditional Kerala village, Saantara
              invites you to step into the timeless wisdom of Ayurveda and
              ancestral living. Housed in an elegant mana—a heritage Kerala
              home—this retreat is a serene blend of architecture, culture, and
              ancient healing. Here, wellness is not a trend; its a way of life.
              Every detail honors balance, tradition, and slow, intentional
              living. This is your invitation to Breathe in Tradition.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full p-2 mb-2">
                  <Image
                    src="/resorts/saantara/featuredicons/icon1.png"
                    alt="Coffee Estate"
                    width={32}
                    height={32}
                    className="h-8 w-8 md:h-10 md:w-10"
                    quality={100}
                  />
                </div>
                <p className="text-xs md:text-sm">
                  Restorative Ayurvedic therapies in a heritage Kerala home
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full p-2 mb-2">
                  <Image
                    src="/resorts/saantara/featuredicons/icon2.png"
                    alt="Heritage"
                    width={32}
                    height={32}
                    className="h-8 w-8 md:h-10 md:w-10"
                    quality={100}
                  />
                </div>
                <p className="text-xs md:text-sm">
                  Authentic village setting surrounded by coconut groves{" "}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full p-2 mb-2">
                  <Image
                    src="/resorts/saantara/featuredicons/icon3.png"
                    alt="Nature"
                    width={32}
                    height={32}
                    className="h-8 w-8 md:h-10 md:w-10"
                    quality={100}
                  />
                </div>
                <p className="text-xs md:text-sm">
                  Deep cultural immersion with healing as a way of life{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 space-y-2">
            <div className="relative">
              <Image
                src="/resorts/saantara/bannersection.png"
                alt="Saantara Retreat Main View"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
                quality={100}
              />
            </div>

            <div className="relative">
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
                    className={`flex-shrink-0 cursor-pointer transition-opacity duration-300 ${
                      activeSlide === index ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Saantara Gallery Image ${index + 1}`}
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
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 space-y-4">
            <Image
              src="/resorts/saantara/logo.png"
              alt="Drifter's Valley Logo"
              width={220}
              height={100}
              className="h-20 md:h-32 w-auto"
              quality={100}
              priority
            />
            <h1 className="text-3xl font-bold text-gray-800">
              Saantara Retreat
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
                Palakkad
              </span>
              <span className="text-gray-400">•</span>
              <span className="bg-blue-400 text-black px-2 py-0.5 rounded-full">
                Wellness & Luxury Stay
              </span>
            </div>
            <p className="text-sm md:text-base">
              Rooted in the heart of a traditional Kerala village, Saantara
              invites you to step into the timeless wisdom of Ayurveda and
              ancestral living. Housed in an elegant mana—a heritage Kerala
              home—this retreat is a serene blend of architecture, culture, and
              ancient healing. Here, wellness is not a trend; its a way of life.
              Every detail honors balance, tradition, and slow, intentional
              living. This is your invitation to Breathe in Tradition.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100 rounded-full p-4 mb-3">
                  <Image
                    src="/resorts/saantara/featuredicons/icon1.png"
                    alt="Coffee Estate"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                    quality={100}
                    priority
                  />
                </div>
                <p className="text-sm md:text-base">
                  Restorative Ayurvedic therapies in a heritage Kerala home
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100 rounded-full p-4 mb-3">
                  <Image
                    src="/resorts/saantara/featuredicons/icon2.png"
                    alt="Heritage"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                    quality={100}
                    priority
                  />
                </div>
                <p className="text-sm md:text-base">
                  Authentic village setting surrounded by coconut groves
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100 rounded-full p-4 mb-3">
                  <Image
                    src="/resorts/saantara/featuredicons/icon3.png"
                    alt="Nature"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                    quality={100}
                    priority
                  />
                </div>
                <p className="text-sm md:text-base">
                  Deep cultural immersion with healing as a way of life
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 space-y-2">
            <div className="relative">
              <Image
                src="/resorts/saantara/bannersection.png"
                alt="Saantara Retreat Main View"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
                quality={100}
              />
            </div>

            <div className="relative">
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
                    className={`flex-shrink-0 cursor-pointer transition-opacity duration-300 ${
                      activeSlide === index ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Saantara Gallery Image ${index + 1}`}
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
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="relative mb-8">
        <div className="text-center py-8 px-4 md:px-8 bg-green-50">
          <h2 className="text-3xl font-serif text-green-800 mb-4">
            Welcome to Saantara
          </h2>
          <p className="max-w-3xl mx-auto text-sm md:text-base">
            Step across the threshold of time. With every scent of herbal oil,
            every chant carried on the breeze, and every bite of healing food,
            you&apos;re wrapped in centuries of care. Here, you don&apos;t just
            experience tradition—you breathe it in.
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
              src="/resorts/saantara/welcomesection.png"
              alt="Saantara Villa with Forest View"
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
                    Personalized Ayurvedic consultations and treatment plans{" "}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Daily massages, herbal therapies, and steam baths{" "}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Stay in a beautifully restored traditional mana with open
                    courtyards and wooden pillars{" "}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Village walks and lessons in Kerala&apos;s healing heritage{" "}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">
                    Plant-based, Ayurvedic meals prepared using age-old recipes
                    and local ingredients{" "}
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
                      img: "/resorts/saantara/propertiesamenties/parking.png",
                    },
                    {
                      alt: "Books",
                      label: "Books, DVDs, music for children",
                      img: "/resorts/saantara/propertiesamenties/books.png",
                    },
                    {
                      alt: "Yoga",
                      label: "Yoga classes",
                      img: "/resorts/saantara/propertiesamenties/yoga.png",
                    },
                    {
                      alt: "Free WiFi",
                      label: "Free WiFi",
                      img: "/resorts/saantara/propertiesamenties/freewifi.png",
                    },
                    {
                      alt: "Bicycle",
                      label: "Bicycle rental",
                      img: "/resorts/saantara/propertiesamenties/bicycle.png",
                    },
                    {
                      alt: "Bicycle",
                      label: "Bicycle Available",
                      img: "/resorts/saantara/propertiesamenties/bicycleavailable.png",
                    },
                    {
                      alt: "Play area",
                      label: "Indoor play area for children",
                      img: "/resorts/saantara/propertiesamenties/playarea.png",
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
                      img: "/resorts/saantara/roomfeatures/airconditioning.png",
                    },
                    {
                      alt: "Housekeeping",
                      label: "House keeping",
                      img: "/resorts/saantara/roomfeatures/housekeeping.png",
                    },
                    {
                      alt: "Balcony",
                      label: "Private balcony",
                      img: "/resorts/saantara/roomfeatures/balcony.png",
                    },
                    {
                      alt: "Room service",
                      label: "Room service",
                      img: "/resorts/saantara/roomfeatures/roomservice.png",
                    },
                    {
                      alt: "Kitchenette",
                      label: "Kitchenette",
                      img: "/resorts/saantara/roomfeatures/kitchen.png",
                    },
                    {
                      alt: "Radio",
                      label: "Radio",
                      img: "/resorts/saantara/roomfeatures/radio.png",
                    },
                    {
                      alt: "Extra long beds",
                      label: "Extra long beds",
                      img: "/resorts/saantara/roomfeatures/longbed.png",
                    },
                    {
                      alt: "Bath/Shower",
                      label: "Bath/Shower",
                      img: "/resorts/saantara/roomfeatures/bath.png",
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
            Saantara is a return to our roots. In a world that constantly pulls
            us forward, this retreat draws you inward—toward balance, tradition,
            and holistic wellness. If you&apos;re seeking healing that honors
            the body, mind, and spirit through generations of wisdom, Saantara
            is where your journey begins, gently and deeply.
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
              src="/resorts/saantara/whychoose.png"
              alt="Coffee plantations and forest views"
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
