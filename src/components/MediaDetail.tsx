import { HTMLAttributes } from "react";
import { BsDot } from "react-icons/bs";
import MediaPageActions from "./MediaPageActions";
import { MediaAccountState } from "@/types/api-response";
import { getAuthUser } from "@/lib/api/getUser";
import { fetcher } from "@/lib/api/fetcher";
import { UserProfile } from "@/types/user";
import endpoints from "@/lib/constants/endpoints.json";
import { Genre } from "@/types/genre";
import { twMerge } from "tailwind-merge";

interface MediaDetailProps {
  media: {
    id: number;
    title: string;
    release_date: Date;
    tagline?: string;
    original_language: string;
    runtime?: number;
    genres: Genre[];
    media_type: "tv" | "movie";
  };
  useSecondLevel?: boolean;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  children?: React.ReactNode;
}

const MediaDetail = async ({
  media,
  useSecondLevel,
  className = "",
  children,
}: MediaDetailProps) => {
  const session = await getAuthUser();
  const user = session?.user as UserProfile;
  const accountState = await fetcher<MediaAccountState>(
    `${
      media.media_type == "movie"
        ? endpoints.movies.movieDetails
        : endpoints.tv.tvDetails
    }/${media.id}/account_states?session_id=${user?.session_id}`,
    "",
    { next: { revalidate: 0 } }
  );
  return (
    <div
      className={twMerge(
        "rounded-md border border-gray-dark bg-dark p-3",
        className
      )}
    >
      {children}
      <div>
        {" "}
        {useSecondLevel ? (
          <h2 className="font-work-sans text-xl font-semibold">
            {" "}
            {media.title}
            <span className="font-normal text-gray-light">
              {" "}
              ({new Date(media.release_date).getFullYear()})
            </span>
          </h2>
        ) : (
          <h1 className="font-work-sans text-xl font-semibold">
            {media.title}
            <span className="font-normal text-gray-light">
              {" "}
              ({new Date(media.release_date).getFullYear()})
            </span>
          </h1>
        )}
        <p className="mb-2 font-work-sans text-sm italic text-gray-light">
          {media.tagline}
        </p>
        <div className="flex flex-col flex-wrap items-start gap-y-2 text-sm sm:flex-row sm:items-center">
          <span className="rounded border border-gray-md px-1 font-semibold uppercase text-gray-md">
            {media.original_language}
          </span>
          {media.genres.map((genre) => (
            <span
              key={genre.id}
              className="ml-2 flex items-center font-normal text-white"
            >
              <BsDot />
              {genre.name}
            </span>
          ))}
          {media.runtime && (
            <span className="flex items-center text-gray-light">
              <BsDot />
              {Math.round(media.runtime / 60)}h {media.runtime % 60}m
            </span>
          )}
        </div>
        <MediaPageActions
          accountState={accountState}
          type={media.media_type}
          mediaId={media.id}
        />
      </div>
    </div>
  );
};

export default MediaDetail;
