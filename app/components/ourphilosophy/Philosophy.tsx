import Image from "next/image";
import React from "react";

export default function PhilosophySection() {
  return (
    <div
      className="w-full bg-cover bg-center py-16 relative"
      style={{
        backgroundImage: 'url("/ourphilosophy.png")',
        minHeight: "100vh",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Philosophy Box */}
        <div className="bg-white p-8 mb-20 max-w-2xl mx-auto shadow-md">
          <h2 className="text-gray-700 text-center mb-4 text-lg font-medium">
            Our Philosophy
          </h2>

          <h1 className="text-3xl md:text-4xl font-serif italic text-center mb-6">
            Travel Slow. Savour Mountains.
          </h1>

          <p className="text-gray-700 text-sm leading-relaxed">
            We believe in slow travel, in savoring the silence of the mountains
            and the rhythm of the backwaters. We believe that luxury lies in
            authenticity — in conversations by firelight, in food made from
            memory, in spaces designed with purpose. Every retreat is
            intentionally built to reflect the soul of its location and the
            spirit of its people.
          </p>
        </div>

        {/* Empty space to show hikers in the background image */}
        <div className="w-full h-64 md:h-96"></div>

        {/* What Makes Us Different section */}
        <div className="bg-white p-8 shadow-md">
          <h2 className="text-gray-700 text-center mb-10 text-xl font-medium">
            What Makes Us Different?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/ourphilosophy/icon1.png"
                  alt="Distinctive Retreats Icon"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="font-medium mb-2">Distinctive Retreats</h3>
              <p className="text-xs text-gray-600 px-4">
                Five handpicked locations, each designed around a unique theme
                and terrain - from the mystic calm of Kailasam to the vibrant
                coastlines of Adventure Bay.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/ourphilosophy/icon2.png"
                  alt="Rooted in Culture Icon"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="font-medium mb-2">Rooted in Culture</h3>
              <p className="text-xs text-gray-600 px-4">
                We work closely with local communities to preserve and share
                indigenous knowledge, cuisine, and crafts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/ourphilosophy/icon3.png"
                  alt="Sustainably Designed Icon"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="font-medium mb-2">Sustainably Designed</h3>
              <p className="text-xs text-gray-600 px-4">
                Built with nature, not against it — every structure and system
                is created to minimize footprint and maximize harmony.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
