import { options } from "@/lib/api/options";
import { ApiResponse } from "@/types/api-response";
import endpoints from "@/lib/constants/endpoints.json";
import { Tv } from "@/types/tv";
import Container from "@/components/Container";
import MediaCard from "@/components/MediaCard";
import { Suspense } from "react";
import Skeleton from "@/components/ui/Skeleton";

interface TvPageProps {}

const TvPage = async ({}: TvPageProps) => {
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
        Tv Series
      </h1>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
        {series.results.map((series) => (
          <Suspense
            key={series.id}
            fallback={
              <div
                data-slider-item="true"
                className="min-h-[300px] overflow-hidden rounded-md bg-gray-dark"
              >
                <Skeleton className="h-[80%] rounded-sm" />
                <div className="p-2">
                  <Skeleton />
                  <div className="mt-2">
                    <Skeleton className="w-1/2 rounded-sm" />
                  </div>
                </div>
              </div>
            }
          >
            <MediaCard key={series.id} media={series} />
          </Suspense>
        ))}
      </div>
    </Container>
  );
};

export default TvPage;
