import MediaCard from "@/components/MediaCard";
import { options } from "@/lib/api/options";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import endpoints from "@/lib/constants/endpoints.json";
import Container from "@/components/Container";
import { FC } from "react";

interface MoviesPageProps {}

const MoviesPage = async ({}: MoviesPageProps) => {
  const moviesPromise = (
    await fetch(endpoints.discover.movies, {
      ...options,
      next: { revalidate: 2592000 },
    })
  ).json();
  const movies: ApiResponse<Movie> = await moviesPromise;
  return (
    <Container>
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        Movies
      </h1>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.results.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
    </Container>
  );
};

export default MoviesPage;
