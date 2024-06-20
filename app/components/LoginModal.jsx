"use client";

// components/LoginModal.js

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import LoginWithEmailModel from "./LoginWithEmailModel";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useRouter } from "next/navigation";

const LoginModal = ({ onSignUpClick, onClose }) => {
  const [showEmailSignUpModal, setShowEmailSignUpModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const router = useRouter();

  const openLoginWithEmailModal = () => {
    setShowEmailSignUpModal(true);
  };

  const closeEmailSignUpModal = () => {
    setShowEmailSignUpModal(false);
    onClose();
  };

  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    onClose();
  };

  const closeModel = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg max-w-md w-full">
        <button
          onClick={closeModel}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mb-4">
          Continue with Google
        </button>
        <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-md mb-4">
          Continue with Facebook
        </button>
        <button
          onClick={openLoginWithEmailModal}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md mb-4"
        >
          Login with Email
        </button>
        <p className="text-center text-sm text-gray-600">
          Forgot your password?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline"
            onClick={openForgotPasswordModal}
          >
            Reset it here
          </a>
        </p>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline"
            onClick={onSignUpClick}
          >
            Sign up
          </a>
        </p>

        {showEmailSignUpModal && (
          <LoginWithEmailModel
            onClose={closeEmailSignUpModal}
            onSignUpClick={onSignUpClick}
          />
        )}

        {showForgotPasswordModal && (
          <ForgotPasswordModal onClose={closeForgotPasswordModal} />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
