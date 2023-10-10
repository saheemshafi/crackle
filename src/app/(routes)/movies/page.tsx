import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import Filterer from "@/components/Filterer";
import MediaCard from "@/components/MediaCard";
import Paginate from "@/components/Paginate";
import FilterTrigger from "@/components/ui/FilterTrigger";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { SearchParams, generateQueryString } from "@/lib/helpers/query-url";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import { Metadata } from "next";

interface MoviesPageProps {
  searchParams: SearchParams;
}

const { title, description } = {
  title: "Discover Movies | Action, Adventure, Fiction, Mystery",
  description:
    "Discover top movies from action, adventure and more. Filter, select and start enjoying",
};

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

const MoviesPage = async ({ searchParams }: MoviesPageProps) => {
  const moviesPromise = fetcher<ApiResponse<Movie>>(
    endpoints.discover.movies,
    generateQueryString(searchParams)
  );
  const movies: ApiResponse<Movie> = await moviesPromise;

  return (
    <Container>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
              Movies
            </h1>
            <FilterTrigger />
          </div>
          {movies.results.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {movies.results.map((movie) => (
                <MediaCard key={movie.id} media={movie} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Oops!"
              description="Seems we can't find any movies"
              actions={[
                { title: "Home", path: "/" },
                { title: "Discover Series", path: "/tv" },
              ]}
            />
          )}
        </div>
        <Filterer type="movie" />
      </div>
      {movies.results.length > 0 && <Paginate items={movies} />}
    </Container>
  );
};

export default MoviesPage;
