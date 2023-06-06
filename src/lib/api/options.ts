export const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_BEARER}`,
    "content-type": "application/json",
    accept: "application/json",
  },
  body: undefined,
  next: { revalidate: 2592000 },
};

export const clientOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
    "content-type": "application/json",
    accept: "application/json",
  },
  body: undefined,
};
