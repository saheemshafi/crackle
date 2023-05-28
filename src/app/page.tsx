import Container from "@/components/Container";
import MovieCard from "@/components/MovieCard";
import Slider from "@/components/Slider";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { MovieResponse, GenreResponse } from "@/types/api-response";
import { sortMoviesByGenre } from "@/lib/utlities/sorting";
import { Movie } from "@/types/movie";

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
  // const movies: MovieResponse = await (
  //   await fetch(endpoints.discover.movies, options)
  // ).json();
  const movies: Movie[] = await fetchMovieEndpoints(50);

  const sortedMovies = sortMoviesByGenre(movies, genres);
  return (
    <>
      {genres.genres.map((genre) =>
        sortedMovies[genre.name]?.length > 0 ? (
          <Container key={genre.id} id={genre.name} classes="py-2">
            <Slider title={genre.name}>
              {sortedMovies[genre.name]?.map((movie) => (
                <MovieCard key={movie.id} sliderItem movie={movie} />
              ))}
            </Slider>
          </Container>
        ) : null
      )}
    </>
  );
};

export default Home;

async function fetchMovieEndpoints(limit: number): Promise<Movie[]> {
  const requests = [
    (
      await fetch(endpoints.discover.movies, {
        ...options,
        next: { revalidate: 86400 },
      })
    ).json(),
  ];
  for (let i = 0; i < limit; i++) {
    if (i == 0) continue;
    requests.push(
      (await fetch(`${endpoints.discover.movies}&page=${i}`, options)).json()
    );
  }
  const data: any[] = await Promise.all(requests);
  return data.flatMap((data) => (data as MovieResponse).results);
}
