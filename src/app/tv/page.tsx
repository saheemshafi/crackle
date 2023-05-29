import { options } from "@/lib/api/options";
import { fetchEndpoints } from "@/lib/utlities/fetching";
import { GenreResponse } from "@/types/api-response";
import endpoints from "@/lib/constants/endpoints.json";
import { Tv } from "@/types/tv";
import { sortByGenre } from "@/lib/utlities/sorting";
import MovieCard from "@/components/MediaCard";
import Slider from "@/components/Slider";
import Container from "@/components/Container";
import { Suspense } from "react";

export const revalidate = 2592000;
interface TvPageProps {}

const TvPage = async ({}: TvPageProps) => {
  const genres: GenreResponse = await (
    await fetch(endpoints.genres.tv, {
      ...options,
      next: { revalidate: false },
    })
  ).json();
  const tvSeries: Tv[] = await fetchEndpoints<Tv>("tv", 100);
  const sortedSeries = sortByGenre<Tv>(tvSeries, genres);
  return (
    <>
      {genres.genres.map((genre) =>
        sortedSeries[genre.name]?.length > 0 ? (
          <Container key={genre.id} id={genre.name} classes="py-2">
            <Suspense
              fallback={<div className="text-3xl">Hi i am under the water</div>}
            ></Suspense>
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
