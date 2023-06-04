import Container from "@/components/Container";
import MediaCard from "@/components/MediaCard";
import { options } from "@/lib/api/options";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import endpoints from "@/lib/constants/endpoints.json"

interface NowPlayingPageProps { }

const NowPlayingPage = async ({ }: NowPlayingPageProps) => {
  const moviesPromise = (await fetch(endpoints.movies.nowPlaying, { ...options, next: { revalidate: 2592000 } })).json();
  const movies: ApiResponse<Movie> = await moviesPromise;
  return (
    <Container>
      <h1 className="text-2xl mb-6 font-medium pb-3 after:bg-brand after:rounded-md after:bottom-0 after:left-0 after:w-12 after:h-1 after:absolute relative">Now Playing</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {movies.results.map(movie => (<MediaCard key={movie.id} media={movie} />))}
      </div>
    </Container>
  );
};

export default NowPlayingPage;
