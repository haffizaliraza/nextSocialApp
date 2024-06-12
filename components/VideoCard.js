"use client";

import React, { useRef, useEffect } from "react";

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
      <video ref={videoRef} className="w-full" controls>
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={video.user.avatar}
            alt={video.user.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{video.user.name}</h2>
            <p className="text-gray-500">{video.user.username}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-500 mb-2">
          <svg
            className="w-6 h-6 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM9 17a4 4 0 00-4 4h8a4 4 0 00-4-4z"
            ></path>
          </svg>
          <span>{video.likes}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-2">
          <svg
            className="w-6 h-6 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM9 17a4 4 0 00-4 4h8a4 4 0 00-4-4z"
            ></path>
          </svg>
          <span>{video.comments}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <svg
            className="w-6 h-6 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM9 17a4 4 0 00-4 4h8a4 4 0 00-4-4z"
            ></path>
          </svg>
          <span>{video.shares}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
