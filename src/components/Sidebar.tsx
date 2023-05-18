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

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <aside className="w-48 bg-gray-dark h-screen max-h-screen sticky top-0 overflow-y-auto scroll-design">
      <div className="sticky top-0 bg-gray-dark border-b border-b-zinc-800 shadow-md h-14 flex items-center mb-3">
        <Image
          src="/images/brand/crackle-brand.png"
          alt="crackle"
          width={100}
          height={30}
          className="w-24 h-auto ml-4"
        />
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
            <NavLink
              icon={<RxClock />}
              href="/coming-soon"
              text="Coming Soon"
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
};

export default Sidebar;
