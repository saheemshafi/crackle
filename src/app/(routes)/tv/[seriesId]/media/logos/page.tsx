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

interface LogosPageProps {
  params: { seriesId: string };
}

export const generateMetadata = async ({
  params,
}: LogosPageProps): Promise<Metadata> => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );
  return {
    title: `${tvDetails.name} - Official Logos`,
    description: `See or download logos in png format for ${tvDetails.name}`,
    openGraph: {
      title: `${tvDetails.name} - Official Logos`,
      description: `See or download logos in png format for ${tvDetails.name}`,
      images:[`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`]
    },
  };
};

const LogosPage = async ({ params }: LogosPageProps) => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );

  return (
    <Container>
      <GoBack link={`/tv/${params.seriesId}/overview`}>
        {tvDetails.name}
      </GoBack>
      <div className="mt-10">
        <div className="flex justify-between gap-2">
          <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
            Logos
          </h1>
        </div>
        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error server component */}
          <ImageList mediaId={params.seriesId} map="logos" type="tv"/>
        </Suspense>
      </div>
    </Container>
  );
};

export default LogosPage;
