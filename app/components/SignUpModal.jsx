import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FaTimes } from "react-icons/fa";
import SignUpWithEmailModal from "./SignUpWithEmailModal";

const SignUpModal = ({ onLoginClick, onClose }) => {
  const [showSignUpEmailModal, setShowSignUpEmailModal] = useState(false);
  const router = useRouter();

  const openSignUpEmailModal = () => {
    setShowSignUpEmailModal(true);
  };

  const handleSignUpSuccess = () => {
    setShowSignUpEmailModal(false);
    onClose();
    router.push("/");
  };

  const closeSignUpEmailModal = () => {
    setShowSignUpEmailModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mb-4">
          Continue with Google
        </button>
        <button className="w-full bg-blue-900 text-white py-2 px-4 rounded-md mb-4">
          Continue with Facebook
        </button>
        <button
          onClick={openSignUpEmailModal}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md mb-4"
        >
          Sign Up with Email
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline"
            onClick={onLoginClick}
          >
            Log in
          </a>
        </p>

        {showSignUpEmailModal && (
          <SignUpWithEmailModal
            onClose={closeSignUpEmailModal}
            onSignUpSuccess={handleSignUpSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
