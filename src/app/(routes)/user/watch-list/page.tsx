import Container from "@/components/Container";
import { getAuthUser } from "@/lib/api/getUser";
import { Session } from "next-auth";

interface WatchlistPageProps {}

const WatchlistPage = async ({}: WatchlistPageProps) => {
  const session: Session | null = await getAuthUser();
  return <Container>{JSON.stringify(session)}</Container>;
};

export default WatchlistPage;
