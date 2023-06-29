export interface Video {
  id: string;
  iso_3166_1: ISO3166_1;
  iso_639_1: OriginalLanguage;
  key: string;
  name: string;
  official: boolean;
  published_at: Date;
  site: Site;
  size: number;
  type: Type;
}

export enum ISO3166_1 {
  Us = "US",
}

export enum Site {
  YouTube = "YouTube",
}

export enum Type {
  BehindTheScenes = "Behind the Scenes",
  Featurette = "Featurette",
  Teaser = "Teaser",
  Trailer = "Trailer",
}

export enum OriginalLanguage {
  En = "en",
}
