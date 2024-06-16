import { handleUpload } from "@vercel/blob/client";
/**
 * API route handler for handling videos
 */
import prisma from "@/lib/prisma";

// get all videos (random video feed)
async function GET() {
  try {
    const videos = await prisma.video.findMany({
      take: 10, // Limit to 10 videos
      orderBy: { createdAt: "desc" }, // Order by createdAt descending
      include: {
        user: true, // Include the associated user data
      },
    });
    return Response.json({ data: videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return Response.json({ error: error.message }, { status: error.status });
  }
}

// create a video record
const POST = async (request) => {
  const { userId, url, title, description } = await request.json();

  try {
    const newVideo = await prisma.video.create({
      data: {
        url,
        title,
        description,
        user: {
          connect: { id: userId },
        },
      },
    });

    return Response.json({ data: newVideo });
  } catch (error) {
    return Response.json({ error: error.message }, { status: error.status });
  }
};

export { GET, POST };
