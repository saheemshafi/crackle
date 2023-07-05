import { options } from "./options";

export const fetcher = <T>(
  endpoint: string,
  searchParams?: string,
  fetchOptions?: object
) => {
  return fetch(`${endpoint}${searchParams || ""}`, {
    ...options,
    next: { revalidate: 2592000 },
    ...fetchOptions,
  }).then((res: Response) => {
    if (res.ok) {
      return res.json() as T;
    }
    throw res.statusText;
  });
};
