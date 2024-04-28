"use client";

import LoginForm from "@/frontend/components/consumers/LoginForm";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  let callbackUrl = searchParams.get("callbackUrl");
  callbackUrl = callbackUrl ? callbackUrl : "/account";

  return <LoginForm callbackUrl={callbackUrl} />;
};

export default LoginPage;
