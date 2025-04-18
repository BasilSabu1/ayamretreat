// components/Footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* First column - Logo, description, social links */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <div className="mb-4">
              <Link href="/">
                <div className="w-48 relative">
                  <div className="text-blue-500 font-bold">
                    <Image
                      src="/headerlogo.png"
                      alt="AyAm Retreat Logo"
                      width={48}
                      height={48}
                      className="h-12 w-auto mx-auto" // <-- Center image itself
                      unoptimized
                    />
                  </div>
                </div>
              </Link>
            </div>
            <p className="text-gray-600 text-sm mb-4 text-center md:text-left">
            Discover exclusive resort experiences with our subscription plans - your getaway, anytime you need it.

            </p>
            <div className="flex space-x-4 mb-4">
              <Link href="#" aria-label="Facebook">
                <div className="text-blue-500">
                  <FaFacebookF size={16} />
                </div>
              </Link>
              <Link href="#" aria-label="Twitter">
                <div className="text-blue-400">
                  <FaTwitter size={16} />
                </div>
              </Link>
              <Link href="#" aria-label="Instagram">
                <div className="text-blue-500">
                  <FaInstagram size={16} />
                </div>
              </Link>
            </div>
            <p className="text-gray-400 text-xs text-center md:text-left">© 2025 Ayam Retreat. All rights reserved.</p>
          </div>

          {/* Product Column */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-medium mb-4">Engage</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  href="/Retreats"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Retreats 
                </Link>
              </li>
              <li>
                <Link
                  href="/Experiences"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Experiences 
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Gallery 
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Blog 
                </Link>
              </li>
            </ul>
          </div>

          {/* Engage Column */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-medium mb-4">Quick Links </h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/termsandcondition"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Earn Money Column */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-medium mb-4">Earn Money</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  href="/Referrals"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Referrals
                </Link>
              </li>
              <li>
                <Link
                  href="/become-partner"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Become Partner
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;