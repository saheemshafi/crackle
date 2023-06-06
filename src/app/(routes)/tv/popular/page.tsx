import Container from "@/components/Container";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { ApiResponse } from "@/types/api-response";
import { Tv } from "@/types/tv";
import MediaCard from "@/components/MediaCard";
interface PopularSeriesProps {}

const PopularSeriesPage = async ({}: PopularSeriesProps) => {
  const seriesPromise = (
    await fetch(endpoints.tv.popular, {
      ...options,
      next: { revalidate: 2592000 },
    })
  ).json();
  const series: ApiResponse<Tv> = await seriesPromise;
  return (
    <Container>
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        Popular Series
      </h1>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
        {series.results.map((series) => (
          <MediaCard key={series.id} media={series} />
        ))}
      </div>
    </Container>
  );
};

export default PopularSeriesPage;
