import { FC, Suspense } from "react";
import Cast from "@/components/Cast";
import Link from "next/link";
import { MovieDetails } from "@/types/movie";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { BiArrowBack } from "react-icons/bi";

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
      <section className="p-5 text-white">
        <div>
          <Link
            href={`/movies/${params.movieId}`}
            className="flex w-fit items-center gap-2 rounded border border-gray-dark px-3 py-1 transition-colors hover:bg-gray-dark"
          >
            <BiArrowBack /> Back to {movieDetails.original_title}
          </Link>
        </div>
        <div className="mt-3 rounded-md border border-gray-dark bg-dark p-3">
          <h2 className="mb-2 font-work-sans text-lg font-medium">Cast</h2>
          <Suspense fallback="Loading Cast...">
            {/* @ts-ignore-error */}
            <Cast mediaId={params.movieId} type={"movie"} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default CastPage;
