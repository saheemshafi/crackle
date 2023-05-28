import { Genre } from "./genre";
import { Movie } from "./movie";

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenreResponse {
  genres: Genre[];
}