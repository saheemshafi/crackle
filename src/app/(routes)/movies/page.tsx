import MediaCard from "@/components/MediaCard";
import { options } from "@/lib/api/options";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import endpoints from "@/lib/constants/endpoints.json";
import Container from "@/components/Container";
import Filterer from "@/components/Filterer";
import { SearchParams, generateQueryUrl } from "@/lib/helpers/query-url";
import Button from "@/components/ui/Button";
import { BiFilter } from "react-icons/bi";
import FilterTrigger from "@/components/ui/FilterTrigger";

interface MoviesPageProps {
  searchParams: SearchParams;
}

const MoviesPage = async ({ searchParams }: MoviesPageProps) => {
  const moviesPromise = (
    await fetch(
      generateQueryUrl(endpoints.discover.movies, searchParams),
      options
    )
  ).json();

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
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {movies.results.map((movie) => (
              <MediaCard key={movie.id} media={movie} />
            ))}
          </div>
        </div>
        <Filterer type="movie" />
      </div>
    </Container>
  );
};

export default MoviesPage;
