"use client"
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";

interface AuthSessionProviderProps {
  children: React.ReactNode;
  session: Session | null
}

const AuthSessionProvider: FC<AuthSessionProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthSessionProvider;
