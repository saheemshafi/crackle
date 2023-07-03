import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import MediaCard from "@/components/MediaCard";
import Paginate from "@/components/Paginate";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { SearchParams } from "@/lib/helpers/query-url";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";

interface TopRatedMoviesProps {
  searchParams: { page: SearchParams["page"] };
}

const TopRatedMoviesPage = async ({ searchParams }: TopRatedMoviesProps) => {
  const moviesPromise = fetcher<ApiResponse<Movie>>(
    endpoints.movies.topRated,
    `?page=${searchParams["page"] || "1"}`
  );
  const movies = await moviesPromise;

  return (
    <Container>
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        Top Rated Movies
      </h1>
      {movies.results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.results.map((movie) => (
              <MediaCard key={movie.id} media={movie} />
            ))}
          </div>
          <Paginate items={movies} />
        </>
      ) : (
        <EmptyState
          title="Oops!"
          description="Seems we can't find any top rated movies"
          actions={[{ title: "Discover Movies", path: "/movies" }]}
        />
      )}
    </Container>
  );
};

export default TopRatedMoviesPage;
