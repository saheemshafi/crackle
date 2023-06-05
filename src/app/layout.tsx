import Header from "@/components/Header";
import "./globals.css";
import { Inter, Work_Sans } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import { Metadata } from "next";
import { SidebarProvider } from "@/providers/SidebarProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authentication/auth-options";

const inter = Inter({ subsets: ["latin"] });
const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Crackle : Your Gateway to Movie Marvels - Explore, Discover, and Immerse in the World of Films",
  description:
    "Crackle: Your Movie Information Hub - Explore, Discover, and Dive into the World of Films. Get the latest updates, reviews, and insights on your favorite movies. Uncover hidden gems, browse genres, and find personalized recommendations.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="flex items-start bg-dark font-inter">
        <AuthSessionProvider session={session}>
          <SidebarProvider>
            <Sidebar />
            <div className="main-container w-full md:max-w-[calc(100%-12rem)] md:basis-[calc(100%-12rem)]">
              <Header />
              <main className="py-3 min-h-[calc(100vh_-_60px_-_56px)]">{children}</main>
              <Footer />
            </div>
          </SidebarProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
