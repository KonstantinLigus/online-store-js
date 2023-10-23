"use client";

import { SessionProvider } from "next-auth/react";

const AuthProviders = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AuthProviders;
