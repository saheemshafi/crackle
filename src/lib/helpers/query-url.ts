export interface SearchParams {
  genres: string | undefined;
  sort: string | undefined;
  providers: string | undefined;
  region: string | undefined;
  page: string | undefined;
}

export const generateQueryString = (searchParams: SearchParams): string => {
  const url = new URLSearchParams();
  url.set("with_genres", searchParams["genres"] || "");
  url.set("sort_by", searchParams["sort"] || "popularity.desc");
  url.set("watch_region", searchParams["region"] || "");
  url.set("with_watch_providers", searchParams["providers"] || "");
  url.set(
    "page",
    searchParams["page"] == "0" ? "1" : searchParams["page"] || "1"
  );

  return url.toString();
};
