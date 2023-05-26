import { randomUUID } from "crypto";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "The Movie Database",
      credentials: {
        username: { label: "Username", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        if (credentials.username !== "saheem") {
          return null;
        }

        return {
          id: randomUUID(),
          name: "Mir Saheem Shafi",
          username: credentials.username,
          randomKey: randomUUID(),
        };
      },
    }),
  ],
  callbacks: {
    session(params) {
      console.log(params);
      const newSession = {
        ...params.session,
        user: {
          name: params.token.name,
          email: "moosajibreal@gmail.com",
          username: "saheem",
        },
      };
      return newSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
