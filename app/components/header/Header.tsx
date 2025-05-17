"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, User, ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import LoginModal from "../Auth/Login";
import RegisterModal from "../Auth/Register";
import axiosInstance from "../apiconfig/axios";
import { API_URLS } from "../apiconfig/api_urls";

interface UserData {
  uuid: string;
  full_name: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: string;
  firebase_user_id?: string;
  username?: string;
}

interface Address {
  uuid: string;
  user_details: {
    uuid: string;
  };
  image: string;
  address: string;
  id: number;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPath, setLoadingPath] = useState("");
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const authMenuTriggerRef = useRef<HTMLButtonElement>(null);

  console.log(authDropdownOpen);

  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [addressData, setAddressData] = useState({
    address: "",
    image: null,
    user_uuid: "",
  });
  console.log(addressData);

  // Add refs for the dropdown menus
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const authDropdownRef = useRef<HTMLDivElement>(null);

  console.log(allUsers);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const fetchUserAddress = async () => {
    try {
      const response = await axiosInstance.get(API_URLS.ADDRESS.GET_ADDRESS);

      if (user) {
        const userAddr = response.data.find(
          (addr: Address) => addr.user_details.uuid === user.uuid
        );
        setUserAddress(userAddr || null);
        if (userAddr) {
          setAddressData({
            address: userAddr.address || "",
            image: userAddr.image || null,
            user_uuid: userAddr.user_details.uuid || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddress();
    }
  }, [user]);

  useEffect(() => {
    // Reset loading state when the pathname changes (navigation completes)
    setLoading(false);
    setLoadingPath("");
  }, [pathname]);

  // Add event listener to handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Handle user dropdown
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }

      // Handle auth dropdown - only close if clicked outside both the dropdown and trigger
      if (
        authDropdownRef.current &&
        !authDropdownRef.current.contains(event.target as Node) &&
        authMenuTriggerRef.current &&
        !authMenuTriggerRef.current.contains(event.target as Node)
      ) {
        setAuthDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clear any pending timeouts when component unmounts
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMobileMenuOpen(false);
    router.push("/");
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        API_URLS.REGISTRATION.GET_REGISTRATION
      );
      console.log(response);
      setAllUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigateToProfile = () => {
    if (user) {
      handleNavigation(`/profile/${user.uuid}`);
      setUserDropdownOpen(false);
    }
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    if (path === pathname) {
      closeMobileMenu();
      return;
    }

    setLoading(true);
    setLoadingPath(path);
    closeMobileMenu();
    router.push(path);
  };

  // Function to toggle auth dropdown visibility
  const toggleAuthDropdown = (show: boolean) => {
    // Clear any existing timeout to prevent competing actions
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (show) {
      setAuthDropdownOpen(true);
    } else {
      // Add a delay before hiding the dropdown
      closeTimeoutRef.current = window.setTimeout(() => {
        setAuthDropdownOpen(false);
      }, 300); // 300ms delay gives users time to move to the dropdown
    }
  };

  // Function to determine if a link is currently loading
  const isLinkLoading = (path: string) => {
    return loading && loadingPath === path;
  };

  // Navigation link component with loading indicator
  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <div className="relative">
      <button
        onClick={() => handleNavigation(href)}
        className={`text-gray-800 hover:text-blue-500 text-lg ${
          pathname === href ? "text-blue-500 font-medium" : ""
        }`}
      >
        {children}
      </button>
      {isLinkLoading(href) && (
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
          <div className="h-1 w-8 bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full w-full bg-blue-500 animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full relative" style={{ zIndex: 50 }}>
      {/* Full-screen loader during navigation */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-[100]">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            <p className="mt-4 text-gray-800 text-lg">Loading...</p>
          </div>
        </div>
      )}

      {/* Main header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm relative z-50">
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
            <NavLink href="/">Home</NavLink>
            <NavLink href="/aboutus">About us</NavLink>
            <NavLink href="/retreats">Retreats</NavLink>
            <NavLink href="/resorts">Resorts</NavLink>
            <NavLink href="/membership">Membership</NavLink>
          </div>
        </nav>

        {/* Account button */}
        <div className="flex items-center space-x-4 text-lg">
          {user ? (
            <div
              className="hidden md:flex items-center text-gray-800 relative"
              ref={userDropdownRef}
            >
              <div
                className="flex items-center cursor-pointer hover:text-blue-500"
                onClick={toggleUserDropdown}
              >
                {/* User profile image */}
                <div className="h-8 w-8 rounded-full overflow-hidden mr-2 border border-gray-200">
                  {userAddress && userAddress.image ? (
                    <Image
                      src={userAddress.image}
                      alt="User profile"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                      <User size={18} className="text-blue-500" />
                    </div>
                  )}
                </div>
                <span>{user.full_name}</span>
                <ChevronDown size={16} className="ml-1" />
              </div>

              {/* User dropdown menu */}
              {userDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                  <button
                    onClick={navigateToProfile}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="hidden md:flex items-center text-gray-800 hover:text-blue-500 relative auth-menu-trigger"
              onMouseEnter={() => toggleAuthDropdown(true)}
              onMouseLeave={() => toggleAuthDropdown(false)}
            >
              <User size={20} className="mr-2" />
              <span>Login</span>
              <ChevronDown size={16} className="ml-1" />
              <div
                className={`absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50 ${
                  !authDropdownOpen ? "hidden" : ""
                }`}
                ref={authDropdownRef}
                onMouseEnter={() => toggleAuthDropdown(true)}
                onMouseLeave={() => toggleAuthDropdown(false)}
              >
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Login
                </button>
                {/* <button
                  onClick={() => setRegisterModalOpen(true)}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Register
                </button> */}
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 right-0 left-0 z-30">
          <nav className="flex flex-col px-4 py-2">
            {/* Mobile navigation links with loaders */}
            <div className="relative">
              <button
                onClick={() => handleNavigation("/")}
                className={`w-full text-left py-2 hover:text-blue-500 ${
                  pathname === "/"
                    ? "text-blue-500 font-medium"
                    : "text-gray-800"
                }`}
              >
                Home
              </button>
              {isLinkLoading("/") && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleNavigation("/aboutus")}
                className={`w-full text-left py-2 hover:text-blue-500 ${
                  pathname === "/aboutus"
                    ? "text-blue-500 font-medium"
                    : "text-gray-800"
                }`}
              >
                About us
              </button>
              {isLinkLoading("/aboutus") && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleNavigation("/retreats")}
                className={`w-full text-left py-2 hover:text-blue-500 ${
                  pathname === "/retreats"
                    ? "text-blue-500 font-medium"
                    : "text-gray-800"
                }`}
              >
                Retreats
              </button>
              {isLinkLoading("/retreats") && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleNavigation("/resorts")}
                className={`w-full text-left py-2 hover:text-blue-500 ${
                  pathname === "/resorts"
                    ? "text-blue-500 font-medium"
                    : "text-gray-800"
                }`}
              >
                Resorts
              </button>
              {isLinkLoading("/resorts") && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleNavigation("/membership")}
                className={`w-full text-left py-2 hover:text-blue-500 ${
                  pathname === "/membership"
                    ? "text-blue-500 font-medium"
                    : "text-gray-800"
                }`}
              >
                Membership
              </button>
              {isLinkLoading("/membership") && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>

            {user ? (
              <>
                <div className="py-3 border-t border-gray-100 mt-2">
                  <div className="flex items-center space-x-3 px-2">
                    {/* User profile image in mobile menu */}
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm">
                      {userAddress && userAddress.image ? (
                        <Image
                          src={userAddress.image}
                          alt="User profile"
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                          <User size={24} className="text-blue-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {user.full_name}
                      </span>
                      <span className="text-xs text-gray-500 truncate max-w-[200px]">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={navigateToProfile}
                    className="w-full text-left py-2.5 text-gray-800 hover:bg-gray-50 px-2 rounded flex items-center"
                  >
                    <User size={18} className="mr-2 text-blue-500" />
                    Profile
                  </button>
                  {isLinkLoading(`/profile/${user?.uuid}`) && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2.5 text-gray-800 hover:bg-gray-50 px-2 rounded flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 text-blue-500"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 mt-2">
                <button
                  onClick={() => {
                    setLoginModalOpen(true);
                    closeMobileMenu();
                  }}
                  className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  Login
                </button>
                {/* <button
                  onClick={() => {
                    setRegisterModalOpen(true);
                    closeMobileMenu();
                  }}
                  className="py-2.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Register
                </button> */}
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setLoginModalOpen(false);
          setRegisterModalOpen(true);
        }}
      />
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setRegisterModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </div>
  );
}
