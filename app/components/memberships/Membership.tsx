import { FC } from "react";
import { CheckCircle } from "lucide-react";

// Define types for membership plans
interface BenefitItem {
  text: string;
}

interface PlanProps {
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  interval: string;
  benefits: BenefitItem[];
  isPopular?: boolean;
  limitedOffer?: boolean;
  referrals?: number;
  cardColor: string;
  textColor: string;
  btnColor: string;
  btnHoverColor: string;
  btnTextColor: string;
  iconColor: string;
}

const MembershipPlan: FC<PlanProps> = ({
  title,
  price,
  originalPrice,
  currency,
  interval,
  benefits,
  isPopular = false,
  limitedOffer = false,
  referrals,
  cardColor,
  textColor,
  btnColor,
  btnHoverColor,
  btnTextColor,
  iconColor,
}) => {
  return (
    <div className={`relative rounded-lg overflow-hidden ${cardColor} ${textColor} flex flex-col h-full shadow-xl`}>
      {isPopular && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
            Popular
          </span>
        </div>
      )}
      {limitedOffer && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-yellow-500 text-black text-xs font-medium px-3 py-1 transform translate-x-4 -translate-y-1 shadow-md">
            Limited Time Offer
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-lg font-bold">{currency}</span>
          <span className="text-3xl font-bold">{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="ml-2 text-lg text-gray-400 line-through">
              {currency}
              {originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-400 mb-4">
          {interval === "payment" ? "one time payment" : `per ${interval}`}
        </div>
        <p className="text-sm text-gray-300 mb-4">
          Welcome to our exclusive subscription program — your gateway
        </p>
        <button className={`w-full ${btnColor} hover:${btnHoverColor} ${btnTextColor} font-bold py-2 rounded transition-colors shadow-lg`}>
          Subscribe
        </button>
      </div>

      <div className="px-6 pb-6 mt-2">
        <div className="border-t border-gray-700 pt-4 mb-4">
          <h4 className="text-center uppercase text-sm tracking-wider mb-4 font-medium">
            BENEFITS
          </h4>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className={`h-5 w-5 ${iconColor} flex-shrink-0 mt-0.5`} />
                <span className="text-sm text-gray-300">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>
        {referrals && (
          <div className="mt-4">
            <p className="text-xs text-gray-300">
              Total {referrals} referrals per year. After {referrals} referrals, get 10% of the stay cost back as credit.
            </p>
          </div>
        )}
        <div className="mt-4">
          <a href="#" className="text-xs text-gray-400 hover:text-white">
            View more +
          </a>
        </div>
      </div>
    </div>
  );
};

const MembershipSection: FC = () => {
  const goldBenefits = [
    {
      text: "One Free Stay for 1 Night(per/2 nts) total Every Year for 5 years at any given Retreat property.",
    },
    {
      text: "50% Discount on all associated resorts/ Retreats for additional days during the year.",
    },
    {
      text: "Referral Benefit: Get 50% of the stay cost back as credit when you refer a friend (non-member) who books a stay.",
    },
    {
      text: "Total 10 referrals per year. After 10 referrals, get 10% of the stay cost back as credit.",
    },
  ];

  const platinumBenefits = [
    {
      text: "One Free Stay for 2 Nights(per/4 nts) total Every Year for 5 years at any given Retreat property.",
    },
    {
      text: "50% Discount on all associated resorts/ Retreats for additional days during the year.",
    },
    {
      text: "Referral Benefit: Get 50% of the stay cost back as credit when you refer a friend (non-member) who books a stay.",
    },
    { text: "Unlimited referrals." },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section with Full Background Image */}
      <div 
        className="relative w-full h-96 overflow-hidden"
        style={{
          backgroundImage: `url('/membership/banner.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-green-400/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Become a Member
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-white italic">
            Unlock the Journey
          </h2>
          <p className="mt-4 max-w-lg text-white text-sm md:text-base">
            Welcome to our exclusive subscription program — your gateway to
            unforgettable stays across our 5 signature retreats and partner
            resorts. Choose a plan that suits your lifestyle and start earning
            incredible rewards for every referral.
          </p>
        </div>
      </div>
     
      {/* Plans Section with Wave Background and Why Subscribe Section */}
      <div 
        className="relative pt-12 pb-24"
        style={{
          backgroundImage: `url('/api/placeholder/800/400')`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundAttachment: "fixed"
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
            <MembershipPlan
              title="Gold"
              price={10000}
              currency="₹"
              interval="payment"
              benefits={goldBenefits}
              referrals={10}
              cardColor="bg-black"
              textColor="text-white"
              btnColor="bg-yellow-500"
              btnHoverColor="bg-yellow-600"
              btnTextColor="text-black"
              iconColor="text-yellow-500"
            />

            {/* Platinum Plan */}
            <MembershipPlan
              title="Platinum"
              price={50000}
              originalPrice={100000}
              currency="₹"
              interval="payment"
              benefits={platinumBenefits}
              isPopular={true}
              limitedOffer={true}
              cardColor="bg-black"
              textColor="text-white"
              btnColor="bg-yellow-500"
              btnHoverColor="bg-yellow-600"
              btnTextColor="text-black"
              iconColor="text-yellow-500"
            />
          </div>
          
          {/* Why Subscribe Section */}
          <div className="mt-24 max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Subscribe?</h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    Whether you're a frequent traveler, a wellness seeker, 
                    or someone who loves sharing soulful experiences 
                    with others — this is your key to a deeper connection 
                    with our world. Our retreats are accessible only 
                    through subscription, making this your exclusive 
                    path in.
                  </p>
                </div>
                
                {/* Vertical divider for desktop */}
                <div className="hidden md:block w-px h-32 bg-gray-200"></div>
                
                {/* Image icon */}
                <div className="relative w-36 h-36 flex-shrink-0 transform rotate-12">
                  <img 
                    src="/membership/whysubscribe.png" 
                    alt="Why Subscribe"
                    className="w-full h-full object-contain rounded-full border-4 border-blue-100"
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