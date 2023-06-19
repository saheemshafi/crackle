import InfoCard from "@/components/InfoCard";
import { options } from "@/lib/api/options";
import { CountryResponse, ReleaseDateResponse } from "@/types/api-response";
import { MovieDetails } from "@/types/movie";
import endpoints from "@/lib/constants/endpoints.json";
import Container from "@/components/Container";
import { formatter } from "@/lib/helpers/date";
import { Metadata } from "next";
import Image from "next/image";
import { getRegion, getReleaseType } from "@/lib/helpers/format-helpers";
import AsideLinks from "@/components/AsideLinks";
import AsideLinksTrigger from "@/components/ui/AsideLinksTrigger";
import Table from "@/components/Table";
import TableItem from "@/components/TableItem";
import GoBack from "@/components/GoBack";
import { fetcher } from "@/lib/api/fetcher";

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
  const movieDetails = await fetcher<MovieDetails>(
    `${endpoints.movies.movieDetails}/${params.movieId}`
  );
  const regions = await fetcher<CountryResponse>(endpoints.providers.regions);
  const releaseDates = await fetcher<ReleaseDateResponse>(
    `${endpoints.movies.movieDetails}/${params.movieId}/release_dates`
  );

  return (
    <Container>
      <GoBack link={`/movies/${params.movieId}/overview`}>
        {movieDetails.title}
      </GoBack>
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
            {releaseDates.results.map((releaseDate) => (
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
                      {(
                        getRegion(regions.results, releaseDate.iso_3166_1) || ""
                      )?.length > 0
                        ? getRegion(regions.results, releaseDate.iso_3166_1)
                        : releaseDate.iso_3166_1}
                    </span>
                  </>
                }
              >
                <Table
                  head={
                    <tr>
                      <TableItem>Date</TableItem>
                      <TableItem>Certification</TableItem>
                      <TableItem>Type</TableItem>
                    </tr>
                  }
                  rows={
                    <tr>
                      <TableItem>
                        {formatter.format(
                          new Date(releaseDate.release_dates[0].release_date)
                        )}
                      </TableItem>
                      <TableItem>
                        {releaseDate.release_dates[0].certification}
                      </TableItem>
                      <TableItem>
                        {getReleaseType(releaseDate.release_dates[0].type)}
                      </TableItem>
                    </tr>
                  }
                ></Table>
              </InfoCard>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReleasesPage;
