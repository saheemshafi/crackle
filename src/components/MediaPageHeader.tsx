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

interface MediaPageHeaderProps {
  media: MovieDetails;
}

const MediaPageHeader: FC<MediaPageHeaderProps> = ({ media }) => {
  const pathname = usePathname();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setUrl(`${process.env.NEXT_PUBLIC_APP_URL}${pathname}`);
  }, [pathname]);

  return (
    <nav className="relative z-10 flex justify-center gap-4 border-y border-y-gray-dark bg-dark px-4 py-2">
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
            <Link className="menu-link" href={`/movies/${media.id}/overview`}>
              Main
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={"/user/watch-list"}>
              Alternate Titles
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={`/movies/${media.id}/overview/cast-crew`}
            >
              Cast & Crew
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={`/user/ratings`}>
              Release Dates
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={`/user/ratings`}>
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
              href={`movies/${media.id}/media/backdrops`}
            >
              Backdrops
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={`movies/${media.id}/media/logos`}>
              Logos
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={`movies/${media.id}/media/posters`}
            >
              Posters
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={`movies/${media.id}/media/videos`}
            >
              Videos
            </Link>
          </li>
          {/* <li>
            <Link
              className="menu-link"
              href={`movies/${media.id}/media/trailers`}
            >
              Trailers
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={`movies/${media.id}/media/teasers`}
            >
              Teasers
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={`movies/${media.id}/media/clips`}>
              Clips
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={`movies/${media.id}/media/bts`}>
              Behind The Scenes
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              href={`movies/${media.id}/media/featurettes`}
            >
              Featurettes
            </Link>
          </li> */}
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
              href={`https://twitter.com/intent/tweet?url=${url}&text=Checkout ${media.original_title} on Crackle.`}
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
