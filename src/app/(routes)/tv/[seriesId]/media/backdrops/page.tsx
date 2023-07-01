import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import ImageList from "@/components/ImageList";
import Loader from "@/components/Loader";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { MovieDetails } from "@/types/movie";
import { SeriesDetails } from "@/types/tv";
import { Metadata } from "next";
import { Suspense } from "react";

interface BackdropsPageProps {
  params: { seriesId: string };
}

export const generateMetadata = async ({
  params,
}: BackdropsPageProps): Promise<Metadata> => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );
  return {
    title: `4k Background Images - ${tvDetails.name}`,
    description: `Download 4k images from ${tvDetails.name}`,
    openGraph: {
      title: `4k Background Images - ${tvDetails.name}`,
      description: `Download 4k images from ${tvDetails.name}`,
      images: [`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`],
    },
  };
};

const BackdropsPage = async ({ params }: BackdropsPageProps) => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );

  return (
    <Container>
      <GoBack link={`/tv/${params.seriesId}/overview`}>{tvDetails.name}</GoBack>
      <div className="mt-10">
        <div className="flex justify-between gap-2">
          <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
            Backdrops
          </h1>
        </div>
        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error server component */}
          <ImageList mediaId={params.seriesId} type="tv" />
        </Suspense>
      </div>
    </Container>
  );
};

export default BackdropsPage;
