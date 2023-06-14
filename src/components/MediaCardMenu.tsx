"use client";

import { FC } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { BiInfoCircle, BiTagAlt } from "react-icons/bi";
import { BsListUl } from "react-icons/bs";
import MenuList from "./ui/MenuList";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/user";
import { handleWatchlist } from "@/lib/utlities/tmdb-utils";
import { toastOptions } from "@/lib/utlities/toast";
import toast from "react-hot-toast";

interface MediaCardMenuProps {
  type: "movie" | "tv";
  id: number;
}

const MediaCardMenu: FC<MediaCardMenuProps> = ({ type, id }) => {
  const session = useSession();
  const user = session.data?.user as UserProfile;

  return (
    <MenuList
      classes="w-[110px] sm:w-[130px]"
      buttonClasses="grid place-items-center outline-none focus-visible:ring-2 focus-visible:ring-brand/50 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity p-0.5 rounded-full group-hover:shadow-sm shadow-black/30 bg-black/80"
      icon={<AiOutlineEllipsis size={20} />}
    >
      <ul>
        <li>
          <button className="menu-link">
            <BsListUl size={15} className="hidden sm:inline" /> Add To List
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              if (!user) {
                toast("Please Login First!", {
                  ...toastOptions,
                  icon: <BiInfoCircle size={20} className="text-brand"/>,
                });
                return;
              }
              handleWatchlist(type, id, user.session_id || null);
            }}
            className="menu-link"
          >
            <BiTagAlt size={15} className="hidden sm:inline" /> Watchlist
          </button>
        </li>
      </ul>
    </MenuList>
  );
};

export default MediaCardMenu;
