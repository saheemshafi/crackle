import Container from "@/components/Container";
import MediaCard from "@/components/MediaCard";
import Paginate from "@/components/Paginate";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { SearchParams } from "@/lib/helpers/query-url";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";

interface PopularMoviesProps {
  searchParams: { page: SearchParams["page"] };
}

const PopularMoviesPage = async ({ searchParams }: PopularMoviesProps) => {
  const moviesPromise = fetcher<ApiResponse<Movie>>(
    endpoints.movies.popular,
    `?page=${searchParams["page"] || "1"}`
  );
  const movies = await moviesPromise;

  return (
    <Container>
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        Popular Movies
      </h1>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.results.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
      <Paginate items={movies} />
    </Container>
  );
};

export default PopularMoviesPage;
