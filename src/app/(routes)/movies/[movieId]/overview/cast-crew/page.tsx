import { FC, Suspense } from "react";
import Cast from "@/components/Cast";
import Link from "next/link";
import { MovieDetails } from "@/types/movie";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { BiArrowBack } from "react-icons/bi";
import Container from "@/components/Container";
import { Metadata } from "next";

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
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const movieDetails: MovieDetails = await response.json();
  return (
    <>
      <Container>
        <div>
          <Link
            href={`/movies/${params.movieId}/overview`}
            className="flex w-fit items-center gap-2 rounded border border-gray-dark bg-gradient-to-r from-gray-dark to-dark px-3 py-1 font-medium transition-colors hover:border-gray-md/30 focus-visible:border-gray-md/30"
          >
            <BiArrowBack /> {movieDetails.original_title}
          </Link>
        </div>
        <div className="mt-3 rounded-md">
          <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
            Cast & Crew
          </h1>
          <Suspense fallback="Loading Cast...">
            {/* @ts-ignore-error */}
            <Cast mediaId={params.movieId} type={"movie"} />
          </Suspense>
        </div>
      </Container>
    </>
  );
};

export default CastPage;
