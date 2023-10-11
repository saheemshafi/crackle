import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { getAuthUser } from "@/lib/api/getUser";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import { GlobalProvider } from "@/providers/GlobalProvider";
import { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { CSSProperties } from "react";

const inter = Inter({ subsets: ["latin"] });
const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Crackle : Your Gateway to Movie Marvels - Explore, Discover, and Immerse in the World of Films",
  description:
    "Crackle: Your Movie Information Hub - Explore, Discover, and Dive into the World of Films. Get the latest updates, reviews, and insights on your favorite movies. Uncover hidden gems, browse genres, and find personalized recommendations.",
  icons: { apple: "/icon-512x512.png" },
  manifest: "/manifest.json",
  themeColor: "rgb(235,79,45)",
};

export default async function RootLayout({
  children,
  preview,
  videoPreview,
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
  videoPreview: React.ReactNode;
}) {
  const session = await getAuthUser();
  return (
    <html
      lang="en"
      style={
        {
          "--font-inter": inter.style.fontFamily,
          "--font-worksans": workSans.style.fontFamily,
        } as CSSProperties
      }
    >
      <body className="scroll-design isolate flex items-start bg-dark font-inter">
        <NextTopLoader color="#eb4f2d" shadow={false} />
        <AuthSessionProvider session={session}>
          <GlobalProvider>
            <Sidebar />
            <div className="main-container w-full md:max-w-[calc(100%-12rem)] md:basis-[calc(100%-12rem)]">
              <Header />
              <main className="min-h-[calc(100vh_-_60px_-_56px)]">
                {children}
                {preview}
                {videoPreview}
              </main>
              <Footer />
            </div>
            <Toaster />
          </GlobalProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
