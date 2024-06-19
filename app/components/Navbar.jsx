"use client";

import React, { useState } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { user, logout } = useAuth();

  const openSignUpModal = () => {
    setShowLoginModal(false);
    setShowSignUpModal(true);
  };

  const openLoginModal = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <span className="ml-2 text-xl font-bold">BizSocial</span>
      </div>
      <div className="ml-auto flex space-x-4">
        <Link href="/upload-video" alt="Upload a video">
          <button className="bg-white flex text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Upload
          </button>
        </Link>
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={openLoginModal}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log In
          </button>
        )}
      </div>
      {showLoginModal && (
        <LoginModal onSignUpClick={openSignUpModal} onClose={closeModals} />
      )}
      {showSignUpModal && (
        <SignUpModal onLoginClick={openLoginModal} onClose={closeModals} />
      )}
    </nav>
  );
};

export default Navbar;
