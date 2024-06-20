import nodemailer from "nodemailer";
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

  // You should add logic here to generate a password reset token and save it to your database
  // For this example, we're going to skip this step

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
    text: "Click here to reset your password: http://localhost:3000/reset-password", // Add the actual password reset link
  };

  try {
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
