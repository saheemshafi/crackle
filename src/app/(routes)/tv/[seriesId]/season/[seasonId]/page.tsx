import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { SeasonResponse } from "@/types/api-response";
import { SeriesDetails } from "@/types/tv";
import Image from "next/image";
import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";

interface SeasonPageProps {
  params: { seasonId?: string; seriesId?: string };
}

const SeasonPage = async ({ params }: SeasonPageProps) => {
  const tvDetails = await fetcher<SeriesDetails>(
    `${endpoints.tv.tvDetails}/${params.seriesId}`
  );
  const seasonDetails = await fetcher<SeasonResponse>(
    `${endpoints.tv.tvDetails}/${params.seriesId}/season/${params.seasonId}`
  );
  return (
    <Container>
      <GoBack link={`/tv/${params.seriesId}/overview`}>{tvDetails.name}</GoBack>
      <div className="mt-10">
        <div className="mb-6 space-y-3">
          <h1 className="relative  pb-3 font-work-sans text-2xl font-semibold after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
            {seasonDetails.name}{" "}
            <span className="font-normal text-gray-light">
              {" "}
              ({new Date(seasonDetails.air_date).getFullYear()})
            </span>
          </h1>
          <p className="max-w-2xl font-work-sans text-gray-light">
            {seasonDetails.overview}
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full shrink rounded-lg sm:w-auto sm:min-w-[250px]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}`}
              alt={seasonDetails.name}
              width={342}
              blurDataURL="/images/image-placeholder.jpeg"
              placeholder="blur"
              height={600}
              className="aspect-[2/3] w-full rounded-lg object-cover shadow-md sm:max-w-[250px]"
            />
          </div>
          <div className="flex-1">
            <h2 className="mb-4 font-work-sans text-xl font-medium">
              Episodes
            </h2>
            <ul className="scroll-design grid gap-y-2 rounded-lg border-gray-dark font-work-sans shadow sm:max-h-[500px] sm:overflow-y-auto sm:border sm:bg-gray-dark/30 sm:p-4">
              {seasonDetails.episodes.map((episode, i) => (
                <li key={episode.id}>
                  <Link
                    href={""}
                    title={`S${episode.season_number}Ep${i + 1} ${
                      episode.name
                    }`}
                    className="group flex justify-between items-center gap-2 rounded border border-gray-md/30 px-3 py-1.5 text-gray-light shadow transition-colors hover:text-white"
                  >
                    <div className="flex-1">
                      <span className="inline-block min-w-[20px] font-inter font-semibold text-gray-light group-hover:text-brand">
                        {i + 1}.
                      </span>{" "}
                      {episode.name}
                    </div>
                    <div className="sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-1 group-hover:translate-y-0 transition-all">
                    <CgDetailsMore size={20}/>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SeasonPage;
