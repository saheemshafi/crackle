import { fetcher } from "@/lib/api/fetcher";
import Container from "./Container";
import endpoints from "@/lib/constants/endpoints.json";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import { Tv } from "@/types/tv";
import { Person } from "@/types/person";
import { Pretty } from "@/types/type-helpers";
import MediaCard from "./MediaCard";
import PersonCard from "./PersonCard";

interface SearchResultsProps {
  query: string | undefined;
}

async function SearchResults({ query }: SearchResultsProps) {
  type SearchApiResponse = Pretty<ApiResponse<Movie | Tv | Person>>;
  if (!query) return null;
  const results = await fetcher<SearchApiResponse>(
    `${endpoints.search}?query=${query}&page=1`
  );

  return (
    <Container>
      <p className="mt-4 max-w-lg font-work-sans font-semibold">
        Search results for <span title={query}>{query}</span> :
      </p>
      {results.results.length == 0 && (
        <p className="mt-4 font-work-sans">
          No results found. Check the search query again.
        </p>
      )}
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
        {results.results.map((result) => (
          <div key={result.id}>{getElement(result)}</div>
        ))}
      </div>
    </Container>
  );
}

const getElement = (item: Movie | Tv | Person) => {
  if (!("media_type" in item)) return null;

  switch (item.media_type) {
    case "movie":
      return <MediaCard media={item as Movie} />;
    case "tv":
      return <MediaCard media={item as Tv} />;
    case "person":
      return <PersonCard person={item as Person} />;
    default:
      return null;
  }
};

export default SearchResults;
