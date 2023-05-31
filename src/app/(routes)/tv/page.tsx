import { options } from "@/lib/api/options";
import { DiscoverResponse, GenreResponse } from "@/types/api-response";
import endpoints from "@/lib/constants/endpoints.json";
import { Tv } from "@/types/tv";
import { sortByGenre } from "@/lib/utlities/sorting";
import MovieCard from "@/components/MediaCard";
import Slider from "@/components/Slider";
import Container from "@/components/Container";

interface TvPageProps {}

const TvPage = async ({}: TvPageProps) => {
  await new Promise(res=>{
    setTimeout(() => {
      res("hello")
    }, 4000);
  })
  const genrePromise: Promise<GenreResponse> = fetch(endpoints.genres.movie, {
    ...options,
    next: { revalidate: 2592000 },
  }).then((res: Response) => res.json());
  const tvSeriesPromise: Promise<DiscoverResponse<Tv>> = fetch(
    endpoints.discover.tv,
    {
      ...options,
      next: { revalidate: 2592000 },
    }
  ).then((res: Response) => res.json());

  const [tvSeries, genres] = await Promise.all([tvSeriesPromise, genrePromise]);
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
