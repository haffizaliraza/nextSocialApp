// pages/api/auth/signup.js
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function GET(request, response) {
  response.status(405).json({ error: "Method Not Allowed" });
}

async function POST(request, response) {
  const { email, password, bio, username, avatar } = await request.json();

  // Check if the username already exists
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) {
    return Response.json({ error: "Username already exists" }, { status: 400 });
  }

  // Check if the email already exists
  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    return Response.json({ error: "Email already exists" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        profile: {
          create: {
            bio,
            avatar,
          },
        },
      },
    });
    return Response.json({ data: user }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export { GET, POST };
