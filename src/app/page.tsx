import Container from "@/components/Container";
import MovieCard from "@/components/MediaCard";
import Slider from "@/components/Slider";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { DiscoverResponse, GenreResponse } from "@/types/api-response";
import { sortByGenre } from "@/lib/utlities/sorting";
import { Movie } from "@/types/movie";
import { fetchEndpoints } from "@/lib/utlities/fetching";

interface HomeProps {}
const Home = async ({}: HomeProps) => {
  const genreResponse: Response = await fetch(endpoints.genres.movie, {
    ...options,
    next: { revalidate: 2592000 },
  });
  const genres: GenreResponse = await genreResponse.json();
  const moviesResponse: Response = await fetch(endpoints.discover.movies, {
    ...options,
    next: { revalidate: 2592000 },
  });
  const movies: DiscoverResponse<Movie> = await moviesResponse.json();
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
