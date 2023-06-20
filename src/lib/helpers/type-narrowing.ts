import { Movie } from "@/types/movie";
import { Season, Tv } from "@/types/tv";

export function isMovie(item: Movie | Tv | Season): item is Movie {
  if ("release_date" in item) return true;
  return false;
}

export function isSeason(item: Movie | Tv | Season): item is Season {
  if ("season_number" in item) return true;
  return false;
}
