"use client"
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import { FC } from "react";

interface pageProps {}

const WatchlistPage: FC<pageProps> = ({}) => {
  const session = useSession()
  return <Container>{JSON.stringify(session)}</Container>;
};

export default WatchlistPage;
