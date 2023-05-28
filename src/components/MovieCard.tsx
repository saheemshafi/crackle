import { FC } from "react";
import Image from "next/image";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  sliderItem?: boolean;
  movie: Movie;
}
export const revalidate = 86400;

const dateFormatter = Intl.DateTimeFormat("en-us", { dateStyle: "medium" });
const MovieCard: FC<MovieCardProps> = ({ sliderItem, movie }) => {
  return (
    <div
      data-slider-item={sliderItem}
      className={`${
        sliderItem ? "" : "card"
      } relative overflow-hidden rounded-lg shadow-md`}
    >
      {/* <div
  className="transparent absolute inset-0 bg-gradient-to-t from-dark"
  aria-hidden
></div> */}
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          width={300}
          height={300}
          alt="Poster"
        />
      </div>
      <div className="mt-1 w-full px-1 py-2">
        <p className="font-work-sans text-sm font-semibold leading-snug">
          {movie.title}
        </p>
        <small className="-mt-1 text-sm text-gray-light">
          {movie.release_date && dateFormatter.format(new Date(movie.release_date))}
        </small>
      </div>
    </div>
  );
};

export default MovieCard;
