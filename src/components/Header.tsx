import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { RxBell, RxMagnifyingGlass } from "react-icons/rx";
import NavLink from "./ui/NavLink";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="sticky top-0 flex h-14 w-full items-center justify-between bg-dark px-4 font-work-sans font-normal text-white shadow-lg md:px-5">
      <nav>
        <ul className="flex items-center gap-5 text-sm font-normal">
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
        <button className="grid h-8 w-8 place-items-center rounded-sm outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50">
          <RxMagnifyingGlass />
        </button>
        <button className="grid h-8 w-8 place-content-center rounded-sm outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50">
          <RxBell />
        </button>
        <button className="flex items-center gap-2 rounded-md px-3 py-1 outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50">
          <Image
            src="/images/avatar.png"
            alt="user avatar"
            width={30}
            height={30}
            className="aspect-square rounded-full object-cover"
          />
          <div className="text-start text-xs font-normal">
            <p>Mir Saheem Shafi</p>
            <p className="text-xs text-gray-light">User Options</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
