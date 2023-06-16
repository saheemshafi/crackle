import InfoCard from "@/components/InfoCard";
import { options } from "@/lib/api/options";
import { CountryResponse, ReleaseDateResponse } from "@/types/api-response";
import { MovieDetails } from "@/types/movie";
import Link from "next/link";
import endpoints from "@/lib/constants/endpoints.json";
import { BiArrowBack } from "react-icons/bi";
import Container from "@/components/Container";
import { formatter } from "@/lib/helpers/date";
import { Metadata } from "next";
import Image from "next/image";
import { getRegion, getReleaseType } from "@/lib/helpers/format-helpers";
import AsideLinks from "@/components/AsideLinks";
import AsideLinksTrigger from "@/components/ui/AsideLinksTrigger";

export const generateMetadata = async ({
  params,
}: ReleasesPageProps): Promise<Metadata> => {
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const movieDetails: MovieDetails = await response.json();
  return {
    title: `Release Dates - ${movieDetails.title}`,
  };
};
interface ReleasesPageProps {
  params: { movieId: string };
}

const ReleasesPage = async ({ params }: ReleasesPageProps) => {
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const releaseDateResponse = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}/release_dates`,
    options
  );
  const regionResponse = await fetch(`${endpoints.providers.regions}`, options);
  const regions: CountryResponse = await regionResponse.json();

  const movieDetails: MovieDetails = await response.json();
  const releaseDates: ReleaseDateResponse = await releaseDateResponse.json();

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
          link={`/movies/${params.movieId}/overview/release-dates`}
          items={releaseDates.results.map(
            (releaseDate) => releaseDate.iso_3166_1
          )}
          title={"Countries"}
        />
        <div className="flex-1">
          <div className="flex justify-between gap-2">
            <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
              Release Dates
            </h1>
            <AsideLinksTrigger />
          </div>
          <div className="mt-3 grid gap-3">
            {releaseDates.results.map(async (releaseDate) => (
              <InfoCard
                key={releaseDate.iso_3166_1}
                id={releaseDate.iso_3166_1}
                title={
                  <>
                    <Image
                      src={`https://flagcdn.com/80x60/${releaseDate.iso_3166_1.toLowerCase()}.png`}
                      width={100}
                      height={100}
                      alt="Release Date"
                      className="inline aspect-video h-5 w-5 object-contain"
                    />{" "}
                    <span>
                      {getRegion(regions.results, releaseDate.iso_3166_1)}
                    </span>
                  </>
                }
              >
                <table className="w-full rounded-md text-sm sm:text-base">
                  <thead className="border-b border-gray-md/30 bg-dark/20 text-gray-light">
                    <tr>
                      <td className="p-1">Date</td>
                      <td className="p-1">Certification</td>
                      <td className="p-1">Type</td>
                    </tr>
                  </thead>
                  <tbody className="font-work-sans">
                    <tr>
                      <td className="p-1">
                        {formatter.format(
                          new Date(releaseDate.release_dates[0].release_date)
                        )}
                      </td>
                      <td className="p-1">
                        {releaseDate.release_dates[0].certification}
                      </td>
                      <td className="p-1">
                        {getReleaseType(releaseDate.release_dates[0].type)}
                      </td>
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

export default ReleasesPage;
