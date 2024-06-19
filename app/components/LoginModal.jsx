import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import LoginWithEmailModel from "./LoginWithEmailModel";

const LoginModal = ({ onSignUpClick, onClose }) => {
  const [showEmailSignUpModal, setShowEmailSignUpModal] = useState(false);

  const openLoginWithEmailModel = () => {
    setShowEmailSignUpModal(true);
  };

  const closeEmailSignUpModal = () => {
    setShowEmailSignUpModal(false);
    onClose();
  };

  const LoginInSucess = () => {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg max-w-md w-full">
        <button
          onClick={onClose}
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
          onClick={openLoginWithEmailModel}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md mb-4"
        >
          Login with Email
        </button>
        <p className="text-center text-sm text-gray-600">
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
            onSignUpClick={LoginInSucess}
          />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
