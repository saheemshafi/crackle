import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { RxBell, RxMagnifyingGlass } from "react-icons/rx";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="h-14 text-white w-full sticky top-0 flex justify-between font-normal items-center px-4 md:px-5 bg-dark shadow-lg font-work-sans">
      <nav>
        <ul className="flex text-sm gap-5 items-center font-normal">
          <li>
            <Link href="/">All</Link>
          </li>
          <li>
            <Link href="/">Movies</Link>
          </li>
          <li>
            <Link href="/">Tv Shows</Link>
          </li>
          <li>
            <Link href="/">Cartoons</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 hover:bg-gray-dark grid place-items-center rounded-sm">
          <RxMagnifyingGlass />
        </button>
        <button className="w-8 h-8 hover:bg-gray-dark grid place-content-center rounded-sm">
          <RxBell />
        </button>
        <button className="flex gap-2 items-center hover:bg-gray-dark py-1 px-3 rounded-md">
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
