import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { RxBell, RxMagnifyingGlass } from "react-icons/rx";
import NavLink from "./ui/NavLink";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="h-14 text-white w-full sticky top-0 flex justify-between font-normal items-center px-4 md:px-5 bg-dark shadow-lg font-work-sans">
      <nav>
        <ul className="flex text-sm gap-5 items-center font-normal">
          <li>
            <NavLink href="/" type="link" text="All" />
          </li>
          <li>
            <NavLink href="/movies" type="link" text="Movies" />
          </li>
          <li>
            <NavLink href="/tv" type="link" text="Tv Shows" />
          </li>
          <li>
            <NavLink href="/cartoons" type="link" text="Cartoons" />
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 hover:bg-gray-dark grid place-items-center rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:bg-gray-dark outline-none">
          <RxMagnifyingGlass />
        </button>
        <button className="w-8 h-8 hover:bg-gray-dark grid place-content-center rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:bg-gray-dark outline-none">
          <RxBell />
        </button>
        <button className="flex gap-2 items-center hover:bg-gray-dark py-1 px-3 rounded-md focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:bg-gray-dark outline-none">
          <Image
            src="/images/avatar.png"
            alt="user avatar"
            width={30}
            height={30}
            className="rounded-full object-cover aspect-square"
          />
          <div className="font-normal text-start text-xs">
            <p>Mir Saheem Shafi</p>
            <p className="text-gray-light text-xs">User Options</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
