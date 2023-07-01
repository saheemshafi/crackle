import Container from "@/components/Container";
import { fetcher } from "@/lib/api/fetcher";
import { getAuthUser } from "@/lib/api/getUser";
import { UserProfile } from "@/types/user";
import { signIn } from "next-auth/react";
import endpoints from "@/lib/constants/endpoints.json";
import { ApiResponse, GenreResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import MediaDetail from "@/components/MediaDetail";
import Image from "next/image";

interface WatchlistPageProps {}

const WatchlistPage = async ({}: WatchlistPageProps) => {
  const session = await getAuthUser();
  const user = session?.user as UserProfile;
  if (!user) {
    signIn();
    return;
  }
  const genres = await fetcher<GenreResponse>(endpoints.genres.movie);
  const movies = await fetcher<ApiResponse<Movie>>(
    `${endpoints.actions.watchlist}/movies?session_id=${user.session_id}`
  );
  return (
    <Container classes="sm:bg-gradient-to-t sm:from-gray-dark sm:to-dark">
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        My Watchlist
      </h1>
      <div>
        {movies.results.map((movie) => (
          // @ts-expect-error
          <MediaDetail
            key={movie.id}
            useSecondLevel
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
            className="my-4 sm:flex gap-4 relative isolate overflow-hidden"
          >
            <div className="-my-3 -ml-3 shrink-0 absolute inset-0 sm:relative -z-[1]">
              <div className="absolute sm:hidden inset-0 bg-gradient-to-r from-gray-dark to-dark/95  z-1"></div>
              <Image
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                width={300}
                height={300}
                className="aspect-[2/3] hidden sm:block sm:w-[100px]"
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
        ))}
      </div>
    </Container>
  );
};

export default WatchlistPage;
