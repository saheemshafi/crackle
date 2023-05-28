import { DiscoverResponse } from "@/types/api-response";
import { options } from "../api/options";
import endpoints from "@/lib/constants/endpoints.json";

export async function fetchEndpoints<T>(
  type: "movie" | "tv",
  limit: number
): Promise<T[]> {
  let requests = [];
  let endpoint: string =
    type === "movie" ? endpoints.discover.movies : endpoints.discover.tv;
  requests.push(
    (
      await fetch(endpoint, {
        ...options,
        next: { revalidate: 86400 },
      })
    ).json()
  );
  for (let i = 0; i < limit; i++) {
    if (i == 0) continue;
    requests.push((await fetch(`${endpoint}&page=${i}`, options)).json());
  }
  const data: any[] = await Promise.all(requests);
  return data.flatMap((data) => (data as DiscoverResponse<T>).results);
}
