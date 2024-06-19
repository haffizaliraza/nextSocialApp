// pages/api/auth/login.js
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function GET(request, response) {
  response.status(405).json({ error: "Method Not Allowed" });
}

const validateUserCredentials = async (emailOrUsername, password) => {
  // Try to find the user by email
  console.log(emailOrUsername, password);
  let user = await prisma.user.findUnique({
    where: { email: emailOrUsername },
  });

  // If no user found by email, try to find by username
  if (!user) {
    user = await prisma.user.findUnique({
      where: { username: emailOrUsername },
    });
  }
  // If user is found, compare the provided password with the stored hash
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
};

async function POST(request) {
  // Helper function to validate user credentials
  const { emailOrUsername, password } = await request.json();
  try {
    const user = await validateUserCredentials(emailOrUsername, password);
    if (user) {
      // Authentication successful
      return Response.json({ message: "Login successful" }, { status: 200 });
    } else {
      // Authentication failed
      return Response.json(
        { error: "Invalid email/username or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export { GET, POST };
