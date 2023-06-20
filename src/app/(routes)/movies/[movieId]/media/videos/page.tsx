import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import endpoints from "@/lib/constants/endpoints.json";
import { MovieDetails } from "@/types/movie";
import { fetcher } from "@/lib/api/fetcher";
import { Metadata } from "next";
import { options } from "@/lib/api/options";

interface VideosPageProps {
  params: { movieId: string };
}

export const generateMetadata = async ({
  params,
}: VideosPageProps): Promise<Metadata> => {
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const movieDetails: MovieDetails = await response.json();
  return {
    title: `${movieDetails.title} - Videos, Trailers and Featurettes`,
    description: `Checkout Videos, Trailers and Featurettes of ${movieDetails.title}`,
    openGraph: {
      title: `${movieDetails.title} - Videos, Trailers and Featurettes`,
      description: `Checkout Videos, Trailers and Featurettes of ${movieDetails.title}`,
    },
  };
};

const VideosPage = async ({ params }: VideosPageProps) => {
  const movieDetails = await fetcher<MovieDetails>(
    `${endpoints.movies.movieDetails}/${params.movieId}`
  );
  return (
    <Container>
      <GoBack link={`/movies/${params.movieId}/overview`}>
        {movieDetails.title}
      </GoBack>
    </Container>
  );
};

export default VideosPage;
