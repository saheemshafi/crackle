import { Movie } from "@/types/movie";
import { Tv } from "@/types/tv";

export function isMovie(item: Movie | Tv): item is Movie {
  if ("release_date" in item) return true;
  return false;
}
