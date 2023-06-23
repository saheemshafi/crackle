import Container from "@/components/Container";
import Filterer from "@/components/Filterer";
import MediaCard from "@/components/MediaCard";
import Paginate from "@/components/Paginate";
import FilterTrigger from "@/components/ui/FilterTrigger";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { SearchParams, generateQueryString } from "@/lib/helpers/query-url";
import { ApiResponse } from "@/types/api-response";
import { Tv } from "@/types/tv";

interface TvPageProps {
  searchParams: SearchParams;
}

const TvPage = async ({ searchParams }: TvPageProps) => {
  const seriesPromise = fetcher<ApiResponse<Tv>>(
    endpoints.discover.tv,
    generateQueryString(searchParams)
  );
  const series = await seriesPromise;

  return (
    <Container>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex justify-between">
            <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
              Tv Series
            </h1>
            <FilterTrigger />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {series.results?.length > 0 &&
              series.results.map((series) => (
                <MediaCard key={series.id} media={series} />
              ))}
          </div>
        </div>
        <Filterer type="tv" />
      </div>
      <Paginate items={series} />
    </Container>
  );
};

export default TvPage;
