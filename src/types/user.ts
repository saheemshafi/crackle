export interface TMDBUser {
  avatar: Avatar;
  id: number | string;
  include_adult: boolean;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  username: string;
  session_id?: string | null;
}

export interface Avatar {
  gravatar: Gravatar;
  tmdb: Tmdb;
}

export interface Gravatar {
  hash: string;
}

export interface Tmdb {
  avatar_path: null;
}

export type UserProfile = Omit<
  TMDBUser,
  "include_adult" | "iso_3166_1" | "iso_639_1"
>;

export interface UserCredentials {
  username: string;
  password: string;
  request_token?: string;
}

export interface TMDBAuthResponse {
  request_token?: string;
  success: "true" | "false";
  session_id?: string;
  expiresAt?: string;
}
