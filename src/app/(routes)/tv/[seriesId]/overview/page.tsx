import Container from "@/components/Container";
import MediaDetail from "@/components/MediaDetail";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { formatter } from "@/lib/helpers/date";
import { VideosResponse } from "@/types/api-response";
import { SeriesDetails } from "@/types/tv";
import { AppendProps } from "@/types/type-helpers";
import { Type as VideoType } from "@/types/videos";
import Image from "next/image";
import Link from "next/link";
import { BsPlayCircle } from "react-icons/bs";

interface TvOverviewPageProps {
  params: { seriesId: string };
}

const TvOverviewPage = async ({ params }: TvOverviewPageProps) => {
  const seriesDetails = await fetcher<
    AppendProps<SeriesDetails, { videos: VideosResponse }>
  >(`${endpoints.tv.tvDetails}/${params.seriesId}?append_to_response=videos`);

  const videos = seriesDetails.videos.results;

  return (
    <Container classes="flex flex-col items-start gap-6 bg-gradient-to-t from-gray-dark to-dark sm:flex-row">
      <div>
        <div
          className="w-full shrink rounded-lg sm:w-auto sm:min-w-[250px]"
          style={{
            background: `linear-gradient(to bottom left,#0e0f10f7,#121416),url(https://image.tmdb.org/t/p/w780${seriesDetails.backdrop_path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${seriesDetails.poster_path}`}
            alt={seriesDetails.name}
            width={342}
            blurDataURL="/images/image-placeholder.jpeg"
            placeholder="blur"
            height={600}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md sm:max-w-[250px]"
          />
        </div>
        {videos.find((video) => video.type == VideoType.Trailer)?.key ? (
          <div className="mt-4">
            <Link
              href={`/videos?videoId=${
                videos.find((video) => video.type == VideoType.Trailer)?.key
              }`}
              className="button tmdb"
            >
              <BsPlayCircle size={16} /> <span>Play Trailer</span>
            </Link>
          </div>
        ) : null}
      </div>
      <div className="flex-1">
        {/* @ts-expect-error */}
        <MediaDetail
          media={{
            id: seriesDetails.id,
            title: seriesDetails.name,
            tagline: seriesDetails.tagline,
            genres: seriesDetails.genres,
            original_language: seriesDetails.original_language,
            release_date: seriesDetails.first_air_date,
            runtime: seriesDetails.episode_run_time[0],
            media_type: "tv",
          }}
        />
        <div className="mt-3 rounded-md border border-gray-dark bg-dark p-3">
          <div>
            <h2 className="mb-2 font-work-sans text-lg font-medium">
              Overview
            </h2>
            <p className="font-work-sans text-gray-light">
              {seriesDetails.overview}
            </p>
          </div>
        </div>
        <div className="mt-3 rounded-md border border-gray-dark bg-dark p-3">
          <div>
            <h2 className="mb-2 font-work-sans text-lg font-medium">Seasons</h2>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {seriesDetails.seasons.map((season) => (
                <div key={season.id}>
                  <Link
                    href={`/tv/${params.seriesId}/season/${season.season_number}`}
                    aria-label={season.name}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                      alt={season.name}
                      width={342}
                      blurDataURL="/images/image-placeholder.jpeg"
                      placeholder="blur"
                      height={600}
                      className="aspect-[2/3] w-full rounded-lg object-cover shadow-md sm:max-w-[250px]"
                    />
                  </Link>
                  <div className="mt-1 w-full px-1 py-2">
                    <Link
                      className="block outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50"
                      href={`/tv/${params.seriesId}/season/${season.season_number}`}
                    >
                      <p className="font-work-sans text-sm font-semibold leading-snug hover:text-gray-200">
                        {season.name}
                      </p>
                    </Link>
                    <small className="-mt-1 text-sm text-gray-light">
                      {season.air_date &&
                        formatter.format(new Date(season.air_date))}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-md border border-gray-dark bg-dark p-3">
          <div>
            <h2 className="mb-2 font-work-sans text-lg font-medium">
              Production
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-3">
              {seriesDetails.production_companies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center gap-2 rounded bg-gray-dark p-2"
                >
                  <div className="shrink-0 rounded p-1">
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                      width={100}
                      height={100}
                      alt={company.name}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div className="overflow-x-hidden">
                    <p
                      title={company.name}
                      className="truncate font-work-sans text-sm font-medium leading-none"
                    >
                      {company.name}
                    </p>
                    <small className="text-gray-light">
                      {company.origin_country}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-md border border-gray-dark bg-dark p-3">
          <div>
            <h2 className="mb-2 font-work-sans text-lg font-medium">
              Networks
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-3">
              {seriesDetails.networks.map((network) => (
                <div
                  key={network.id}
                  className="flex items-center gap-2 rounded bg-gray-dark p-2"
                >
                  <div className="shrink-0 rounded p-1">
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                      width={100}
                      height={100}
                      alt={network.name}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div className="overflow-x-hidden">
                    <p
                      title={network.name}
                      className="truncate font-work-sans text-sm font-medium leading-none"
                    >
                      {network.name}
                    </p>
                    <small className="text-gray-light">
                      {network.origin_country}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TvOverviewPage;
