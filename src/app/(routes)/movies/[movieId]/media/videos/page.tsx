import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import Loader from "@/components/Loader";
import VideoList from "@/components/VideoList";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { MovieDetails } from "@/types/movie";
import { Metadata } from "next";
import { Suspense } from "react";

interface VideosPageProps {
  params: { movieId: string };
}

export const generateMetadata = async ({
  params,
}: VideosPageProps): Promise<Metadata> => {
  const movieDetails = await fetcher<MovieDetails>(
    `${endpoints.movies.movieDetails}/${params.movieId}`
  );
  return {
    title: `${movieDetails.title} - Official trailers, teasers and featurettes`,
    description: `Official trailers, teasers and featurettes from the movie ${movieDetails.title}`,
    openGraph: {
      title: `${movieDetails.title} - Official trailers, teasers and featurettes`,
      description: `Official trailers, teasers and featurettes from the movie ${movieDetails.title}`,
      images: [
        `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`,
      ],
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
      <div className="mt-10">
        <div>
          <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
            Videos
          </h1>
        </div>
        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error */}
          <VideoList mediaId={movieDetails.id} />
        </Suspense>
      </div>
    </Container>
  );
};

export default VideosPage;
