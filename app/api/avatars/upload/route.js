import { handleUpload } from "@vercel/blob/client";
/**
 * API route handler for handling avatar uploads
 */
import prisma from "@/lib/prisma";

// upload avatar to Vercel Blob
const POST = async (request) => {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ["image/*"],
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        console.log("File upload completed", blob, tokenPayload);
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 400 } // The webhook will retry 5 times waiting for a status 200
    );
  }
};

export { POST };
