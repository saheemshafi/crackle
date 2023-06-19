import AsideLinks from "@/components/AsideLinks";
import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import ImageList from "@/components/ImageList";
import Loader from "@/components/Loader";
import AsideLinksTrigger from "@/components/ui/AsideLinksTrigger";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { LanguagesResponse } from "@/types/api-response";
import { MovieDetails } from "@/types/movie";
import { Suspense } from "react";

interface BackdropsPageProps {
  params: { movieId: string };
}

const BackdropsPage = async ({ params }: BackdropsPageProps) => {
  const movieDetails = await fetcher<MovieDetails>(
    `${endpoints.movies.movieDetails}/${params.movieId}`
  );

  return (
    <Container>
      <GoBack link={`/movies/${params.movieId}/overview`}>
        {movieDetails.original_title}
      </GoBack>
      <div className="mt-10">
        <div className="flex justify-between gap-2">
          <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
            Backdrops
          </h1>
        </div>
        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error server component */}
          <ImageList mediaId={params.movieId} />
        </Suspense>
      </div>
    </Container>
  );
};

export default BackdropsPage;
