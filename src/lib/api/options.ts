export const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_BEARER}`,
    "content-type": "application/json",
    accept: "application/json",
  },
  body: undefined,
  createOptions(method: "GET" | "POST" | "PUT" | "DELETE", body: string) {
    return { ...this, body, method };
  },
};
