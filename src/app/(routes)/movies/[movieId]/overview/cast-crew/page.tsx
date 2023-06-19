import { Suspense } from "react";
import Cast from "@/components/Cast";
import { MovieDetails } from "@/types/movie";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import Container from "@/components/Container";
import { Metadata } from "next";
import GoBack from "@/components/GoBack";
import { fetcher } from "@/lib/api/fetcher";
import Loader from "@/components/Loader";

export const generateMetadata = async ({
  params,
}: CastPageProps): Promise<Metadata> => {
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const movieDetails: MovieDetails = await response.json();
  return {
    title: `Cast And Crew of ${movieDetails.title}`,
  };
};
interface CastPageProps {
  params: { movieId: number };
}

const CastPage = async ({ params }: CastPageProps) => {
  const movieDetails = await fetcher<MovieDetails>(
    `${endpoints.movies.movieDetails}/${params.movieId}`
  );

  return (
      <Container>
        <GoBack link={`/movies/${params.movieId}/overview`}>
          {movieDetails.title}
        </GoBack>
        <div className="mt-10 rounded-md">
          <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
            Cast & Crew
          </h1>
          <Suspense fallback={<Loader />}>
            {/* @ts-ignore-error */}
            <Cast mediaId={params.movieId} type={"movie"} />
          </Suspense>
        </div>
      </Container>
  );
};

export default CastPage;
