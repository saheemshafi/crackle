import Container from "@/components/Container";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { MovieDetails } from "@/types/movie";
import InfoCard from "@/components/InfoCard";
import { AltTilesResponse, CountryResponse } from "@/types/api-response";
import { Metadata } from "next";
import Image from "next/image";
import { getRegion } from "@/lib/helpers/format-helpers";
import AsideLinks from "@/components/AsideLinks";
import { Suspense } from "react";
import AsideLinksTrigger from "@/components/ui/AsideLinksTrigger";

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
  const movieDetails: MovieDetails = await response.json();
  const altTitles: AltTilesResponse = await altTitlesResponse.json();
  const regionResponse = await fetch(`${endpoints.providers.regions}`, options);
  const regions: CountryResponse = await regionResponse.json();

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
      <div className="mt-10 flex gap-4">
        <AsideLinks
          regions={regions.results}
          link={`/movies/${params.movieId}/overview/alternate-titles`}
          items={altTitles.titles.map((title) => title.iso_3166_1)}
          title={"Countries"}
        />
        <div className="flex-1">
          <div className="flex justify-between gap-2">
            <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
              Alternative Titles
            </h1>
            <AsideLinksTrigger />
          </div>
          <div className="mt-3 grid gap-3">
            {altTitles.titles.map(async (title) => (
              <InfoCard
                key={title.iso_3166_1}
                id={title.iso_3166_1}
                title={
                  <>
                    <Image
                      src={`https://flagcdn.com/80x60/${title.iso_3166_1.toLowerCase()}.png`}
                      width={100}
                      height={100}
                      alt="Release Date"
                      className="inline aspect-video h-5 w-5 object-contain"
                    />{" "}
                    <span>
                      {(getRegion(regions.results, title.iso_3166_1) || "")
                        .length > 0
                        ? getRegion(regions.results, title.iso_3166_1)
                        : title.iso_3166_1}
                    </span>
                  </>
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
      </div>
    </Container>
  );
};

export default AltTitlesPage;
