import Container from "@/components/Container";
import endpoints from "@/lib/constants/endpoints.json";
import InfoCard from "@/components/InfoCard";
import { CountryResponse, TvAltTitles } from "@/types/api-response";
import { Metadata } from "next";
import Image from "next/image";
import { getRegion } from "@/lib/helpers/format-helpers";
import AsideLinks from "@/components/AsideLinks";
import AsideLinksTrigger from "@/components/ui/AsideLinksTrigger";
import Table from "@/components/Table";
import TableItem from "@/components/TableItem";
import GoBack from "@/components/GoBack";
import { fetcher } from "@/lib/api/fetcher";
import { SeriesDetails } from "@/types/tv";
import EmptyState from "@/components/EmptyState";

export const generateMetadata = async ({
  params,
}: AltTitlesPageProps): Promise<Metadata> => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );

  return {
    title: `${tvDetails.name} - Alternative Titles`,
    description: `Alternative title associated with ${tvDetails.name} in different regions and languages`,
    openGraph: {
      title: `${tvDetails.name} - Alternative Titles`,
      description: `Alternative title associated with ${tvDetails.name} in different regions and languages`,
      images: [`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`],
    },
  };
};

interface AltTitlesPageProps {
  params: { seriesId: string };
}

const AltTitlesPage = async ({ params }: AltTitlesPageProps) => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );

  const altTitles = await fetcher<TvAltTitles>(
    `${endpoints.tv.tvDetails}/${params.seriesId}/alternative_titles`
  );
  const regions = await fetcher<CountryResponse>(endpoints.providers.regions);

  return (
    <Container>
      <GoBack link={`/tv/${params.seriesId}/overview`}>{tvDetails.name}</GoBack>
      <div className="mt-10 flex gap-4">
        <AsideLinks
          regions={regions.results}
          link={`/tv/${params.seriesId}/overview/alternate-titles`}
          items={altTitles.results.map((title) => title.iso_3166_1)}
          title={"Countries"}
        />
        <div className="flex-1">
          <div className="flex justify-between gap-2">
            <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
              Alternative Titles
            </h1>
            <AsideLinksTrigger />
          </div>
          {altTitles.results.length > 0 ? (
            <div className="mt-3 grid gap-3">
              {altTitles.results.map(async (title) => (
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
                  <Table
                    head={
                      <tr>
                        <TableItem className="w-1/2 sm:w-2/3">Title</TableItem>
                        <TableItem>Type</TableItem>
                      </tr>
                    }
                    rows={
                      <tr>
                        <TableItem>{title.title}</TableItem>
                        <TableItem>{title.type}</TableItem>
                      </tr>
                    }
                  />
                </InfoCard>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Alternate Titles!"
              description="There are no alternate titles present for this media"
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default AltTitlesPage;
