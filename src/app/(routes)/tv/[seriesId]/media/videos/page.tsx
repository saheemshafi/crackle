import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import { fetcher } from "@/lib/api/fetcher";
import { SeriesDetails } from "@/types/tv";
import endpoints from "@/lib/constants/endpoints.json";
import { Metadata } from "next";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import VideoList from "@/components/VideoList";

interface VideosPageProps {
  params: { seriesId: string };
}

export const generateMetadata = async ({
  params,
}: VideosPageProps): Promise<Metadata> => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );

  return {
    title: `${tvDetails.name} - Official trailers, teasers and featurettes`,
    description: `Official trailers, teasers and featurettes from the movie ${tvDetails.name}`,
    openGraph: {
      title: `${tvDetails.name} - Official trailers, teasers and featurettes`,
      description: `Official trailers, teasers and featurettes from the movie ${tvDetails.name}`,
      images: [`https://image.tmdb.org/t/p/original${tvDetails.poster_path}`],
    },
  };
};

const VideosPage = async ({ params }: VideosPageProps) => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );

  return (
    <Container>
      <GoBack link={`/tv/${params.seriesId}/overview`}>{tvDetails.name}</GoBack>
      <div className="mt-10">
        <div>
          <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
            Videos
          </h1>
        </div>
        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error */}
          <VideoList mediaId={tvDetails.id} type="tv" />
        </Suspense>
      </div>
    </Container>
  );
};

export default VideosPage;
