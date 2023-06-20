import { MovieAltTitle, TvAltTitle } from "./alt-titles";
import { Image } from "./backdrop";
import { Cast } from "./cast";
import { Country } from "./country";
import { Genre } from "./genre";
import { Dates } from "./release-date";
import { Translation, TvTranslation } from "./translations";
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

export interface MovieAltTilesResponse {
  id: number;
  titles: MovieAltTitle[];
}

export interface TvAltTilesResponse {
  id: number;
  results: TvAltTitle[];
}

export interface ReleaseDateResponse {
  id: number;
  results: Dates[];
}

export interface TranslationsResponse {
  id: number;
  translations: Translation[];
}

export interface TvTranslationResponse {
  id: number;
  translations: TvTranslation[];
}

export interface LanguagesResponse {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ImagesResponse {
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
}

export interface TvAltTitles {
  id: number;
  results: Result[];
}

export interface Result {
  iso_3166_1: string;
  title: string;
  type: Type;
}

export enum Type {
  Empty = "",
  S1 = "S1",
  S2 = "S2",
  S3 = "S3",
  S4 = "S4",
}
