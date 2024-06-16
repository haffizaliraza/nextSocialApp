import React, { useRef, useEffect } from "react";
import { FiThumbsUp, FiMessageSquare, FiEye } from "react-icons/fi";

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  let observer;

  useEffect(() => {
    const videoElement = videoRef.current;

    // Intersection Observer to track video visibility
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            videoElement.play();
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    observer.observe(videoElement);

    // Pause video when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement.pause();
      } else {
        videoElement.play().catch((err) => {
          // Auto-play was prevented, possibly due to browser policies
          console.error("Auto-play prevented:", err);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up
    return () => {
      observer.unobserve(videoElement);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="relative">
        <video ref={videoRef} className="w-full" controls>
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 right-0 m-4">
          <button className="text-white rounded-full bg-gray-800 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
        <p className="text-gray-500 text-sm mb-4">{video.description}</p>
        <div className="flex items-center text-gray-500 space-x-4">
          <div className="flex items-center">
            <FiThumbsUp className="w-6 h-6 mr-1" />
            <span>{video.likes} Likes</span>
          </div>
          <div className="flex items-center">
            <FiMessageSquare className="w-6 h-6 mr-1" />
            <span>{video.comments} Comments</span>
          </div>
          <div className="flex items-center">
            <FiEye className="w-6 h-6 mr-1" />
            <span>{video.views} Views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
