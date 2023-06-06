import { options } from "@/lib/api/options";
import { ApiResponse } from "@/types/api-response";
import endpoints from "@/lib/constants/endpoints.json";
import { Tv } from "@/types/tv";
import Container from "@/components/Container";
import MediaCard from "@/components/MediaCard";
import Filterer from "@/components/Filterer";

interface TvPageProps {
  searchParams: {
    genres: string | undefined;
    sort: string | undefined;
    providers: string | undefined;
    region: string | undefined;
  };
}

const TvPage = async ({ searchParams }: TvPageProps) => {
  const seriesPromise = (
    await fetch(
      `${endpoints.discover.tv}&with_genres=${searchParams["genres"]}&sort_by=${
        searchParams["sort"] || "popularity.desc"
      }&watch_region=${searchParams["region"]}&with_watch_providers=${
        searchParams["providers"]
      }`,
      {
        ...options,
        next: { revalidate: 2592000 },
      }
    )
  ).json();
  const series: ApiResponse<Tv> = await seriesPromise;
  return (
    <Container>
      <div className="flex gap-4">
        <div className="flex-1">
          <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
            Tv Series
          </h1>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {series.results?.length > 0 &&
              series.results.map((series) => (
                <MediaCard key={series.id} media={series} />
              ))}
          </div>
        </div>
        <Filterer type="tv" />
      </div>
    </Container>
  );
};

export default TvPage;
