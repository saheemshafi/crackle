import { Suspense } from "react";
import Cast from "@/components/Cast";
import endpoints from "@/lib/constants/endpoints.json";
import Container from "@/components/Container";
import { Metadata } from "next";
import GoBack from "@/components/GoBack";
import { fetcher } from "@/lib/api/fetcher";
import Loader from "@/components/Loader";
import { SeriesDetails } from "@/types/tv";

export const generateMetadata = async ({
  params,
}: CastPageProps): Promise<Metadata> => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );
  return {
    title: `Cast And Crew of ${tvDetails.name}`,
    description: `People who have worked on bringing ${tvDetails.name} to life`,
    openGraph: {
      title: `Cast And Crew of ${tvDetails.name}`,
      description: `People who have worked on bringing ${tvDetails.name} to life`,
      images:[`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`]
    },
  };
};
interface CastPageProps {
  params: { seriesId: number };
}

const CastPage = async ({ params }: CastPageProps) => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );

  return (
    <Container>
      <GoBack link={`/tv/${params.seriesId}/overview`}>
        {tvDetails.name}
      </GoBack>
      <div className="mt-10 rounded-md">
        <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
          Cast & Crew
        </h1>
        <Suspense fallback={<Loader />}>
          {/* @ts-ignore-error */}
          <Cast mediaId={params.seriesId} type={"tv"} />
        </Suspense>
      </div>
    </Container>
  );
};

export default CastPage;
