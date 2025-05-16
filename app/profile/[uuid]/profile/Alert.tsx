"use client";

import React, { useEffect } from "react";

interface AlertProps {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({
  title,
  message,
  isOpen,
  onClose,
}) => {
  // Auto close alert after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-4">
            <svg
              className="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">{title}</h3>
          <p className="text-gray-500 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors w-full sm:w-auto"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;