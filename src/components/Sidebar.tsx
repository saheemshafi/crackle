import Image from "next/image";
import { FC } from "react";
import SidebarMenu from "./SidebarMenu";
import NavLink from "./ui/NavLink";
import {
  RxHome,
  RxHeart,
  RxClock,
  RxFrame,
  RxPlay,
  RxCalendar,
  RxStar,
  RxDesktop,
} from "react-icons/rx";
import { RiVipCrown2Line } from "react-icons/ri";
import Link from "next/link";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => (
  <aside className="scroll-design min-w-48 sticky z-10 top-0 h-screen max-h-screen basis-48 shrink-0 grow-0 overflow-y-auto bg-gray-dark">
    <div className="sticky top-0 mb-3 flex h-14 items-center bg-gray-dark">
      <Link href="/">
        <Image
          src="/images/brand/crackle-brand.png"
          alt="crackle"
          width={100}
          height={30}
          className="ml-4 h-auto w-24"
        />
      </Link>
    </div>
    <SidebarMenu>
      <ul>
        <li>
          <NavLink icon={<RxHome />} href="/" text="Home" />
        </li>
        <li>
          <NavLink icon={<RxHeart />} href="/watch-list" text="Watch List" />
        </li>
        <li>
          <NavLink icon={<RxClock />} href="/coming-soon" text="Coming Soon" />
        </li>
      </ul>
    </SidebarMenu>
    <SidebarMenu title="People">
      <ul>
        <li>
          <NavLink
            icon={<RiVipCrown2Line />}
            href="/people/popular"
            text="Popular Faces"
          />
        </li>
      </ul>
    </SidebarMenu>
    <SidebarMenu title="Movies" collapsible>
      <ul>
        <li>
          <NavLink icon={<RxFrame />} href="/movies/popular" text="Popular" />
        </li>
        <li>
          <NavLink
            icon={<RxPlay />}
            href="/movies/now-playing"
            text="Now Playing"
          />
        </li>
        <li>
          <NavLink
            icon={<RxCalendar />}
            href="/movies/upcoming"
            text="Upcoming"
          />
        </li>
        <li>
          <NavLink
            icon={<RxStar />}
            href="/movies/top-rated"
            text="Top Rated"
          />
        </li>
      </ul>
    </SidebarMenu>
    <SidebarMenu title="Tv Shows" collapsible>
      <ul>
        <li>
          <NavLink icon={<RxFrame />} href="/tv/popular" text="Popular" />
        </li>
        <li>
          <NavLink
            icon={<RxPlay />}
            href="/tv/airing-today"
            text="Airing Today"
          />
        </li>
        <li>
          <NavLink icon={<RxDesktop />} href="/tv/on-tv" text="On Tv" />
        </li>
        <li>
          <NavLink icon={<RxStar />} href="/tv/top-rated" text="Top Rated" />
        </li>
      </ul>
    </SidebarMenu>
    <div></div>
  </aside>
);

export default Sidebar;
