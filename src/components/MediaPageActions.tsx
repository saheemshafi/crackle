"use client";

import { handleWatchlist } from "@/lib/utlities/tmdb-utils";
import { MediaAccountState } from "@/types/api-response";
import { UserProfile } from "@/types/user";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { BiTagAlt } from "react-icons/bi";
import { BsListUl } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

interface MediaPageActionsProps {
  type: "movie";
  mediaId: number;
  accountState: MediaAccountState;
}
const MediaPageActions: FC<MediaPageActionsProps> = ({
  mediaId,
  type,
  accountState,
}) => {
  const session = useSession();
  const user = session.data?.user as UserProfile;
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="mt-3 flex items-center gap-2">
      {/* Pending feature */}
      <button className="focus:text-whtie flex items-center gap-2 rounded-full border border-gray-dark p-2 text-sm text-gray-light shadow outline-none transition-colors hover:bg-gray-dark hover:text-white focus-visible:border-brand/50 focus-visible:bg-gray-dark focus-visible:text-white focus-visible:ring-2 focus-visible:ring-brand/30">
        <BsListUl size={18} /> <span>Add To List</span>
      </button>

      <button
        aria-label={
          !accountState.watchlist ? "Add To Watchlist" : "Remove From Watchlist"
        }
        title={
          !accountState.watchlist ? "Add To Watchlist" : "Remove From Watchlist"
        }
        onClick={async (e) => {
          await handleWatchlist(type, mediaId, user.session_id || null);
          router.refresh();
        }}
        className={twMerge(
          "focus:text-whtie relative flex items-center gap-2 rounded-full border border-gray-dark p-2 text-sm text-gray-light shadow outline-none transition-colors hover:bg-gray-dark hover:text-white focus-visible:border-brand/50 focus-visible:bg-gray-dark focus-visible:text-white focus-visible:ring-2 focus-visible:ring-brand/30",
          accountState.watchlist && "bg-gray-dark text-brand hover:text-brand"
        )}
      >
        <BiTagAlt size={18} />
      </button>
    </div>
  );
};

export default MediaPageActions;
