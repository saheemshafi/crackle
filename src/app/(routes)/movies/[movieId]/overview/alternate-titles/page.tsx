import Container from "@/components/Container";
import Link from "next/link";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { MovieDetails } from "@/types/movie";
import InfoCard from "@/components/InfoCard";
import { AltTilesResponse, CountryResponse } from "@/types/api-response";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: AltTitlesPageProps): Promise<Metadata> => {
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const movieDetails: MovieDetails = await response.json();
  return {
    title: `${movieDetails.title} - Alternative Titles`,
  };
};
interface AltTitlesPageProps {
  params: { movieId: string };
}

const AltTitlesPage = async ({ params }: AltTitlesPageProps) => {
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const altTitlesResponse = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}/alternative_titles`,
    options
  );
  const regionReponse = await fetch(`${endpoints.providers.regions}`, options);
  const movieDetails: MovieDetails = await response.json();
  const altTitles: AltTilesResponse = await altTitlesResponse.json();
  const regions: CountryResponse = await regionReponse.json();
  return (
    <Container>
      <div>
        <Link
          href={`/movies/${params.movieId}/overview`}
          className="flex w-fit items-center gap-2 rounded border border-gray-dark bg-gradient-to-r from-gray-dark to-dark px-3 py-1 font-medium transition-colors hover:border-gray-md/30 focus-visible:border-gray-md/30"
        >
          <BiArrowBack /> {movieDetails.original_title}
        </Link>
      </div>
      <div className="mt-3">
        <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
          Alternative Titles
        </h1>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {altTitles.titles.map((title) => (
            <InfoCard
              key={title.iso_3166_1}
              id={title.iso_3166_1}
              title={
                regions.results.find(
                  (region) => region.iso_3166_1 == title.iso_3166_1
                )?.english_name || ""
              }
            >
              <table className="w-full rounded-md">
                <thead className="border-b border-gray-md/30 bg-dark/20 text-gray-light">
                  <tr>
                    <td className="w-1/2  p-1 sm:w-2/3">Title</td>
                    <td className="p-1">Type</td>
                  </tr>
                </thead>
                <tbody className="font-work-sans">
                  <tr>
                    <td className="p-1">{title.title}</td>
                    <td className="p-1">{title.type}</td>
                  </tr>
                </tbody>
              </table>
            </InfoCard>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AltTitlesPage;
