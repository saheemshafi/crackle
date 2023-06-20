export interface MovieAltTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface TvAltTitle {
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
