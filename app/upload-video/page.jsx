"use client";

import { useEffect } from "react";
import VideoUpload from "@/app/components/VideoUpload";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const VideoUploadPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect to login if user is not authenticated
      router.push("/login");
      return;
    }
  }, [user]);

  return (
    <>
      <VideoUpload />
    </>
  );
};

export default VideoUploadPage;
