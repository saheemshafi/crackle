import Container from "@/components/Container";
import endpoints from "@/lib/constants/endpoints.json";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { options } from "@/lib/api/options";
import { MovieDetails } from "@/types/movie";

interface MediaPageProps {
  params: { movieId: string };
}

const MediaPage = async ({ params }: MediaPageProps) => {
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const movieDetails: MovieDetails = await response.json();
  return (
    <Container>
      <div>
        <Link
          href={`/movies/${params.movieId}/overview`}
          className="flex w-fit items-center gap-2 rounded border border-gray-dark bg-gradient-to-r from-gray-dark to-dark px-3 py-1 font-medium transition-colors hover:border-gray-md/30 focus-visible:border-gray-md/30"
        >
          <BiArrowBack /> {movieDetails.original_title}
        </Link>
      </div>
    </Container>
  );
};

export default MediaPage;
