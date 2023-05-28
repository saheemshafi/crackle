import Container from "@/components/Container";
import MovieCard from "@/components/MediaCard";
import Slider from "@/components/Slider";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { GenreResponse } from "@/types/api-response";
import { sortByGenre } from "@/lib/utlities/sorting";
import { Movie } from "@/types/movie";
import { fetchEndpoints } from "@/lib/utlities/fetching";

const DAYS_TO_REVALIDATE = 30 * (24 * Math.pow(60, 2));
export const revalidate = DAYS_TO_REVALIDATE;
interface HomeProps {}
const Home = async ({}: HomeProps) => {
  const genres: GenreResponse = await (
    await fetch(endpoints.genres.movie, {
      ...options,
      next: { revalidate: false },
    })
  ).json();
  const movies: Movie[] = await fetchEndpoints<Movie>("movie", 100);

  const sortedMovies = sortByGenre<Movie>(movies, genres);
  return (
    <>
      {genres.genres.map((genre) =>
        sortedMovies[genre.name]?.length > 0 ? (
          <Container key={genre.id} id={genre.name} classes="py-2">
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

