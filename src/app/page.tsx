import Container from "@/components/Container";
import MediaCard from "@/components/MediaCard";
import PersonCard from "@/components/PersonCard";
import Slider from "@/components/Slider";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import { Person } from "@/types/person";
import { Tv } from "@/types/tv";
import { AppendProps } from "@/types/type-helpers";

interface HomeProps {}
interface MediaType {
  media_type: "movie" | "tv" | "person";
}
const Home = async ({}: HomeProps) => {
  const trendingPromise = fetcher<
    ApiResponse<
      | AppendProps<Movie, MediaType>
      | AppendProps<Tv, MediaType>
      | AppendProps<Person, MediaType>
    >
  >(`${endpoints.trending.all}/week`);
  const trendingMoviesPromise = fetcher<ApiResponse<Movie>>(
    `${endpoints.trending.movies}/day`
  );
  const trendingSeriesPromise = fetcher<ApiResponse<Movie>>(
    `${endpoints.trending.tv}/day`
  );

  const trendingPeoplePromise = fetcher<ApiResponse<Person>>(
    `${endpoints.trending.people}/day`
  );

  const [all, movies, series, people] = await Promise.all([
    trendingPromise,
    trendingMoviesPromise,
    trendingSeriesPromise,
    trendingPeoplePromise,
  ]);

  return (
    <>
      <Container id="trending-all">
        <Slider
          title={
            <>
              <span>Trending</span>
              <span className="ml-2 inline-block rounded border border-gray-md/50 px-1.5 py-0.5 font-work-sans text-xs uppercase text-gray-light">
                All
              </span>
            </>
          }
        >
          {all.results.map((item) =>
            item.media_type == "movie" ? (
              <MediaCard media={item as Movie} key={item.id} />
            ) : item.media_type == "tv" ? (
              <MediaCard media={item as Tv} key={item.id} />
            ) : (
              <PersonCard person={item as Person} key={item.id} />
            )
          )}
        </Slider>
      </Container>

      <Container id="trending-movies">
        <Slider
          title={
            <>
              <span>Trending</span>
              <span className="ml-2 inline-block rounded border border-gray-md/50 px-1.5 py-0.5 font-work-sans text-xs uppercase text-gray-light">
                Movies
              </span>
            </>
          }
        >
          {movies.results.map((movie) => (
            <MediaCard key={movie.id} media={movie} />
          ))}
        </Slider>
      </Container>

      <Container id="trending-series">
        <Slider
          title={
            <>
              <span>Trending</span>
              <span className="ml-2 inline-block rounded border border-gray-md/50 px-1.5 py-0.5 font-work-sans text-xs uppercase text-gray-light">
                Series
              </span>
            </>
          }
        >
          {series.results.map((series) => (
            <MediaCard key={series.id} media={series} />
          ))}
        </Slider>
      </Container>

      <Container id="trending-people">
        <Slider
          title={
            <>
              <span>Trending</span>
              <span className="ml-2 inline-block rounded border border-gray-md/50 px-1.5 py-0.5 font-work-sans text-xs uppercase text-gray-light">
                People
              </span>
            </>
          }
        >
          {people.results.map((person) => (
            <div key={person.id} className="shrink-0 grow-0">
              <PersonCard key={person.id} person={person} />{""}
            </div>
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default Home;
