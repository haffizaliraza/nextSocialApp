// pages/api/auth/reset-password.js
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Ensure you have this configured for your Prisma setup

async function GET(request, response) {
  response.status(405).json({ error: "Method Not Allowed" });
}

async function POST(request) {
  const { token, password } = await request.json();

  // Validate token and password
  if (!token || !password) {
    return Response.json(
      { error: "Token and new password are required" },
      { status: 400 }
    );
  }

  try {
    // Find user by reset token
    const user = await prisma.user.findUnique({
      where: { resetToken: token },
    });

    if (!user) {
      return Response.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and clear the reset token
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null },
    });

    return Response.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export { GET, POST };
