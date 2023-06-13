import "@/app/globals.css";
import { Inter, Work_Sans } from "next/font/google";
import { Metadata } from "next";
import Container from "@/components/Container";
import MediaPageHeader from "@/components/MediaPageHeader";

const inter = Inter({ subsets: ["latin"] });
const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Crackle : Your Gateway to Movie Marvels - Explore, Discover, and Immerse in the World of Films",
  description:
    "Crackle: Your Movie Information Hub - Explore, Discover, and Dive into the World of Films. Get the latest updates, reviews, and insights on your favorite movies. Uncover hidden gems, browse genres, and find personalized recommendations.",
};

export default async function MoviePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MediaPageHeader />
      <Container>{children}</Container>
    </>
  );
}
