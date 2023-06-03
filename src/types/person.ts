import { Movie } from "./movie";
import { Tv } from "./tv";

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownFor<Movie>[] | KnownFor<Tv>[];
  known_for_department: KnownForDepartment;
  name: string;
  popularity: number;
  profile_path: string;
}

export type KnownFor<T> = {
  [Property in keyof T]: T[Property];
} & { media: MediaType };

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}

export enum OriginalLanguage {
  En = "en",
  It = "it",
  Ko = "ko",
  Tl = "tl",
}

export enum KnownForDepartment {
  Acting = "Acting",
  Directing = "Directing",
}
