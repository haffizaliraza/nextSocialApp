"use client";

import ResetPassword from "@/app/components/ResetPassword";
import { useAuth } from "../context/AuthContext";

const ResetPasswordPage = () => {
  const { user } = useAuth();

  return (
    <>
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
