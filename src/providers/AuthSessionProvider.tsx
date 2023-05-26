"use client"
import { SessionProvider } from "next-auth/react";
import { FC } from "react";

interface AuthSessionProviderProps {
  children: React.ReactNode;
}

const AuthSessionProvider: FC<AuthSessionProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionProvider;
