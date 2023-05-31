import Container from "@/components/Container";
import MovieCard from "@/components/MediaCard";
import Slider from "@/components/Slider";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { DiscoverResponse, GenreResponse } from "@/types/api-response";
import { sortByGenre } from "@/lib/utlities/sorting";
import { Movie } from "@/types/movie";

interface HomeProps {}
const Home = async ({}: HomeProps) => {
  const genrePromise: Promise<GenreResponse> = fetch(endpoints.genres.movie, {
    ...options,
    next: { revalidate: 2592000 },
  }).then((res: Response) => res.json());
  const moviesPromise: Promise<DiscoverResponse<Movie>> = fetch(
    endpoints.discover.movies,
    {
      ...options,
      next: { revalidate: 2592000 },
    }
  ).then((res: Response) => res.json());

  const [movies, genres] = await Promise.all([moviesPromise, genrePromise]);
  const sortedMovies = sortByGenre<Movie>(movies.results, genres);
  return (
    <>
      {genres.genres.map((genre) =>
        sortedMovies[genre.name]?.length > 0 ? (
          <Container key={genre.id} id={genre.name}>
            <Slider title={genre.name}>
              {sortedMovies[genre.name]?.map((movie) => (
                <MovieCard key={movie.id} sliderItem media={movie} />
              ))}
            </Slider>
          </Container>
        ) : null
      )}
    </>
  );
};

export default Home;
