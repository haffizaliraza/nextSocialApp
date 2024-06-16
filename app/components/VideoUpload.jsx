"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { upload } from "@vercel/blob/client";
import { showFormError } from "@/utils/helpers";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function VideoUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [blob, setBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    const { title, description, file: fileList } = data;
    const file = fileList[0];
    const filePath = `videos/${file.name}`;

    const newBlob = await upload(filePath, file, {
      access: "public",
      handleUploadUrl: "/api/videos/upload",
    });

    if (newBlob) {
      setBlob(newBlob);

      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          userId: "clxf73p580000elr0dkoduysx", // TODO: Replace this value with the CURRENT USER ID
          url: newBlob.url,
          title,
          description,
        }),
      });

      const { data, error } = await response.json();

      if (error) {
        console.error(error);
      } else {
        // Redirect to "For You" page after successful upload
        router.push("/foryou");
      }
    }

    setLoading(false);
  };

  const handleClose = () => {
    if (isClient) {
      router.back();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <AiOutlineClose size={24} />
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center">Upload A Video</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col">
            <textarea
              id="title"
              className={`border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title && "border-red-500"
              }`}
              placeholder="Video title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">
                {showFormError(errors.title, "Please enter a video title.")}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <textarea
              id="description"
              className={`border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description && "border-red-500"
              }`}
              placeholder="Enter a description here"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">
                {showFormError(
                  errors.description,
                  "Please enter a video description."
                )}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              id="file"
              type="file"
              accept="video/mp4"
              className={`border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.file && "border-red-500"
              }`}
              {...register("file", { required: true })}
            />
            {errors.file && (
              <span className="text-red-500 text-sm mt-1">
                {showFormError(
                  errors.file,
                  "You must upload a video file in MP4 format."
                )}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {loading && (
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
        )}

        {blob && (
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Blob url:{" "}
              <a href={blob.url} className="text-blue-500 underline">
                {blob.url}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
