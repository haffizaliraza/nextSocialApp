/**
 * API route handler for handling videos
 */
import { handleUpload } from '@vercel/blob/client';

// get all videos (random video feed)
async function GET() {

}

// create a video (video upload)
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
            allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'],
            tokenPayload: JSON.stringify({
              // optional, sent to your server on upload completion
              // you could pass a user id from auth, or a value from clientPayload
            }),
          };
        },
        onUploadCompleted: async ({ blob, tokenPayload }) => {
          // Get notified of client upload completion
          // ⚠️ This will not work on `localhost` websites,
          // Use ngrok or similar to get the full upload flow
   
          console.log('File upload completed', blob, tokenPayload);
   
          try {
            // Run any logic after the file upload completed
            // const { userId } = JSON.parse(tokenPayload);
            // await db.update({ avatar: blob.url, userId });
          } catch (error) {
            throw new Error('Could not update record');
          }
        },
      });
   
      return Response.json(jsonResponse);
    } catch (error) {
      return Response.json(
        { error: error.message },
        { status: 400 }, // The webhook will retry 5 times waiting for a status 200
      );
    }
  }

export { GET, POST };