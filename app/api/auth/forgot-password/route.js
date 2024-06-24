import nodemailer from "nodemailer";
import crypto from "crypto";
import prisma from "@/lib/prisma"; // Ensure you have this configured for your Prisma setup

async function GET(request, response) {
  response.status(405).json({ error: "Method Not Allowed" });
}

async function POST(request) {
  const { email } = await request.json();

  // Validate email
  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  // Generate a secure token
  const token = crypto.randomBytes(32).toString("hex");

  // Set token expiration time (e.g., 1 hour)
  const tokenExpiration = new Date();
  tokenExpiration.setHours(tokenExpiration.getHours() + 1);

  try {
    // Save the token and its expiration to the user's record in the database
    const user = await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiration: tokenExpiration,
      },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Send the email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Click here to reset your password: http://localhost:3000/reset-password/?token=${token}`, // Add the actual password reset link
    };

    await transporter.sendMail(mailOptions);
    return Response.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error sending email" }, { status: 500 });
  }
}

export { GET, POST };
