"use client";
import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const ForYou = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">For You</h1>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      ) : (
        videos.map((video) => <VideoCard key={video.id} video={video} />)
      )}
    </div>
  );
};

export default ForYou;
