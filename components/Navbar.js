"use client";

import React, { useState } from "react";

import Link from "next/link";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

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
        {/* <Image src="/logo.png" alt="Logo" width={40} height={40} /> */}
        <span className="ml-2 text-xl font-bold">BizSocial</span>
      </div>
      <div className="ml-auto flex space-x-4">
        <Link href='/upload-video' alt='Upload a video'>
          <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
            Upload
          </button>
        </Link>
        <button
          onClick={openLoginModal}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log In
        </button>
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
