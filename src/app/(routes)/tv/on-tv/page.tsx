import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import MediaCard from "@/components/MediaCard";
import Paginate from "@/components/Paginate";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { SearchParams } from "@/lib/helpers/query-url";
import { ApiResponse } from "@/types/api-response";
import { Tv } from "@/types/tv";

interface OnTvPageProps {
  searchParams: { page: SearchParams["page"] };
}

const OnTvPage = async ({ searchParams }: OnTvPageProps) => {
  const seriesPromise = fetcher<ApiResponse<Tv>>(
    endpoints.tv.onTheAir,
    `?page=${searchParams["page"] || "1"}`
  );
  const series = await seriesPromise;

  return (
    <Container>
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        On Tv
      </h1>
      {series.results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
            {series.results.map((series) => (
              <MediaCard key={series.id} media={series} />
            ))}
          </div>
          <Paginate items={series} />
        </>
      ) : (
        <EmptyState
          title="Oops!"
          description="Seems we can't find any series currently on tv"
          actions={[{ title: "Discover Series", path: "/tv" }]}
        />
      )}
    </Container>
  );
};

export default OnTvPage;
