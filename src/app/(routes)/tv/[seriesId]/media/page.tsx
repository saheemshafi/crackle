import { redirect } from "next/navigation";

interface MediaPageProps {
  params: { movieId: string };
}

const MediaPage = async ({ params }: MediaPageProps) => {
  redirect(`/tv/${params.movieId}/media/backdrops`);
};

export default MediaPage;
