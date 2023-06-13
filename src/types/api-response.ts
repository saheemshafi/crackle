import { Cast } from "./cast";
import { Country } from "./country";
import { Genre } from "./genre";
import { WatchProvider } from "./watch-provider";

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type ResultsOnly<T> = Pick<ApiResponse<T>, "results">;

export type GenreResponse = {
  [Property in keyof ResultsOnly<Genre> as "genres"]: Genre[];
};

export type CountryResponse = {
  [Property in keyof ResultsOnly<Country>]: Country[];
};

export type ProviderResponse = {
  [Property in keyof ResultsOnly<WatchProvider>]: WatchProvider[];
};

export interface MediaAccountState {
  favorite: boolean;
  id: number;
  rated: boolean;
  watchlist: boolean;
}

export interface CastResponse {
  cast: Cast[];
  crew: Cast[];
  id: number;
}
