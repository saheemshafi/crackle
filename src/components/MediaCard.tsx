import { FC } from "react";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { Tv } from "@/types/tv";
import { isMovie } from "@/lib/helpers/type-narrowing";
import Link from "next/link";
import MenuList from "./ui/MenuList";
import { AiOutlineEllipsis } from "react-icons/ai";
import { BsInfoCircle, BsListUl } from "react-icons/bs";
import { BiTagAlt } from "react-icons/bi";

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
      className={`${sliderItem ? "" : "card"
        } group relative overflow-hidden rounded-lg shadow-md`}
    >
           <div className="absolute right-1 top-1 z-10 sm:right-2 sm:top-2">
          <MenuList
            classes="w-[110px] sm:w-[130px]"
            buttonClasses="grid place-items-center outline-none focus-visible:ring-2 focus-visible:ring-brand/50 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity p-0.5 rounded-full group-hover:shadow-sm shadow-black/30 bg-black/80"
            icon={<AiOutlineEllipsis size={20} />}
          >
            <ul>
              <li>
                <button className="menu-link">
                  <BsListUl size={15} className="hidden sm:inline" /> Add To
                  List
                </button>
              </li>
              <li>
                <button className="menu-link">
                  <BiTagAlt size={15} className="hidden sm:inline" /> Watchlist
                </button>
              </li>
            </ul>
          </MenuList>
        </div>
      <Link title={isMovie(media) ? media.title : media.original_name} href={
        isMovie(media) ? `/movies/${media.id}` : `/tv/${media.id}`
      } className="relative block overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w342/${media.poster_path}`}
          width={300}
          height={300}
          alt={isMovie(media) ? media.title : media.original_name}
          className="aspect-[2/3] w-full"
        />
      </Link>
      <div className="mt-1 w-full px-1 py-2">
        <Link
          href={isMovie(media) ? `/movies/${media.id}` : `/tv/${media.id}`}
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
