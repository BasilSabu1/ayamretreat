"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Main header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-blue-500 font-bold">
            <Link href="/">
              <Image
                src="/headerlogo.png"
                alt="AyAm Retreat Logo"
                width={48}
                height={48}
                className="h-12 w-auto cursor-pointer"
                unoptimized
              />
            </Link>
          </div>
        </div>

        {/* Navigation - desktop - positioned more to the right */}
        <nav className="hidden md:flex items-center ml-auto mr-20">
          <div className="flex space-x-12">
          <Link
              href="/"
              className="text-gray-800 hover:text-blue-500 text-lg"
            >
              Home
            </Link>
            <Link
              href="/aboutus"
              className="text-gray-800 hover:text-blue-500 text-lg"
            >
              About us
            </Link>
            <Link
              href="/resorts"
              className="text-gray-800 hover:text-blue-500 text-lg"
            >
              Resorts
            </Link>
            <Link
              href="/retreats"
              className="text-gray-800 hover:text-blue-500 text-lg"
            >
              Retreats
            </Link>
            <Link
              href="/membership"
              className="text-gray-800 hover:text-blue-500 text-lg"
            >
              Membership
            </Link>
          </div>
        </nav>

        {/* Account button */}
        <div className="flex items-center space-x-4 text-lg">
          <Link
            href="#account"
            className="hidden md:flex items-center text-gray-800 hover:text-blue-500"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              fill="none"
              className="mr-2"
            >
              <circle cx="12" cy="8" r="5" strokeWidth="2" />
              <path d="M3 21v-2a9 9 0 0 1 18 0v2" strokeWidth="2" />
            </svg>
            Account
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Construction notice banner with automatic carousel effect */}
      <div className="w-full bg-gray-100 overflow-hidden whitespace-nowrap py-2 text-sm">
        <div className="marquee relative flex overflow-x-hidden">
          <div className="marquee-content py-0 animate-marquee whitespace-nowrap flex">
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
          </div>

          <div className="marquee-content absolute top-0 py-0 animate-marquee2 whitespace-nowrap flex">
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
            <span className="mx-4 text-lg">
              • Website currently under construction{" "}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 right-0 left-0 z-10">
          <nav className="flex flex-col px-4 py-2">
          <Link
              href="/"
              className="py-2 text-gray-800 hover:text-blue-500"
            >
             Home
            </Link>
            <Link
              href="/aboutus"
              className="py-2 text-gray-800 hover:text-blue-500"
            >
              About us
            </Link>

            <Link
              href="/resorts"
              className="text-gray-800 hover:text-blue-500 text-lg"
            >
              Resorts
            </Link>
            <Link
              href="/retreats"
              className="py-2 text-gray-800 hover:text-blue-500"
            >
              Retreats
            </Link>
            <Link
              href="/membership"
              className="py-2 text-gray-800 hover:text-blue-500"
            >
              Membership
            </Link>
            <Link
              href="#account"
              className="py-2 text-gray-800 hover:text-blue-500 flex items-center"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                fill="none"
                className="mr-2"
              >
                <circle cx="12" cy="8" r="5" strokeWidth="2" />
                <path d="M3 21v-2a9 9 0 0 1 18 0v2" strokeWidth="2" />
              </svg>
              Account
            </Link>
          </nav>
        </div>
      )}

      {/* Adding the required CSS for animations */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
