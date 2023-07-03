"use client";

import { FC, useEffect, useState } from "react";
import MenuList from "./ui/MenuList";
import Link from "next/link";
import { RxCaretDown } from "react-icons/rx";
import { MovieDetails } from "@/types/movie";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { toastOptions } from "@/lib/utlities/toast";
import { BiCopy } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { SeriesDetails } from "@/types/tv";

interface MediaPageHeaderProps {
  media: MovieDetails | SeriesDetails;
  type?: "movie" | "tv";
}

const MediaPageHeader: FC<MediaPageHeaderProps> = ({
  media,
  type = "movie",
}) => {
  const pathname = usePathname();
  const [url, setUrl] = useState<string>();
  function isMovieDetails(
    media: MovieDetails | SeriesDetails
  ): media is MovieDetails {
    return type === "movie";
  }

  useEffect(() => {
    setUrl(`${process.env.NEXT_PUBLIC_APP_URL}${pathname}`);
  }, [pathname]);

  return (
    <nav className="relative z-[19] flex justify-center gap-4 border-y border-y-gray-dark bg-dark px-4 py-2">
      <MenuList
        adjustFirstOnSmall
        buttonClasses={twMerge(
          `relative font-work-sans flex relative items-center gap-0.5 rounded sm:px-3 sm:py-1 p-1 text-white outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50`,
          pathname.includes("overview") &&
            "after:absolute after:rounded-t-full after:w-8 after:h-1 after:bg-brand after:left-1/2 after:-translate-x-1/2 after:-bottom-[8px]"
        )}
        buttonHTML={
          <>
            <span>Overview</span> <RxCaretDown size={18} />
          </>
        }
      >
        <ul>
          <li>
            <Link
              className="menu-link"
              href={
                type == "movie"
                  ? `/movies/${media.id}/overview`
                  : `/tv/${media.id}/overview`
              }
            >
              Main
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={
                type == "movie"
                  ? `/movies/${media.id}/overview/alternate-titles`
                  : `/tv/${media.id}/overview/alternate-titles`
              }
            >
              Alternate Titles
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={
                type == "movie"
                  ? `/movies/${media.id}/overview/cast-crew`
                  : `/tv/${media.id}/overview/cast-crew`
              }
            >
              Cast & Crew
            </Link>
          </li>
          {type == "movie" && (
            <li>
              <Link
                className="menu-link"
                href={
                  type == "movie"
                    ? `/movies/${media.id}/overview/release-dates`
                    : `/tv/${media.id}/overview/release-dates`
                }
              >
                Release Dates
              </Link>
            </li>
          )}
          <li>
            <Link
              className="menu-link"
              href={
                type == "movie"
                  ? `/movies/${media.id}/overview/translations`
                  : `/tv/${media.id}/overview/translations`
              }
            >
              Translations
            </Link>
          </li>
        </ul>
      </MenuList>

      <MenuList
        adjustFirstOnSmall
        buttonClasses={twMerge(
          "relative font-work-sans flex items-center gap-0.5 rounded sm:px-3 sm:py-1 p-1 text-white outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50",
          pathname.includes("media") &&
            "after:absolute after:rounded-t-full after:w-8 after:h-1 after:bg-brand after:left-1/2 after:-translate-x-1/2 after:-bottom-[8px]"
        )}
        buttonHTML={
          <>
            <span>Media</span> <RxCaretDown size={18} />
          </>
        }
      >
        <ul>
          <li>
            <Link
              className="menu-link"
              href={
                type == "movie"
                  ? `/movies/${media.id}/media/backdrops`
                  : `/tv/${media.id}/media/backdrops`
              }
            >
              Backdrops
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={
                type == "movie"
                  ? `/movies/${media.id}/media/logos`
                  : `/tv/${media.id}/media/logos`
              }
            >
              Logos
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={
                type == "movie"
                  ? `/movies/${media.id}/media/posters`
                  : `/tv/${media.id}/media/posters`
              }
            >
              Posters
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={
                type == "movie"
                  ? `/movies/${media.id}/media/videos`
                  : `/tv/${media.id}/media/videos`
              }
            >
              Videos
            </Link>
          </li>
        </ul>
      </MenuList>
      <MenuList
        adjustFirstOnSmall
        buttonClasses="relative font-work-sans flex items-center gap-0.5 rounded sm:px-3 sm:py-1 p-1 text-white outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
        buttonHTML={
          <>
            <span>Share</span> <RxCaretDown size={18} />
          </>
        }
      >
        <ul>
          <li>
            <button
              className="menu-link"
              onClick={() => {
                if (typeof url == "string") {
                  navigator.clipboard.writeText(url);
                  toast("Copied Link!", {
                    ...toastOptions,
                    icon: <BiCopy size={18} />,
                  });
                }
              }}
            >
              Share Link
            </button>
          </li>
          <li>
            <Link
              className="menu-link"
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Facebook
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={`https://twitter.com/intent/tweet?url=${url}&text=Checkout ${
                isMovieDetails(media) ? media.title : media.name
              } on Crackle.`}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Tweet
            </Link>
          </li>
        </ul>
      </MenuList>
    </nav>
  );
};

export default MediaPageHeader;
