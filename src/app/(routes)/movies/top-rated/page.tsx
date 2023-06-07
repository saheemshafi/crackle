import Container from "@/components/Container";
import MediaCard from "@/components/MediaCard";
import { options } from "@/lib/api/options";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import endpoints from "@/lib/constants/endpoints.json";
import Paginate from "@/components/Paginate";
import { SearchParams } from "@/lib/helpers/query-url";

interface TopRatedMoviesProps {
  searchParams: { page: SearchParams["page"] };
}

const TopRatedMoviesPage = async ({ searchParams }: TopRatedMoviesProps) => {
  const moviesPromise: Promise<ApiResponse<Movie>> = (
    await fetch(
      `${endpoints.movies.topRated}?page=${searchParams["page"] || "1"}`,
      options
    )
  ).json();
  const movies = await moviesPromise;


  return (
    <Container>
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        Top Rated Movies
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

export default TopRatedMoviesPage;
