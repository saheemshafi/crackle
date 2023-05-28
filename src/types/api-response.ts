import { Genre } from "./genre";

export interface DiscoverResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GenreResponse {
  genres: Genre[];
}