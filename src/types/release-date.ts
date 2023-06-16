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
