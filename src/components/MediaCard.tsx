import { FC } from "react";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { Tv } from "@/types/tv";
import { isMovie } from "@/lib/helpers/type-narrowing";
import Link from "next/link";
import MediaCardMenu from "./MediaCardMenu";

interface MediaCardProps {
  sliderItem?: boolean;
  media: Movie | Tv;
}
export const revalidate = 86400;

const { format } = Intl.DateTimeFormat("en-us", { dateStyle: "medium" });
const MediaCard: FC<MediaCardProps> = ({ sliderItem, media }) => {
  return (
    <div
      data-slider-item={sliderItem}
      className={`${
        sliderItem ? "" : "card"
      } group relative isolate overflow-hidden rounded-lg shadow-md`}
    >
      <div className="absolute right-1 top-1 z-[1] sm:right-2 sm:top-2">
        <MediaCardMenu type={isMovie(media) ? "movie" : "tv"} id={media.id} />
      </div>
      <Link
        title={isMovie(media) ? media.title : media.original_name}
        href={
          isMovie(media)
            ? `/movies/${media.id}/overview`
            : `/tv/${media.id}/overview`
        }
        className="relative block overflow-hidden"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w342/${media.poster_path}`}
          width={300}
          height={300}
          alt={isMovie(media) ? media.title : media.original_name}
          className="aspect-[2/3] w-full"
          placeholder="blur"
          blurDataURL="/images/image-placeholder.jpeg"
        />
      </Link>
      <div className="mt-1 w-full px-1 py-2">
        <Link
          href={
            isMovie(media)
              ? `/movies/${media.id}/overview`
              : `/tv/${media.id}/overview`
          }
          className="block outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50"
        >
          <p className="font-work-sans text-sm font-semibold leading-snug hover:text-gray-200">
            {isMovie(media) ? media.title : media.name}
          </p>
        </Link>
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
