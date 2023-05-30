import { options } from "@/lib/api/options";
import { fetchEndpoints } from "@/lib/utlities/fetching";
import { DiscoverResponse, GenreResponse } from "@/types/api-response";
import endpoints from "@/lib/constants/endpoints.json";
import { Tv } from "@/types/tv";
import { sortByGenre } from "@/lib/utlities/sorting";
import MovieCard from "@/components/MediaCard";
import Slider from "@/components/Slider";
import Container from "@/components/Container";

interface TvPageProps {}

const TvPage = async ({}: TvPageProps) => {
  const genreResponse: Response = await fetch(endpoints.genres.tv, {
    ...options,
    next: { revalidate: false },
  });
  const genres: GenreResponse = await genreResponse.json();
  const tvSeriesResponse: Response = await fetch(endpoints.discover.tv, {
    ...options,
    next: { revalidate: 2592000 },
  });
  const tvSeries: DiscoverResponse<Tv> = await tvSeriesResponse.json();
  const sortedSeries = sortByGenre<Tv>(tvSeries.results, genres);
  return (
    <>
      {genres.genres.map((genre) =>
        sortedSeries[genre.name]?.length > 0 ? (
          <Container key={genre.id} id={genre.name} classes="py-2">
            <Slider title={genre.name}>
              {sortedSeries[genre.name]?.map((series) => (
                <MovieCard key={series.id} sliderItem media={series} />
              ))}
            </Slider>
          </Container>
        ) : null
      )}
    </>
  );
};

export default TvPage;
