export interface MediaType {
  media_type: "movie" | "tv";
  media_id: number;
  watchlist?: boolean;
  favourite?:boolean
}
