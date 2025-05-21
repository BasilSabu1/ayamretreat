"use client";

import { FC, useEffect, useState } from "react";
import { Check,  Lock, X } from "lucide-react";
import Image from "next/image";
import axiosInstance from "../apiconfig/axios";
import { API_URLS } from "../apiconfig/api_urls";
import { useRouter } from "next/navigation";
import LoginModal from "../Auth/Login";

// Declare Razorpay types
declare interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    [key: string]: string;
  };
  theme: {
    color: string;
  };
}

declare interface RazorpayInstance {
  open: () => void;
}

declare interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

// Define types for membership plans
interface BenefitItem {
  text: string;
}

interface LoginAlertProps {
  onLogin: () => void;
  onCancel: () => void;
  onOpenLoginModal: () => void;
}

interface Membership {
  id: string;
  name: string;
  amount: string;
  description: string;
  is_popular: boolean;
  limited_offer: boolean;
  benefits: {
    id: number;
    benefit_text: string;
  }[];
  referral_limit: number;
}

interface MembershipCardProps {
  type: string;
  price: number;
  discountedPrice?: number;
  benefits: BenefitItem[];
  isPopular?: boolean;
  isLimitedTimeOffer?: boolean;
  onSubscribe: () => void;
  subscriptionId: string;
}

interface User {
  uuid: string;
  name?: string;
  email?: string;
  phone?: string;
  username?: string;
  phone_number?: string;
  firebase_uid?: string;
  dob?: string;
}

// Alert component for login requirement
const LoginAlert: FC<LoginAlertProps> = ({
  onLogin,
  onCancel,
  // onOpenLoginModal,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white rounded-xl p-6 shadow-2uşt max-w-md w-full border-t-4 border-blue-500 transform transition-all duration-300 ease-in-out"
        style={{
          boxShadow: isHovering
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute top-3 right-3">
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Lock className="text-blue-600" size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Login Required</h3>
        </div>

        <p className="text-gray-600 mb-6 text-center">
          You&apos;ll need to sign in to continue with your membership purchase.
          Ready to proceed?
        </p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={onLogin}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 fokus:outline-none"
          >
            Sign In Now
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-300 focus:outline-none"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

// Success Alert component
const SuccessAlert: FC<{
  onClose: () => void;
  membershipType: string;
}> = ({ onClose, membershipType }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full border-t-4 border-green-500">
        <div className="text-center mb-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Payment Successful!
          </h3>
        </div>
        <p className="text-gray-600 mb-6 text-center">
          Congratulations! Your {membershipType} membership is now active. Enjoy
          exclusive benefits and amazing stays across our properties.
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const MembershipCard: FC<MembershipCardProps> = ({
  type,
  price,
  discountedPrice,
  benefits,
  isPopular = false,
  isLimitedTimeOffer = false,
  onSubscribe,
}) => {
  const isGold = type === "Gold" || "gold";
  const isPlatinum = type === "Platinum" || "platinum";
  const basePrice = discountedPrice ?? price;
  const gst = basePrice * 0.18;
  const totalPrice = basePrice + gst;
console.log(type);


  console.log(isPlatinum);
  
  // Define button styles based on membership type
  const buttonStyle = isGold
    ? {
        background: "linear-gradient(to bottom, #ffd700, #daa520)",
        border: "1px solid #b8860b",
      }
    : isPlatinum
    ? {
        background: "linear-gradient(to bottom, #e5e4e2, #a7a6a5)",
        border: "1px solid #a7a6a5",
      }
    : {
        background: "linear-gradient(to bottom, #2563eb, #1d4ed8)",
        border: "1px solid #1e40af",
      };

  return (
    <div className="relative bg-black text-white rounded-lg overflow-hidden shadow-xl flex flex-col h-full">
      <div className="p-6">
        {isPopular && (
          <div className="absolute top-2 right-2">
            <span className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              Popular
            </span>
          </div>
        )}

        <h3 className="text-xl font-bold mb-3">{type}</h3>

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

          <div className="mt-2 text-sm">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>₹{basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span>₹{gst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold mt-1 pt-1 border-t border-gray-700">
              <span>Total:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-4">
          Welcome to our exclusive subscription program — your gateway
        </p>

        <button
          onClick={onSubscribe}
          className="w-full py-2 font-bold rounded text-black transition-all duration-200 hover:opacity-90"
          style={buttonStyle}
        >
          Subscribe
        </button>
      </div>

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
      </div>
    </div>
  );
};

const MembershipSection: FC = () => {
  const router = useRouter();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [currentMembershipType, setCurrentMembershipType] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      fetchMemberships();
    }
  }, []);


  console.log(isRegisterModalOpen);
  
  const fetchMemberships = async () => {
    try {
      const response = await axiosInstance.get(
        API_URLS.MEMBERSHIP.GET_MEMBERSHIP
      );

      if (response.data && response.data.length > 0) {
        const formattedMemberships = response.data.map(
          (membership: Membership) => ({
            ...membership,
            amount: parseFloat(membership.amount).toString(),
            benefits: Array.isArray(membership.benefits)
              ? membership.benefits.map((benefit) => ({
                  id: benefit.id,
                  benefit_text: benefit.benefit_text,
                }))
              : [],
          })
        );

        setMemberships(formattedMemberships);
      } else {
        console.error("No membership data received from API");
        alert("No membership plans available. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching memberships:", error);
      alert("Failed to load membership plans. Please try again later.");
    }
  };

  const handleSubscribe = async (
    membershipType: string,
    subscriptionPlanId: string
  ) => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    setCurrentMembershipType(membershipType);

    const membership = memberships.find((m) => m.id === subscriptionPlanId);
    if (!membership) {
      console.error(`Membership ${membershipType} not found`);
      alert("Selected membership not found. Please try again.");
      return;
    }

    const baseAmount = parseFloat(membership.amount);
    if (isNaN(baseAmount)) {
      console.error("Invalid membership amount:", membership.amount);
      alert("Invalid membership amount. Please contact support.");
      return;
    }

    const gstAmount = baseAmount * 0.18;
    const totalAmount = baseAmount + gstAmount;

    try {
      const orderData = {
        user_uuid: user.uuid,
        subscription_plan_uuid: subscriptionPlanId,
      };

      const orderResponse = await axiosInstance.post<{
        id: string;
        key: string;
      }>(API_URLS.PAYMENT.POST_CREATE_ORDER, orderData);

      const { id: orderId, key } = orderResponse.data;

      const loadRazorpay = () => {
        return new Promise((resolve, reject) => {
          if (window.Razorpay) {
            resolve(window.Razorpay);
            return;
          }

          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => {
            if (window.Razorpay) {
              resolve(window.Razorpay);
            } else {
              reject(new Error("Razorpay SDK failed to initialize"));
            }
          };
          script.onerror = () => {
            reject(new Error("Failed to load Razorpay SDK"));
          };
          document.body.appendChild(script);
        });
      };

      try {
        await loadRazorpay();
      } catch (error) {
        console.error("Error loading Razorpay SDK:", error);
        alert("Failed to load payment gateway. Please try again.");
        return;
      }

      if (!window.Razorpay) {
        console.error("Razorpay SDK is not available");
        alert("Payment gateway is not available. Please try again.");
        return;
      }

      const options: RazorpayOptions = {
        key: key || "rzp_test_Mou46QHhq1Bzws",
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        name: "Ayam Retreats",
        description: `${membershipType} Membership`,
        order_id: orderId,
        handler: function (response) {
          handlePaymentSuccess(response, membershipType, subscriptionPlanId);
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.phone_number || user.phone || "",
        },
        notes: {
          membership_type: membershipType,
          user_id: user.uuid,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating payment order:", error);
      alert("There was an error processing your payment. Please try again.");
    }
  };
  const handlePaymentSuccess = async (
    response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    },
    membershipType: string,
    subscriptionPlanId: string
  ) => {
    try {
      const verifyData = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        user_uuid: user?.uuid,
        subscription_plan_uuid: subscriptionPlanId,
      };

      await axiosInstance.post(
        API_URLS.VERIFY_PAYMENT.POST_VERIFY_PAYMENT,
        verifyData
      );

      const membershipData = {
        type: membershipType,
        purchase_date: new Date().toISOString(),
        payment_id: response.razorpay_payment_id,
        user_uuid: user?.uuid,
      };

      localStorage.setItem("membership", JSON.stringify(membershipData));

      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Payment verification failed. Please contact support.");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const closeSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  console.log(memberships);

  return (
    <div className="w-full bg-white">
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
            <p className="ml-0 max-w-lg text-base md:text-lg text-gray-800 font-medium">
              Welcome to our exclusive subscription program — your gateway to
              unforgettable stays across our 5 signature retreats and partner
              resorts. Choose a plan that suits your lifestyle and start earning
              incredible rewards for every referral.
            </p>
          </div>
        </div>
      </div>

      <div
        className="relative pt-12 pb-24"
        style={{
          backgroundImage: `url('/membership/planbackground.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
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
            {memberships.map((membership) => (
              <MembershipCard
                key={membership.id}
                type={membership.name}
                price={Number(membership.amount) * 2}
                discountedPrice={Number(membership.amount)}
                benefits={
                  membership.benefits?.map((b) => ({
                    text: b.benefit_text,
                  })) || []
                }
                isPopular={membership.is_popular}
                isLimitedTimeOffer={membership.limited_offer}
                onSubscribe={() =>
                  handleSubscribe(membership.name, membership.id)
                }
                subscriptionId={membership.id}
              />
            ))}
          </div>

          <div className="mt-24 max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Why Subscribe?
              </h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    Whether you&apos;re a frequent traveler, a wellness seeker, or
                    someone who loves sharing soulful experiences with others —
                    this is your key to a deeper connection with our world. Our
                    retreats are accessible only through subscription, making
                    this your exclusive path in.
                  </p>
                </div>
                <div className="hidden md:block w-px h-32 bg-gray-200"></div>
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

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      {showLoginAlert && (
        <LoginAlert
          onLogin={handleLoginRedirect}
          onCancel={() => setShowLoginAlert(false)}
          onOpenLoginModal={() => {
            setShowLoginAlert(false);
            setIsLoginModalOpen(true);
          }}
        />
      )}

      {showSuccessAlert && (
        <SuccessAlert
          onClose={closeSuccessAlert}
          membershipType={currentMembershipType}
        />
      )}
    </div>
  );
};

export default MembershipSection;
