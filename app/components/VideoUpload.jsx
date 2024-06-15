"use client";

import { MdDescription } from "react-icons/md";
import { showFormError } from "@/utils/helpers";
import { upload } from "@vercel/blob/client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function VideoUpload() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [blob, setBlob] = useState(null);

  const onSubmit = async (data) => {
    const { title, description, file: fileList } = data;
    const file = fileList[0];

    const filePath = `videos/${file.name}`;

    const newBlob = await upload(filePath, file, {
      access: "public",
      handleUploadUrl: "/api/videos/upload",
    });

    if (newBlob) {
      setBlob(newBlob);

      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'applicaiton/json',
        },
        body: JSON.stringify({
          userId: 'clxf73p580000elr0dkoduysx', // TODO: Replace this value with the CURRENT USER ID
          url: newBlob.url,
          title,
          description,
        })
      });

      const { data, error } = await response.json();

      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1>Upload A Video</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-4 flex flex-col justify-center w-1/4">
        <textarea
          id="title"
          className={`border border-gray-600 placeholder-gray-600 p-2 ${errors.title && 'error-input'}`}
          placeholder="Video title"
          {...register("title", { required: true })}
        />
        <span className="error">
          {showFormError(errors.title, 'Please enter a video title.')}
        </span>

        <textarea
          id="description"
          className={`border border-gray-600 placeholder-gray-600 p-2 h-32 ${errors.description && 'error-input'}`}
          placeholder="Enter a description here"
          {...register("description", { required: true })}
        ></textarea>
        <span className="error">
          {showFormError(errors.description, 'Please enter a video description.')}
        </span>

        <input
          id="file"
          type="file"
          accept="video/mp4"
          {...register("file", { required: true })}
        />
        <span className="error">
          {showFormError(errors.file, 'You must upload a video file in MP4 format.')}
        </span>

        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
