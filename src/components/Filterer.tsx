"use client";
import { Genre } from "@/types/genre";
import { FC, useEffect, useState } from "react";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { GenreResponse } from "@/types/api-response";
import { twMerge } from "tailwind-merge";
interface FiltererProps {
  type?: "tv" | "movie";
}

const Filterer: FC<FiltererProps> = ({ type = "movie" }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenres, setActiveGenres] = useState<number[]>([]);
  useEffect(() => {
    const genrePromise: Promise<GenreResponse> = fetch(
      `${type == "movie" ? endpoints.genres.movie : endpoints.genres.tv} `,
      {
        ...options,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER}`,
        },
        next: { revalidate: 2592000 },
      }
    ).then((res: Response) => res.json());
    genrePromise.then((genres) => {
      if (!genres.genres) return;
      setGenres(genres.genres);
    });
  }, [type]);

  return (
    <div className="sticky top-[calc(56px_+_1rem)] w-96 self-start bg-gray-dark/10 md:top-[calc(56px_+_1.25rem)]">
      <div className="mb-3 rounded border border-gray-dark px-3 py-4 shadow">
        <label
          className="mb-1 block font-work-sans text-sm text-gray-light"
          htmlFor="sort"
        >
          Sort Items
        </label>
        <select
          name="sort"
          id="sort"
          className="w-full rounded border border-gray-dark bg-gray-dark px-2 py-2 font-work-sans text-sm outline-none hover:border-gray-md/40 focus:ring-2 focus:ring-brand/30"
        >
          <option value="" className="bg-gray-dark">
            Popularity Ascending
          </option>
          <option value="" className="bg-gray-dark">
            Popularity Descending
          </option>
          <option value="" className="bg-gray-dark">
            Rating Ascending
          </option>
          <option value="" className="bg-gray-dark">
            Rating Descending
          </option>
          <option value="" className="bg-gray-dark">
            Released Ascending
          </option>
          <option value="" className="bg-gray-dark">
            Released Descending
          </option>
        </select>
      </div>
      <div className="mb-3 rounded border border-gray-dark px-3 py-4 shadow">
        <div>
          <p className="mb-3 block font-work-sans text-sm text-gray-light">
            Genres
          </p>
          <div className="flex flex-wrap gap-1">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => {
                  if (!activeGenres.includes(genre.id)) {
                    setActiveGenres((prev) => [...prev, genre.id]);
                    return;
                  }
                  setActiveGenres(
                    activeGenres.filter(
                      (activeGenre) => genre.id !== activeGenre
                    )
                  );
                }}
                className={twMerge(
                  "rounded-full border border-transparent bg-gray-dark px-2 py-1 text-xs text-white transition-all hover:border-brand/50 focus:ring-1 focus:ring-brand/50",
                  activeGenres.includes(genre.id) ? "bg-brand" : ""
                )}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-3 rounded border border-gray-dark px-3 py-4 shadow"></div>
    </div>
  );
};

export default Filterer;
