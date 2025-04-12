import React from "react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-blue-50 p-4 md:p-8 md:mb-8 lg:p-10 lg:mb-10 w-full">
      <div className="max-w-6xl mx-auto relative">
        {/* Main content container with border */}
        <div className="border border-blue-300 rounded p-4 md:p-8 lg:p-12 bg-white/60 relative">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-gray-700 text-2xl font-medium mb-4">
              About Us
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif italic font-medium text-gray-800">
              Breathe. Be. Become.
            </h1>
          </div>

          {/* Main text content */}
          <div className="max-w-3xl mx-auto text-center text-gray-700 mb-12 md:mb-16">
            <p className="mb-4">
              At the heart of our journey lies a simple belief — travel should
              transform. Not just your surroundings, but your soul.
            </p>
            <p>
              We are more than just a collection of retreats. We are curators of
              experiences, storytellers of the land, and seekers of stillness in
              a world that rarely pauses. Each of our properties — tucked into
              the hills, woven into paddy fields, or cradled by the sea — is a
              portal to presence. A chance to reconnect with yourself, with
              nature, and with stories older than time.
            </p>
          </div>

          {/* Mobile Images  */}
          {/* Mobile Images - Updated layout */}
          <div className="flex flex-wrap justify-center gap-2 my-6 md:hidden">
            <div className="w-5/12 max-w-[160px]">
              <Image
                src="/aboutus/aboutus1.png"
                alt="Waterfall in mountains"
                width={200}
                height={250}
                className="rounded object-cover w-full h-full"
                style={{ aspectRatio: "4/5" }}
              />
            </div>
            <div className="w-5/12 max-w-[160px]">
              <Image
                src="/aboutus/aboutus2.png"
                alt="Sunset over water with people"
                width={200}
                height={150}
                className="rounded object-cover w-full h-full"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
            <div className="w-5/12 max-w-[160px] mt-2">
              <Image
                src="/aboutus/aboutus3.png"
                alt="Mountain landscape with rice fields"
                width={200}
                height={150}
                className="rounded object-cover w-full h-full"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
            <div className="w-5/12 max-w-[160px] mt-2">
              <Image
                src="/aboutus/aboutus4.png"
                alt="Sunset over lake"
                width={200}
                height={150}
                className="rounded object-cover w-full h-full"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
          </div>

          {/* Desktop positioned images - hidden on small screens */}
          {/* Top left - Waterfall */}
          <div className="hidden md:block absolute top-4 md:-top-16 -left-4 md:-left-16 lg:-left-20 w-32 md:w-48 lg:w-56">
            <div className="p-2 rounded">
              <Image
                src="/aboutus/aboutus1.png"
                alt="Waterfall in mountains"
                width={400}
                height={530}
                className="rounded"
              />
            </div>
          </div>

          {/* Top right - Sunset over water with silhouettes */}
          <div className="hidden md:block absolute top-4 md:-top-16 -right-4 md:-right-16 lg:-right-20 w-32 md:w-48 lg:w-56">
            <div className="p-2 rounded">
              <Image
                src="/aboutus/aboutus2.png"
                alt="Sunset over water with people"
                width={400}
                height={300}
                className="rounded"
              />
            </div>
          </div>

          {/* Bottom left - Mountain landscape with rice fields */}
          <div className="hidden md:block absolute -bottom-16 md:-bottom-20 -left-4 md:-left-16 lg:-left-20 w-32 md:w-48 lg:w-56">
            <div className="p-2 rounded">
              <Image
                src="/aboutus/aboutus3.png"
                alt="Mountain landscape with rice fields"
                width={400}
                height={300}
                className="rounded"
              />
            </div>
          </div>

          {/* Bottom center - Sunset over water */}
          <div className="hidden md:block absolute -bottom-16 md:-bottom-20 left-1/2 -translate-x-1/2 w-32 md:w-48 lg:w-56">
            <div className="p-2 rounded">
              <Image
                src="/aboutus/aboutus4.png"
                alt="Sunset over lake"
                width={400}
                height={300}
                className="rounded"
              />
            </div>
          </div>

          {/* Bottom right - River with trees */}
          <div className="hidden md:block absolute -bottom-16 md:-bottom-20 -right-4 md:-right-16 lg:-right-20 w-32 md:w-48 lg:w-56">
            <div className="p-2 rounded">
              <Image
                src="/aboutus/aboutus5.png"
                alt="River with trees"
                width={400}
                height={300}
                className="rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Extra bottom padding on mobile to account for negative margins */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

export default AboutUs;
