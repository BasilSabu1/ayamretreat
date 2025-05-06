// AboutUs.tsx
import React from "react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  const images = [
    {
      src: "/aboutuspage/gallery1.png",
      alt: "Traditional retreat accommodation",
    },
    { src: "/aboutuspage/gallery2.png", alt: "Misty morning at retreat" },
    { src: "/aboutuspage/gallery3.png", alt: "Shiva statue" },
    { src: "/aboutuspage/gallery4.png", alt: "Beachside retreat" },
    { src: "/aboutuspage/gallery5.png", alt: "Nature landscape" },
  ];

  return (
    <div className="flex flex-col w-full bg-green-50">
      {/* Hero Section */}

      
      <div className="relative h-80 md:h-96 lg:h-screen lg:max-h-[600px] w-full">
        <Image
          src="/aboutpage.png"
          alt="Misty mountains landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            About Us
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl italic text-white mb-4">
            Retreats with Soul. Journeys with Meaning.
          </p>
          <p className="text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed  bg-opacity-20 p-4 rounded-lg">
            We don&apos;t just create stays. We craft spaces to breathe. At the heart
            of our journey is a belief that travel should restore, not consume.
            That the places we visit should leave an imprint not just on our
            memories, but on our soul.
          </p>
        </div>
      </div>

       

      <div className="relative w-full">
        {/* Gallery Images */}
        <div className="grid grid-cols-5 w-full mt-10">
          {images.map((image, index) => (
            <div key={index} className="relative h-96 md:h-112 lg:h-128">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority // Optional: Improves LCP by preloading
              />
            </div>
          ))}
        </div>

        {/* Overlay Text - positioned absolutely over the images */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
          <div className="w-full p-6 md:p-10 lg:p-12">
            <p className="text-center text-white text-sm md:text-base lg:text-lg font-light max-w-4xl mx-auto leading-relaxed">
              Our five retreats across Kerala — from the misty highlands of
              Idukki to the still waters of Alappuzha — are born from this
              philosophy. Each one is distinct in spirit, but unified in
              intention: to create spaces that are rooted in the land, built
              with care, and led by the rhythms of nature and community.
            </p>
          </div>
        </div>
      </div>

      {/* Mission and Vision Sections */}
      <div className="w-full bg-green-50 py-16">
        {/* Container for both sections with more spacing between */}
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          {/* Mission Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Our Mission
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To create soulful, sustainable retreats that honor local
                    culture, uplift communities, and offer travelers meaningful
                    connections with nature and self.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 md:ml-28 p-6">
                <div className="h-64 md:h-80 overflow-hidden rounded-xl relative">
                  <Image
                    src="/aboutuspage/mission.jpg"
                    alt="Local farmer working in rice field"
                    fill
                    className="object-cover rounded-xl"
                    sizes="100vw"
                    priority // optional: good for above-the-fold images
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-col-reverse md:flex-row">
              <div className="w-full md:w-1/2 p-6">
                <div className="h-64 md:h-80 overflow-hidden rounded-xl relative">
                  <Image
                    src="/aboutuspage/onvision.png"
                    alt="Person relaxing by the water at sunset"
                    fill
                    className="object-cover rounded-xl"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Our Vision
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A world where travel nourishes the soul, empowers lives,
                    heals the planet, and transforms every traveler through
                    mindful exploration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different Section */}
      <div className="w-full bg-[#f5f7ed] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            What Makes Us Different?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Distinctive Retreats */}
            <div className="bg-[#e8ebdb] rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/ourphilosophy/icon1.png" // replace with your actual image path
                  alt="Distinctive Retreats"
                  width={64}
                  height={64}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Distinctive Retreats
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Five handpicked locations, each designed around a unique theme
                and terrain - from the mystic calm of Kailasam to the vibrant
                coastlines of Adventure Bay.
              </p>
            </div>

            {/* Card 2 - Rooted in Culture */}
            <div className="bg-[#e8ebdb] rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/ourphilosophy/icon2.png" // replace with your actual image path
                  alt="Rooted in Culture"
                  width={64}
                  height={64}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rooted in Culture</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We work closely with local communities to preserve and share
                indigenous knowledge, cuisine, and crafts.
              </p>
            </div>

            {/* Card 3 - Sustainably Designed */}
            <div className="bg-[#e8ebdb] rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/ourphilosophy/icon3.png" // replace with your actual image path
                  alt="Sustainably Designed"
                  width={64}
                  height={64}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Sustainably Designed
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Built with nature, not against it — every structure and system
                is created to minimize footprint and maximize harmony.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
