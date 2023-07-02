import { fetcher } from "@/lib/api/fetcher";
import { getAuthUser } from "@/lib/api/getUser";
import { GenreResponse, ApiResponse } from "@/types/api-response";
import { UserProfile } from "@/types/user";
import endpoints from "@/lib/constants/endpoints.json";
import { Tv } from "@/types/tv";
import Image from "next/image";
import MediaDetail from "@/components/MediaDetail";
import { Metadata } from "next";
import EmptyState from "@/components/EmptyState";
import { options } from "@/lib/api/options";

export const metadata: Metadata = {
  title: "Your Watchlist - Tv Series",
};

interface TvWatchlistPageProps {}

const TvWatchlistPage = async ({}: TvWatchlistPageProps) => {
  const session = await getAuthUser();
  const user = session?.user as UserProfile;
  const genres = await fetcher<GenreResponse>(endpoints.genres.tv);
  const series = await fetcher<ApiResponse<Tv>>(
    `${endpoints.actions.watchlist}/tv?session_id=${user.session_id}`,
    undefined,
    { ...options, next: { revalidate: 5 } }
  );
  
  return (
    <div>
      {series.results.length > 0 ? (
        series.results.map((series) => (
          // @ts-expect-error
          <MediaDetail
            key={series.id}
            useHref
            media={{
              id: series.id,
              original_language: series.original_language,
              release_date: series.first_air_date,
              title: series.name,
              genres: genres.genres.filter((genre) =>
                series.genre_ids.includes(genre.id)
              ),
              media_type: "tv",
            }}
            className="relative isolate my-4 gap-4 overflow-hidden sm:flex"
          >
            <div className="absolute inset-0 -z-[1] -my-3 -ml-3 shrink-0 sm:relative">
              <div className="z-1 absolute inset-0 bg-gradient-to-r from-gray-dark to-dark/95  sm:hidden"></div>
              <Image
                src={`https://image.tmdb.org/t/p/w342/${series.poster_path}`}
                width={300}
                height={300}
                className="hidden aspect-[2/3] sm:block sm:w-[100px]"
                alt={series.name}
              />
              <Image
                src={`https://image.tmdb.org/t/p/w342/${series.backdrop_path}`}
                width={300}
                height={300}
                className="aspect-video h-full w-full object-cover sm:hidden"
                alt={series.name}
              />
            </div>
          </MediaDetail>
        ))
      ) : (
        <EmptyState
          title="Oops!"
          description="It seems you don't have any series in watchlist."
          actions={[
            { title: "Home", path: "/" },
            { title: "Discover Series", path: "/tv" },
          ]}
        />
      )}
    </div>
  );
};

export default TvWatchlistPage;
