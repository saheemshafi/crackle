"use client";
import Image from "next/image";
import { FC, useContext } from "react";
import SidebarMenu from "./SidebarMenu";
import NavLink from "./ui/NavLink";
import { RxFrame, RxPlay, RxCalendar, RxStar, RxDesktop } from "react-icons/rx";
import { RiVipCrown2Line } from "react-icons/ri";
import Link from "next/link";
import { IoTvOutline, IoVideocamOutline } from "react-icons/io5";
import { SidebarContext } from "@/providers/SidebarProvider";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const { state } = useContext(SidebarContext);
  return (
    <aside
      className={`scroll-design min-w-48 fixed left-0 top-[56px] z-10 h-[calc(100vh-56px)] w-48 shrink-0 grow-0 basis-48 transform transition-transform ease-in-out duration-200 overflow-y-auto bg-gray-dark md:sticky md:left-auto md:top-0 md:h-screen md:min-h-screen md:w-auto md:transform-none ${
        state.isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
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
      <SidebarMenu title="Discover">
        <ul>
          <li>
            <NavLink icon={<IoVideocamOutline />} href="/" text="Movies" />
          </li>
          <li>
            <NavLink icon={<IoTvOutline />} href="/tv" text="Tv Shows" />
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
};

export default Sidebar;
