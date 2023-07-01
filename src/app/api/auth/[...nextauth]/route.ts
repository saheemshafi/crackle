import { authOptions } from "@/lib/authentication/auth-options";
import NextAuth from "next-auth/next";

const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
