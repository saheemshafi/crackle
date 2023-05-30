import Container from "@/components/Container";
import { authOptions } from "@/lib/authentication/auth-options";
import { Session, getServerSession } from "next-auth";

interface WatchlistPageProps {}

const WatchlistPage =async ({}:WatchlistPageProps) => {
  const session:Session | null = await getServerSession(authOptions);
  return <Container>{JSON.stringify(session)}</Container>;
};

export default WatchlistPage;
