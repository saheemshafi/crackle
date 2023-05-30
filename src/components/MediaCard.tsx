import { FC } from "react";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { Tv } from "@/types/tv";

interface MediaCardProps {
  sliderItem?: boolean;
  media: Movie | Tv;
}
export const revalidate = 86400;
function isMovie(item: Movie | Tv): item is Movie {
  if ("first_air_date" in item) return false;
  return true;
}

const { format } = Intl.DateTimeFormat("en-us", { dateStyle: "medium" });
const MediaCard: FC<MediaCardProps> = ({ sliderItem, media }) => {
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
          src={`https://image.tmdb.org/t/p/w342/${media.poster_path}`}
          width={300}
          height={300}
          alt={isMovie(media) ? media.title : media.original_name}
          className="aspect-[2/3] w-full"
        />
      </div>
      <div className="mt-1 w-full px-1 py-2">
        <p className="font-work-sans text-sm font-semibold leading-snug">
          {isMovie(media) ? media.title : media.name}
        </p>
        <small className="-mt-1 text-sm text-gray-light">
          {isMovie(media)
            ? media.release_date && format(new Date(media.release_date))
            : media.first_air_date && format(new Date(media.first_air_date))}
        </small>
      </div>
    </div>
  );
};

export default MediaCard;
