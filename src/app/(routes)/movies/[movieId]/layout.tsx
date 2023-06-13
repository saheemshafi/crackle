import "@/app/globals.css";
import { Metadata } from "next";
import MediaPageHeader from "@/components/MediaPageHeader";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { MovieDetails } from "@/types/movie";

export const generateMetadata = async ({
  params,
}: {
  params: { movieId: string };
}): Promise<Metadata> => {
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const movieDetails: MovieDetails = await response.json();
  const genres = movieDetails.genres.map((genre) => genre.name);

  return {
    title: movieDetails.title,
    description: movieDetails.overview,
    keywords: genres,
    openGraph: {
      title: movieDetails.title,
      description: movieDetails.overview,
      type: "article",
      tags: genres,
      images: [
        `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`,
      ],
    },
  };
};

export default async function MoviePageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { movieId: string };
}) {
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const movieDetails: MovieDetails = await response.json();

  return (
    <>
      <MediaPageHeader media={movieDetails} />
      {children}
    </>
  );
}
