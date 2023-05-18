import Image from "next/image";
import { FC } from "react";
import SidebarMenu from "./SidebarMenu";
import NavLink from "./ui/NavLink";
import { RxHome, RxHeart, RxClock, RxFrame, RxPlay, RxCalendar } from "react-icons/rx";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <aside className="w-48 bg-gray-dark h-screen max-h-screen sticky top-0 overflow-y-auto">
      <div className="sticky top-0 bg-gray-dark shadow-md rounded-b-2xl h-14 flex items-center mb-3">
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
            <NavLink icon={<RxPlay />} href="/movies/now-playing" text="Now Playing" />
          </li>
          <li>
            <NavLink
              icon={<RxCalendar />}
              href="/movies/upcoming"
              text="Upcoming"
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
            <NavLink icon={<RxPlay />} href="/tv/now-playing" text="Now Playing" />
          </li>
          <li>
            <NavLink
              icon={<RxCalendar />}
              href="/tv/upcoming"
              text="Upcoming"
            />
          </li>
        </ul>
      </SidebarMenu>
      <div></div>
    </aside>
  );
};

export default Sidebar;
