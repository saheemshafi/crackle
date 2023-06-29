import "@/app/globals.css";
import MediaPageHeader from "@/components/MediaPageHeader";
import { options } from "@/lib/api/options";
import endpoints from "@/lib/constants/endpoints.json";
import { SeriesDetails } from "@/types/tv";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { seriesId: string };
}): Promise<Metadata> => {
  const response = await fetch(
    `${endpoints.tv.tvDetails}/${params.seriesId}`,
    options
  );
  const tvDetails: SeriesDetails = await response.json();
  const genres = tvDetails.genres.map((genre) => genre.name);

  return {
    title: tvDetails.name,
    description: tvDetails.overview,
    keywords: genres,
    openGraph: {
      title: tvDetails.name,
      description: tvDetails.overview,
      type: "article",
      tags: genres,
      images: [`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`],
    },
  };
};

export default async function MoviePageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { seriesId: string };
}) {
  const response = await fetch(
    `${endpoints.tv.tvDetails}/${params.seriesId}`,
    options
  );
  const tvDetails: SeriesDetails = await response.json();

  return (
    <>
      <MediaPageHeader media={tvDetails} type="tv"/>
      {children}
    </>
  );
}
