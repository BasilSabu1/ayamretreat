"use client";

import { FC } from "react";
import { Check } from "lucide-react";
import Image from "next/image";

// Define types for membership plans
interface BenefitItem {
  text: string;
}

// interface PlanProps {
//   title: string;
//   price: number;
//   originalPrice?: number;
//   currency: string;
//   interval: string;
//   benefits: BenefitItem[];
//   isPopular?: boolean;
//   limitedOffer?: boolean;
//   referrals?: number;
//   cardColor: string;
//   textColor: string;
//   btnColor: string;
//   btnHoverColor: string;
//   btnTextColor: string;
//   iconColor: string;
// }

// Define specific props for MembershipCard
interface MembershipCardProps {
  type: string;
  price: number;
  discountedPrice?: number;
  benefits: BenefitItem[]; // Using BenefitItem type to match with benefits array
  isPopular?: boolean;
  isLimitedTimeOffer?: boolean;
}

const MembershipCard: FC<MembershipCardProps> = ({
  type,
  price,
  discountedPrice,
  benefits,
  isPopular = false,
  isLimitedTimeOffer = false,
}) => {
  const isGold = type === "Gold";

  return (
    <div className="relative bg-black text-white rounded-lg overflow-hidden shadow-xl flex flex-col h-full">
      {/* Card Header */}
      <div className="p-6">
        {isPopular && (
          <div className="absolute top-2 right-2">
            <span className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              Popular
            </span>
          </div>
        )}

        <h3 className="text-xl font-bold mb-3">{type}</h3>

        {/* Price Section */}
        <div className="mb-4">
          {discountedPrice ? (
            <>
              <div className="flex items-baseline mb-1">
                <span className="text-gray-400 line-through text-lg">
                  ₹{price.toLocaleString()}
                </span>
                {isLimitedTimeOffer && (
                  <div
                    className="ml-2 text-black text-xs font-medium px-2 py-0.5 rounded"
                    style={{
                      background: "linear-gradient(to right, #ffd700, #b8860b)",
                      border: "1px solid #b8860b",
                    }}
                  >
                    Limited time offer price
                  </div>
                )}
              </div>
              <div className="flex items-baseline">
                <span className="text-lg">₹</span>
                <span className="text-3xl font-bold">
                  {discountedPrice.toLocaleString()}
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-baseline">
              <span className="text-lg">₹</span>
              <span className="text-3xl font-bold">
                {price.toLocaleString()}
              </span>
            </div>
          )}
          <div className="text-xs text-gray-400 mt-1">one time payment</div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4">
          Welcome to our exclusive subscription program — your gateway
        </p>

        {/* Subscribe Button */}
        <button
          className="w-full py-2 font-bold rounded text-black"
          style={{
            background: isGold
              ? "linear-gradient(to bottom, #ffd700, #daa520)"
              : "linear-gradient(to bottom, #e0e0e0, #a0a0a0)",
            border: isGold ? "1px solid #b8860b" : "1px solid #808080",
          }}
        >
          Subscribe
        </button>
      </div>

      {/* Benefits Section */}
      <div className="px-6 pb-6 flex-grow">
        <div className="border-t border-gray-700 pt-4">
          <h4 className="text-center uppercase text-sm tracking-wider mb-4 font-medium">
            BENEFITS
          </h4>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check
                  className={`h-5 w-5 ${
                    isGold ? "text-yellow-500" : "text-gray-400"
                  } flex-shrink-0 mt-0.5`}
                />
                <span className="text-gray-300">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* View More Link */}
        {/* <div className="mt-4 text-right">
          <a
            href="#"
            className="text-xs text-gray-400 hover:text-white inline-flex items-center"
          >
            View more <span className="ml-1">+</span>
          </a>
        </div> */}
      </div>
    </div>
  );
};

const MembershipSection: FC = () => {
  const goldBenefits = [
    {
      text: "One Free Stay for 1 Night(2 pax/2 kids) Each Year at Any of our Jaipur Retreat property.",
    },
    {
      text: "10% Discount on all associated resorts/homestays for additional stays during the year.",
    },
    {
      text: "Referral Benefit: Get 10% of the stay cost back as credit when you refer a friend (non-member) who books a stay.",
    },
    {
      text: "Total 10 referrals per year. After 10 referrals, get 10% of the stay cost back as credit.",
    },
  ];

  const platinumBenefits = [
    {
      text: "One Free Stay for 2 Nights(2 pax/2 kids) Each Year at Any of our Jaipur Retreat property.",
    },
    {
      text: "50% Discount on all associated resorts/homestays for additional stays during the year.",
    },
    {
      text: "Referral Benefit: Get 30% of the stay cost back as credit when you refer a friend (non-member) who books a stay.",
    },
    { text: "Unlimited referrals." },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Full Background Image */}
      <div
        className="relative w-full h-[500px] md:h-[600px] overflow-hidden"
        style={{
          backgroundImage: `url('/membership/banner.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-green-400/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="flex flex-col max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-yellow-300 mb-2">
              Become a Member
            </h1>
            <h2 className="text-3xl md:text-4xl font-medium text-teal-800 italic mb-6">
              Unlock the Journey
            </h2>

            <p className="ml-0  max-w-lg text-base md:text-lg text-gray-800 font-medium">
              Welcome to our exclusive subscription program — your gateway to
              unforgettable stays across our 5 signature retreats and partner
              resorts. Choose a plan that suits your lifestyle and start earning
              incredible rewards for every referral.
            </p>
          </div>
        </div>
      </div>

      {/* Plans Section with Wave Background and Why Subscribe Section */}
      <div
        className="relative pt-12 pb-24"
        style={{
          backgroundImage: `url('/membership/planbackground.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        {/* Top wave decoration */}
        <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute top-0 w-full h-full text-white fill-current"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 mt-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Browse Our Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Gold Plan */}
            <MembershipCard
              type="Gold"
              discountedPrice={10000}
              price={20000}
              benefits={goldBenefits}
            />

            {/* Platinum Plan */}
            <MembershipCard
              type="Platinum"
              price={100000}
              discountedPrice={50000}
              benefits={platinumBenefits}
              isPopular={true}
              isLimitedTimeOffer={true}
            />
          </div>

          {/* Why Subscribe Section */}
          <div className="mt-24 max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Why Subscribe?
              </h2>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    Whether you&apos;re a frequent traveler, a wellness seeker,
                    or someone who loves sharing soulful experiences with others
                    — this is your key to a deeper connection with our world.
                    Our retreats are accessible only through subscription,
                    making this your exclusive path in.
                  </p>
                </div>

                {/* Vertical divider for desktop */}
                <div className="hidden md:block w-px h-32 bg-gray-200"></div>

                {/* Icons section */}
                <div className="relative w-36 h-36 flex-shrink-0 transform rotate-12">
                  <Image
                    src="/membership/whysubscribe.png"
                    alt="Why Subscribe"
                    fill
                    className="object-contain rounded-full border-4 border-blue-100"
                    sizes="144px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full text-white fill-current transform rotate-180"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MembershipSection;
