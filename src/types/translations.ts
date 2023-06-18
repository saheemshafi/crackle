export interface Translation {
  data: Data;
  english_name: string;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
}

export interface Data {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}
