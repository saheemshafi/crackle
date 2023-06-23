import Container from "@/components/Container";
import MediaCard from "@/components/MediaCard";
import Slider from "@/components/Slider";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { sortByGenre } from "@/lib/utlities/sorting";
import { ApiResponse, GenreResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import { Tv } from "@/types/tv";

interface HomeProps {}
const Home = async ({}: HomeProps) => {
  const moviesPromise = fetcher<ApiResponse<Movie>>(endpoints.discover.movies);
  const seriesPromise = fetcher<ApiResponse<Tv>>(endpoints.discover.tv);
  const moviesGenrePromise = fetcher<GenreResponse>(endpoints.genres.movie);
  const seriesGenrePromise = fetcher<GenreResponse>(endpoints.genres.tv);

  const [movies, series, genres, seriesGenres] = await Promise.all([
    moviesPromise,
    seriesPromise,
    moviesGenrePromise,
    seriesGenrePromise,
  ]);

  const sortedMovies = sortByGenre(movies.results, genres);
  const sortedSeries = sortByGenre(series.results, seriesGenres);

  return (
    <>
      {genres.genres.map((genre) =>
        sortedMovies[genre.name]?.length > 0 ? (
          <Container key={genre.id} id={`movie-${genre.name.toLowerCase()}`}>
            <Slider
              title={
                <>
                  <span>{genre.name}</span>
                  <span className="ml-2 inline-block rounded border border-gray-md/50 px-1.5 py-0.5 font-work-sans text-xs uppercase text-gray-light">
                    Movies
                  </span>
                </>
              }
            >
              {sortedMovies[genre.name]?.map((movie) => (
                <MediaCard key={movie.id} sliderItem media={movie} />
              ))}
            </Slider>
          </Container>
        ) : null
      )}
      {seriesGenres.genres.map((genre) =>
        sortedSeries[genre.name]?.length > 0 ? (
          <Container key={genre.id} id={`series-${genre.name.toLowerCase()}`}>
            <Slider
              title={
                <>
                  <span>{genre.name}</span>
                  <span className="ml-2 inline-block rounded border border-gray-md/50 px-1.5 py-0.5 font-work-sans text-xs uppercase text-gray-light">
                    Series
                  </span>
                </>
              }
            >
              {sortedSeries[genre.name]?.map((series) => (
                <MediaCard key={series.id} sliderItem media={series} />
              ))}
            </Slider>
          </Container>
        ) : null
      )}
    </>
  );
};

export default Home;
