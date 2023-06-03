import { Genre } from "./genre";

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type ResultsOnly<T> = Omit<
  ApiResponse<T>,
  "page" | "total_pages" | "total_results"
>;

export type GenreResponse = {
  [Property in keyof ResultsOnly<Genre> as "genres"]: Genre[];
};