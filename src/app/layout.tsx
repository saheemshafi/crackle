import Header from "@/components/Header";
import "./globals.css";
import { Inter, Work_Sans } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title:
    "Crackle : Your Gateway to Movie Marvels - Explore, Discover, and Immerse in the World of Films",
  description:
    "Crackle: Your Movie Information Hub - Explore, Discover, and Dive into the World of Films. Get the latest updates, reviews, and insights on your favorite movies. Uncover hidden gems, browse genres, and find personalized recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-start bg-dark font-inter">
        <Sidebar />
        <div className="main-container basis-[calc(100%-12rem)] max-w-[calc(100%-12rem)]">
          <Header />
          <main className="min-h-screen">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
