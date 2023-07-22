import { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSessionId } from "./auth";
import endpoints from "@/lib/constants/endpoints.json";
import { TMDBUser, UserProfile } from "@/types/user";
import { options } from "../api/options";
import { Pretty } from "@/types/type-helpers";

type User = Pretty<Omit<DefaultSession["user"] & UserProfile, "image">>;

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}

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
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name || "";
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.session_id = token.session_id;
        session.user.avatar = token.avatar;
      }
      return session;
    },
    jwt: ({ token, user }) => {
      return { ...token, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
};
