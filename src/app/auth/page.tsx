import Container from "@/components/Container";
import LoginForm from "@/components/LoginForm";
import { authOptions } from "@/lib/authentication/auth-options";
import { UserProfile } from "@/types/user";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface AuthPageProps {}
export const metadata: Metadata = {
  title: "Crackle - User Authentication",
  description: `In order to use features like (add ratings), (add movies to watchlist). You need to be logged in.`,
};

const AuthPage = async ({}: AuthPageProps) => {
  const user = (await getServerSession(authOptions))?.user as UserProfile;
  if (user) {
    redirect("/");
  }
  return (
    <Container classes="min-h-screen grid place-items-center relative isolate overflow-x-hidden">
      <div className="max-w-xl">
        <h1 className="px-3 text-xl font-medium">Login to your account</h1>
        <LoginForm />
      </div>
    </Container>
  );
};

export default AuthPage;
