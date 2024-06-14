import React, { useState } from "react";

import { FaTimes } from "react-icons/fa";

const SignUpWithEmailModal = ({ onClose }) => {
  const [stage, setStage] = useState("email"); // email or details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API calls, validation)
    console.log("Form submitted:", formData);
    // Close modal after submission
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderModalContent = () => {
    switch (stage) {
      case "email":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">
              Sign Up with Phone/Email
            </h2>
            <p>Enter your email address to continue:</p>
            <form onSubmit={() => setStage("details")} className="mt-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
              >
                Continue
              </button>
            </form>
          </div>
        );
      case "details":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
                required
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
              >
                Sign Up
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg w-full max-w-md">
        {renderModalContent()}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
      </div>
    </div>
  );
};

export default SignUpWithEmailModal;
