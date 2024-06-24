"use client";

// components/LoginModal.js

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import LoginWithEmailModel from "./LoginWithEmailModel";
import ForgotPasswordModal from "./ForgotPasswordModal";

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

  const GoogleLoginButtonClick = () => {
    signIn("google");
  };

  const closeModel = () => {
    router.push("/");
  };

  const buttonStyle = "p-10 flex items-center justify-center py-0 ";
  const googleButtonStyle =
    "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100";
  const facebookButtonStyle = "bg-blue-900 text-white hover:bg-blue-800 h-12";
  const emailButtonStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300 h-12";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg max-w-md w-full">
        <button
          onClick={closeModel}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <div className="flex flex-col items-center space-y-4">
          <div className={buttonStyle}>
            <GoogleButton type="dark" onClick={GoogleLoginButtonClick} />
          </div>

          <button className={`${buttonStyle} ${facebookButtonStyle}`}>
            Sign In with Facebook
          </button>

          <button
            onClick={openLoginWithEmailModal}
            className={`${buttonStyle} ${emailButtonStyle}`}
          >
            Sign In with Username
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
        </div>

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
