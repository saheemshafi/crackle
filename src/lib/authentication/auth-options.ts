import { randomUUID } from "crypto";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSessionId, options } from "./auth";
import endpoints from "@/lib/constants/endpoints.json";
import { TMDBUser, UserProfile } from "@/types/user";
import { DefaultJWT, JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "The Movie Database",
      credentials: {
        username: { label: "Username", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) return null;
        const sessionId = await getSessionId({
          username: credentials.username,
          password: credentials.password,
        });
        if (!sessionId) return null;
        const url = new URL(endpoints.user.account);
        url.searchParams.append("session_id", sessionId);
        const user: TMDBUser = await (await fetch(url, options)).json();
        if (!user) {
          return null;
        }
        return {
          id: user.id.toString(),
          avatar: user.avatar,
          name: user.name,
          username: user.username,
          session_id: sessionId,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return { ...token, ...(user as object) };
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
