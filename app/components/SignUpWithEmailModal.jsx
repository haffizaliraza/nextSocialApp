import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { upload } from "@vercel/blob/client";

const SignUpWithEmailModal = ({ onClose, onSignUpSuccess }) => {
  const [stage, setStage] = useState("email"); // email or details
  const [formData, setFormData] = useState({
    bio: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    let formErrors = {};

    if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email address";
    }

    if (!validatePassword(formData.password)) {
      formErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.username) {
      formErrors.username = "Username is required";
    }

    return formErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false); // Set loading to false
      return;
    }

    setErrors({});

    const file = avatar[0];
    const filePath = `users/images/${file.name}`;

    const newBlob = await upload(filePath, file, {
      access: "public",
      handleUploadUrl: "/api/videos/upload",
    });

    if (newBlob) {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...formData, avatar: newBlob.url }),
        });

        const result = await response.json();

        if (response.ok) {
          onSignUpSuccess();
        } else {
          setApiError(result.error || "An error occurred during signup.");
        }
      } catch (error) {
        setApiError("An error occurred during signup.");
      }
    }

    setLoading(false); // Set loading to false
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear individual field error on change
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files;
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file[0]));
    }
  };

  const renderModalContent = () => {
    switch (stage) {
      case "email":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Sign Up with Email</h2>
            <p>Enter your email address to continue:</p>
            <form onSubmit={() => setStage("details")} className="mt-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className={`border border-gray-300 rounded-md px-3 py-2 mt-2 w-full ${
                  errors.email ? "border-red-500" : ""
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
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
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className={`border border-gray-300 rounded-md px-3 py-2 mt-2 w-full ${
                  errors.username ? "border-red-500" : ""
                }`}
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`border border-gray-300 rounded-md px-3 py-2 mt-2 w-full ${
                  errors.password ? "border-red-500" : ""
                }`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`border border-gray-300 rounded-md px-3 py-2 mt-2 w-full ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="About You"
                className={`border border-gray-300 rounded-md px-3 py-2 mt-2 w-full ${
                  errors.bio ? "border-red-500" : ""
                }`}
                required
              ></textarea>
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="mt-2 rounded-md"
                  style={{ maxWidth: "100px" }}
                />
              )}
              <label className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full flex items-center justify-center cursor-pointer">
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
                <span>Upload Avatar</span>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
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
                  "Sign Up"
                )}
              </button>
            </form>
            {apiError && (
              <p className="text-red-500 text-sm mt-2">{apiError}</p>
            )}
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
