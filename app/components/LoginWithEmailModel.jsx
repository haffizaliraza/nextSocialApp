import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const LoginWithEmailModal = ({ onClose, onSignUpClick }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError(""); // Clear any previous errors
    setLoading(true); // Set loading to true

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const result = await response.json();
      setLoading(false); // Set loading to false

      if (response.ok) {
        setSuccessMessage("Login successful");
        toast.success("Login successful");
        login(result.user); // Call login with the user's data
        onClose();
      } else {
        setApiError(result.error || "An error occurred during login.");
      }
    } catch (error) {
      setLoading(false); // Set loading to false
      setApiError("An error occurred during login.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">
            Log In with Email/Username
          </h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Email address/Username"
              className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full"
              required
            />
            {apiError && (
              <p className="text-red-500 text-sm mt-2">{apiError}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2">{successMessage}</p>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Log In"
              )}
            </button>
          </form>
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
      </div>
    </div>
  );
};

export default LoginWithEmailModal;
