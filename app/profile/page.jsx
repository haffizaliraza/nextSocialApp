"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (!user) {
          // Redirect to login if user is not authenticated
          router.push("/login");
          return;
        }

        const response = await fetch("/api/videos");
        const { data } = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user]);

  if (!user) {
    return null; // Or render a loading indicator or login prompt
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white w-full max-w-2xl mt-10 p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            className="h-24 w-24 rounded-full object-cover"
            src="/path-to-your-avatar.jpg" // Replace with your avatar path
            alt="User Avatar"
          />
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600">@johndoe</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            scelerisque leo nec lorem dapibus, in aliquet felis varius.
          </p>
        </div>
        <div className="mt-6 flex space-x-8">
          <div className="text-center">
            <span className="block text-2xl font-bold">120</span>
            <span className="text-gray-600">Posts</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold">1.5K</span>
            <span className="text-gray-600">Followers</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold">180</span>
            <span className="text-gray-600">Following</span>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Follow
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
