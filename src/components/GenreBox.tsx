"use client";
import { clientOptions } from "@/lib/api/options";
import { GenreResponse } from "@/types/api-response";
import endpoints from "@/lib/constants/endpoints.json";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Genre } from "@/types/genre";
import ChipButton from "./ui/ChipButton";
import Skeleton from "./ui/Skeleton";
import { BiErrorAlt } from "react-icons/bi";
import { toastOptions } from "@/lib/utlities/toast";
import toast from "react-hot-toast";

interface GenreBoxProps {
  type?: "tv" | "movie";
  genres: Genre[];
  setGenres: Dispatch<SetStateAction<Genre[]>>;
  setActiveGenres: Dispatch<SetStateAction<string[]>>;
  activeGenres: string[];
}

const GenreBox: FC<GenreBoxProps> = ({
  type = "movie",
  genres,
  setGenres,
  activeGenres,
  setActiveGenres,
}) => {
  useEffect(() => {
    const genrePromise: Promise<GenreResponse> = fetch(
      `${type == "movie" ? endpoints.genres.movie : endpoints.genres.tv} `,
      clientOptions
    ).then((res: Response) => res.json());
    genrePromise
      .then((genresResponse) => setGenres(genresResponse.genres))
      .catch((error) => {
        toast.error("Oops! Something Went Wrong", {
          ...toastOptions,
          icon: <BiErrorAlt className="text-brand" size={20} />,
        });
      });
  }, [type, setGenres]);
  return (
    <div className="flex flex-wrap gap-1">
      {genres.length > 0
        ? genres.map((genre) => (
            <ChipButton
              text={genre.name}
              key={genre.id}
              active={activeGenres.includes(genre.id.toString())}
              handler={() => {
                if (!activeGenres.includes(genre.id.toString())) {
                  setActiveGenres((prev) => [
                    ...activeGenres,
                    genre.id.toString(),
                  ]);
                  return;
                }
                setActiveGenres(
                  activeGenres.filter(
                    (activeGenre) =>
                      genre.id.toString() !== activeGenre.toString()
                  )
                );
              }}
            />
          ))
        : new Array(10).fill(null).map((_, i) => (
            <span key={i}>
              <Skeleton className="h-5 w-10 rounded-full bg-gray-dark" />
            </span>
          ))}
    </div>
  );
};

export default GenreBox;
