'use client';

import { useRef, useState } from 'react';

import { upload } from '@vercel/blob/client';

export default function VideoUpload() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const file = inputFileRef.current.files[0];

    const newBlob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/videos',
    });

    setBlob(newBlob);
  }
  
  return (
    <>
      <h1>Upload A Video</h1>
 
      <form onSubmit={handleSubmit}>
        <input name="file" ref={inputFileRef} type="file" required accept="video/mp4" />
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