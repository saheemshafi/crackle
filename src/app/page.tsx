import Container from "@/components/Container";
import MediaCard from "@/components/MediaCard";
import Slider from "@/components/Slider";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { ApiResponse, GenreResponse } from "@/types/api-response";
import { sortByGenre } from "@/lib/utlities/sorting";
import { Movie } from "@/types/movie";
import { Tv } from "@/types/tv";

interface HomeProps {}
const Home = async ({}: HomeProps) => {
  const genrePromise: Promise<GenreResponse> = fetch(endpoints.genres.movie, {
    ...options,
    next: { revalidate: 2592000 },
  }).then((res: Response) => res.json());
  const tvGenrePromise: Promise<GenreResponse> = fetch(endpoints.genres.tv, {
    ...options,
    next: { revalidate: 2592000 },
  }).then((res: Response) => res.json());
  const moviesPromise: Promise<ApiResponse<Movie>> = fetch(
    endpoints.discover.movies,
    {
      ...options,
      next: { revalidate: 2592000 },
    }
  ).then((res: Response) => res.json());

  const seriesPromise: Promise<ApiResponse<Tv>> = fetch(endpoints.discover.tv, {
    ...options,
    next: { revalidate: 2592000 },
  }).then((res: Response) => res.json());

  const [movies, series, genres, tvGenres] = await Promise.all([
    moviesPromise,
    seriesPromise,
    genrePromise,
    tvGenrePromise,
  ]);

  const sortedMovies = sortByGenre(movies.results, genres);
  const sortedSeries = sortByGenre(series.results, tvGenres);
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
      {tvGenres.genres.map((genre) =>
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
