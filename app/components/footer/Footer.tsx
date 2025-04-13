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
          <div className="md:col-span-1">
            <div className="mb-4">
              <Link href="/">
                <div className="w-48 relative">
                  <div className="text-blue-500 font-bold">
                    <Image
                      src="/headerlogo.png"
                      alt="AyAm Retreat Logo"
                      width={48}
                      height={48}
                      className="h-12 w-auto"
                      unoptimized
                    />
                  </div>
                </div>
              </Link>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              is a private virtual network that has unique features and has high
              security.
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
            <p className="text-gray-400 text-xs">Ayam Reateat</p>
          </div>

          {/* Product Column */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/download"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Download
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/server"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Server
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Countries
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
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4">Engage</h3>
            <ul className="space-y-2">
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
                  href="/tutorials"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Tutorials
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
                  href="/terms-of-service"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Earn Money Column */}
          <div className="md:col-span-1">
            <h3 className="font-medium mb-4">Earn Money</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/affiliate"
                  className="text-gray-600 hover:text-blue-500 text-sm"
                >
                  Affiliate
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
