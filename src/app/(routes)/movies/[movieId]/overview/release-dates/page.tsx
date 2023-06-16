import InfoCard from "@/components/InfoCard";
import { options } from "@/lib/api/options";
import {
  CountryResponse,
  ReleaseDateResponse,
  ReleaseType,
} from "@/types/api-response";
import { MovieDetails } from "@/types/movie";
import Link from "next/link";
import endpoints from "@/lib/constants/endpoints.json";
import { BiArrowBack } from "react-icons/bi";
import Container from "@/components/Container";
import { formatter } from "@/lib/helpers/date";
import { Metadata } from "next";

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
  const regionReponse = await fetch(`${endpoints.providers.regions}`, options);
  const movieDetails: MovieDetails = await response.json();
  const altTitles: ReleaseDateResponse = await releaseDateResponse.json();
  const regions: CountryResponse = await regionReponse.json();
  const getReleaseType = (type: ReleaseType): string => {
    let typeInString = "";
    switch (type) {
      case ReleaseType.Digital:
        typeInString = "Digital";
        break;
      case ReleaseType.Physical:
        typeInString = "Physical";
        break;
      case ReleaseType.Premiere:
        typeInString = "Premiere";
        break;
      case ReleaseType.Theatrical:
        typeInString = "Theatrical";
        break;
      case ReleaseType.Theatrical_Limited:
        typeInString = "Theatrical(limited)";
        break;
      case ReleaseType.Tv:
        typeInString = "Tv";
        break;
    }
    return typeInString;
  };
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
          Release Dates
        </h1>
        <div className="mt-3 grid gap-3 sm:grid-cols-1 md:grid-cols-2">
          {altTitles.results.map((releaseDate) => (
            <InfoCard
              key={releaseDate.iso_3166_1}
              id={releaseDate.iso_3166_1}
              title={
                regions.results.find(
                  (region) => region.iso_3166_1 == releaseDate.iso_3166_1
                )?.english_name || ""
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
    </Container>
  );
};

export default ReleasesPage;
