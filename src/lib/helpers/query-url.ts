export interface SearchParams {
  genres: string | undefined;
  sort: string | undefined;
  providers: string | undefined;
  region: string | undefined;
  page: string | undefined;
}

export const generateQueryUrl = (
  endpoint: string,
  searchParams: SearchParams
): URL => {
  const url = new URL(endpoint);
  url.searchParams.set("with_genres", searchParams["genres"] || "");
  url.searchParams.set("sort_by", searchParams["sort"] || "popularity.desc");
  url.searchParams.set("watch_region", searchParams["region"] || "");
  url.searchParams.set("with_watch_providers", searchParams["providers"] || "");
  url.searchParams.set(
    "page",
    searchParams["page"] == "0" ? "1" : searchParams["page"] || "1"
  );

  return url;
};
