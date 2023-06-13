"use client";

import { FC, MouseEventHandler } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { BiTagAlt } from "react-icons/bi";
import { BsListUl } from "react-icons/bs";
import MenuList from "./ui/MenuList";
import endpoints from "@/lib/constants/endpoints.json";
import { clientOptions } from "@/lib/api/options";
import { MediaType } from "@/types/media-request";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/user";
import toast from "react-hot-toast";
import { ApiResponse } from "@/types/api-response";
import { Tv } from "@/types/tv";
import { Movie } from "@/types/movie";
import { RxInfoCircled } from "react-icons/rx";
import { toastOptions } from "@/lib/utlities/toast";
import { VscError } from "react-icons/vsc";

interface MediaCardMenuProps {
  type: "movie" | "tv";
  id: number;
}

const MediaCardMenu: FC<MediaCardMenuProps> = ({ type, id }) => {
  const session = useSession();
  const user = session.data?.user as UserProfile;

  const addToWatchlist: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (session.status == "unauthenticated") {
      toast("You Need To Login First!", {
        ...toastOptions,
        icon: <RxInfoCircled size={20} />,
      });
      return;
    }

    const data: MediaType = {
      media_id: id,
      media_type: type == "movie" ? "movie" : "tv",
      watchlist: true,
    };

    try {
      const watchlistResponse = await fetch(
        `${endpoints.actions.watchlist}/${
          type == "movie" ? "movies" : "tv"
        }?session_id=${user.session_id}`,
        clientOptions
      );
      const watchlist: ApiResponse<Movie | Tv> = await watchlistResponse.json();
      if (watchlist.results.some((item) => item.id == id)) {
        toast("Already In Watchlist!", {
          ...toastOptions,
          icon: <RxInfoCircled size={20} />,
        });
        return;
      }

      const response = await fetch(
        `${endpoints.actions.watchlist}?session_id=${user.session_id}`,
        {
          ...clientOptions,
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast("Added To Watchlist!", toastOptions);
        return;
      }
    } catch (error) {
      toast("Oops! Server Error", {
        ...toastOptions,
        icon: <VscError size={20} />,
      });
    }
  };

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
          <button onClick={addToWatchlist} className="menu-link">
            <BiTagAlt size={15} className="hidden sm:inline" /> Watchlist
          </button>
        </li>
      </ul>
    </MenuList>
  );
};

export default MediaCardMenu;
