import { fetcher } from "@/lib/api/fetcher";
import { getAuthUser } from "@/lib/api/getUser";
import { UserProfile } from "@/types/user";
import endpoints from "@/lib/constants/endpoints.json";
import { ApiResponse, GenreResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import MediaDetail from "@/components/MediaDetail";
import Image from "next/image";
import { Metadata } from "next";
import { options } from "@/lib/api/options";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Your Watchlist - Movies",
};
interface WatchlistPageProps {}

const WatchlistPage = async ({}: WatchlistPageProps) => {
  const session = await getAuthUser();
  const user = session?.user as UserProfile;
  const genres = await fetcher<GenreResponse>(endpoints.genres.movie);
  const movies = await fetcher<ApiResponse<Movie>>(
    `${endpoints.actions.watchlist}/movies?session_id=${user.session_id}`,
    undefined,
    { ...options, next: { revalidate: 5 } }
  );
  return (
    <div>
      {movies.results.length > 0 ? (
        movies.results.map((movie) => (
          // @ts-expect-error
          <MediaDetail
            key={movie.id}
            useHref
            media={{
              id: movie.id,
              original_language: movie.original_language,
              release_date: movie.release_date,
              title: movie.title,
              genres: genres.genres.filter((genre) =>
                movie.genre_ids.includes(genre.id)
              ),
              media_type: "movie",
            }}
            className="relative isolate my-4 gap-4 overflow-hidden sm:flex"
          >
            <div className="absolute inset-0 -z-[1] -my-3 -ml-3 shrink-0 sm:relative">
              <div className="z-1 absolute inset-0 bg-gradient-to-r from-gray-dark to-dark/95  sm:hidden"></div>
              <Image
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                width={300}
                height={300}
                className="hidden aspect-[2/3] sm:block sm:w-[100px]"
                alt={movie.title}
              />
              <Image
                src={`https://image.tmdb.org/t/p/w342/${movie.backdrop_path}`}
                width={300}
                height={300}
                className="aspect-video h-full w-full object-cover sm:hidden"
                alt={movie.title}
              />
            </div>
          </MediaDetail>
        ))
      ) : (
        <EmptyState
          title="Oops!"
          description="It seems you don't have any movies in watchlist."
          actions={[
            { title: "Home", path: "/" },
            { title: "Discover Movies", path: "/movies" },
          ]}
        />
      )}
    </div>
  );
};

export default WatchlistPage;
