import { AltTitle } from "./alt-titles";
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

export interface AltTilesResponse {
  id: number;
  titles: AltTitle[];
}

export interface ReleaseDateResponse {
  id: number;
  results: Dates[];
}

export interface Dates {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  descriptors: any[];
  iso_639_1: string;
  note: Note;
  release_date: Date;
  type: ReleaseType;
}

export enum Note {
  BerlinInternationalFilmFestival = "Berlin International Film Festival",
  Empty = "",
  NewYorkInternationalChildrenSFilmFestival = "New York International Children's Film Festival",
  TorontoInternationalFilmFestival = "Toronto International Film Festival",
}
export enum ReleaseType {
  Premiere = 1,
  Theatrical_Limited,
  Theatrical,
  Digital,
  Physical,
  Tv,
}
