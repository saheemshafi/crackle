import { MediaType } from "@/types/media-request";
import endpoints from "@/lib/constants/endpoints.json";
import toast from "react-hot-toast";
import { clientOptions } from "../api/options";
import { toastOptions } from "./toast";
import { RxInfoCircled } from "react-icons/rx";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import { Tv } from "@/types/tv";
import { BiCheck, BiErrorAlt } from "react-icons/bi";

export const handleWatchlist = async (
  type: "movie" | "tv",
  id: number,
  session_id: string | null
) => {
  if (!session_id) {
    toast("You Need To Login First!", {
      ...toastOptions,
      icon: <RxInfoCircled size={20} />,
    });
    return;
  }
  let existsInWatchlist = false;
  const watchlistResponse = await fetch(
    `${endpoints.actions.watchlist}/${
      type == "movie" ? "movies" : "tv"
    }?session_id=${session_id}`,
    clientOptions
  );
  const watchlist: ApiResponse<Movie | Tv> = await watchlistResponse.json();

  if (watchlist.results.some((item) => item.id == id)) {
    existsInWatchlist = true;
  }

  let data: MediaType = {
    media_id: id,
    media_type: type == "movie" ? "movie" : "tv",
    watchlist: true,
  };
  if (existsInWatchlist) {
    data.watchlist = false;
  }

  try {
    const response = await fetch(
      `${endpoints.actions.watchlist}?session_id=${session_id}`,
      {
        ...clientOptions,
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      if (data.watchlist) {
        toast.success("Added To Watchlist!", {
          ...toastOptions,
          icon: <BiCheck size={20} className="text-brand" />,
        });
        return;
      }
      toast("Removed From Watchlist!", {
        ...toastOptions,
        icon: <RxInfoCircled size={20} className="text-brand" />,
      });
    }
  } catch (error) {
    toast.error("Oops! Something Went Wrong", {
      ...toastOptions,
      icon: <BiErrorAlt className="text-brand" size={20} />,
    });
  }
};
