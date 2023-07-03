import AsideLinks from "@/components/AsideLinks";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import GoBack from "@/components/GoBack";
import InfoCard from "@/components/InfoCard";
import Table from "@/components/Table";
import TableItem from "@/components/TableItem";
import AsideLinksTrigger from "@/components/ui/AsideLinksTrigger";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { CountryResponse, TvTranslationResponse } from "@/types/api-response";
import { SeriesDetails } from "@/types/tv";
import { Metadata } from "next";
import Image from "next/image";
import { IoLanguageSharp } from "react-icons/io5";

interface TranslationPageProps {
  params: { seriesId: string };
}

export const generateMetadata = async ({
  params,
}: TranslationPageProps): Promise<Metadata> => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );
  return {
    title: `${tvDetails.name} - Translations`,
    description: `Check translations of ${tvDetails.name} and it's overview in different languages`,
    openGraph: {
      title: `${tvDetails.name} - Translations`,
      description: `Check translations of ${tvDetails.name} and it's overview in different languages`,
      images: [`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`],
    },
  };
};

const TranslationPage = async ({ params }: TranslationPageProps) => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );
  const translations = await fetcher<TvTranslationResponse>(
    `${endpoints.tv.tvDetails}/${params.seriesId}/translations`
  );
  const regions = await fetcher<CountryResponse>(endpoints.providers.regions);

  return (
    <Container>
      <GoBack link={`/tv/${params.seriesId}/overview`}>{tvDetails.name}</GoBack>
      <div className="mt-10 flex gap-4">
        <AsideLinks
          regions={regions.results}
          link={`/tv/${params.seriesId}/overview/translations`}
          items={translations.translations.map(
            (translation) =>
              `${translation.english_name}-${translation.iso_639_1}`
          )}
          title={"Translations"}
        />
        <div className="flex-1">
          <div className="flex justify-between gap-2">
            <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
              Translations
            </h1>
            <AsideLinksTrigger>
              <IoLanguageSharp /> Languages
            </AsideLinksTrigger>
          </div>
          <div className="mt-3 grid gap-3">
            {translations.translations.length > 0 ? (
              translations.translations.map((translation) => (
                <InfoCard
                  key={`${translation.english_name}-${translation.iso_639_1}`}
                  id={`${translation.english_name}-${translation.iso_639_1}`}
                  title={
                    <>
                      <Image
                        src={`https://flagcdn.com/80x60/${translation.iso_3166_1.toLowerCase()}.png`}
                        width={100}
                        height={100}
                        alt="Translation"
                        className="inline aspect-video h-5 w-5 object-contain"
                      />{" "}
                      <span>{translation.english_name}</span>
                      <span className="ml-1 text-gray-light">
                        ({translation.iso_639_1})
                      </span>
                    </>
                  }
                >
                  {translation.data.name.length > 0 && (
                    <Table
                      head={
                        <tr>
                          <TableItem>Title</TableItem>
                          <TableItem>Tagline</TableItem>
                        </tr>
                      }
                      rows={
                        <tr>
                          <TableItem>{translation.data.name}</TableItem>
                          <TableItem>
                            <em>{translation.data.tagline}</em>
                          </TableItem>
                        </tr>
                      }
                    ></Table>
                  )}
                  {translation.data.overview.length > 0 && (
                    <div className="border-t border-t-gray-md/30 text-sm sm:text-base">
                      <h3 className="mb-2 border-b border-b-gray-md/30 bg-dark/20 p-1 text-gray-light">
                        Overview
                      </h3>
                      <p className="mb-3 line-clamp-4 leading-6 text-gray-light">
                        {translation.data.overview}
                      </p>
                    </div>
                  )}
                </InfoCard>
              ))
            ) : (
              <EmptyState
                title="No Translations!"
                description="There are no translations available for this series"
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TranslationPage;
