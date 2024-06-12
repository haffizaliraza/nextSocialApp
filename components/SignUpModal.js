import React, { useState } from "react";
import SignUpWithEmailModal from "./SignUpWithEmail";

const SignUpModal = ({ onLoginClick, onClose }) => {
  const [showSignUpEmailModal, setShowSignUpEmailModal] = useState(false);

  const openSignUpEmailModal = () => {
    setShowSignUpEmailModal(true);
  };

  const closeSignUpEmailModal = () => {
    setShowSignUpEmailModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
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
        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 mt-2"
        >
          Cancel
        </button>
        {showSignUpEmailModal && (
          <SignUpWithEmailModal onClose={closeSignUpEmailModal} />
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
