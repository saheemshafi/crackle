import { redirect } from "next/navigation";
import { FC } from "react";

interface MoviePageProps {
  params: { movieId: string };
}

const MoviePage: FC<MoviePageProps> = ({ params }) => {
  redirect(`/movies/${params.movieId}/overview`);
};

export default MoviePage;
