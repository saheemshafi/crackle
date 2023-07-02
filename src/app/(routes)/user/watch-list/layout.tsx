import "@/app/globals.css";
import Container from "@/components/Container";
import Tablist from "@/components/Tablist";
import { getAuthUser } from "@/lib/api/getUser";
import { UserProfile } from "@/types/user";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Watchlist",
  description: "Check which movies and tv shows you are planning to watch next",
  openGraph: {
    title: "Your Watchlist",
    description:
      "Check which movies and tv shows you are planning to watch next",
  },
};

export default async function WatchlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthUser();
  const user = session?.user as UserProfile;
  if (!session && !user) {
    redirect("/auth?callbackUrl=/user/watch-list");
  }
  return (
    <Container classes="sm:bg-gradient-to-t sm:from-gray-dark sm:to-dark">
      <div className="flex items-center justify-between">
        <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
          My Watchlist
        </h1>
        <Tablist
          links={[
            { name: "Movies", path: "/user/watch-list" },
            { name: "Series", path: "/user/watch-list/tv" },
          ]}
        />
      </div>
      {children}
    </Container>
  );
}
