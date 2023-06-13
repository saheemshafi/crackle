import { FC } from "react";
import MenuList from "./ui/MenuList";
import Link from "next/link";
import { RxCaretDown } from "react-icons/rx";

interface MediaPageHeaderProps {}

const MediaPageHeader: FC<MediaPageHeaderProps> = ({}) => {
  return (
    <nav className="flex justify-center gap-4 border-b border-b-gray-dark px-4 py-2">
      <MenuList
        buttonClasses="relative font-work-sans flex items-center gap-0.5 rounded sm:px-3 sm:py-1 p-1 text-white outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
        buttonHTML={
          <>
            <span>Overview</span> <RxCaretDown size={18} />
          </>
        }
      >
        <ul>
          <li>
            <Link className="menu-link" href={"/user/profile"}>
              Main
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={"/user/watch-list"}>
              Alternate Titles
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={`/user/ratings`}>
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
        buttonClasses="relative font-work-sans flex items-center gap-0.5 rounded sm:px-3 sm:py-1 p-1 text-white outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
        buttonHTML={
          <>
            <span>Media</span> <RxCaretDown size={18} />
          </>
        }
      >
        <ul>
          <li>
            <Link className="menu-link" href={"/user/profile"}>
              Backdrops
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={"/user/watch-list"}>
              Logos
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={`/user/ratings`}>
              Posters
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={`/user/ratings`}>
              Videos
            </Link>
          </li>
        </ul>
      </MenuList>
      <MenuList
        buttonClasses="relative font-work-sans flex items-center gap-0.5 rounded sm:px-3 sm:py-1 p-1 text-white outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
        buttonHTML={
          <>
            <span>Share</span> <RxCaretDown size={18} />
          </>
        }
      >
        <ul>
          <li>
            <Link className="menu-link" href={"/user/profile"}>
              Share Link
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={"/user/watch-list"}>
              Facebook
            </Link>
          </li>
          <li>
            <Link className="menu-link" href={`/user/ratings`}>
              Tweet
            </Link>
          </li>
        </ul>
      </MenuList>
    </nav>
  );
};

export default MediaPageHeader;
