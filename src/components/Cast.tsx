import endpoints from "@/lib/constants/endpoints.json";
import { CastResponse } from "@/types/api-response";
import Image from "next/image";
import Link from "next/link";
import { fetcher } from "@/lib/api/fetcher";

interface CastProps {
  mediaId: number;
  type: "movie" | "tv";
}

const Cast = async ({ mediaId, type }: CastProps) => {
  const castResponse = await fetcher<CastResponse>(
    `${
      type == "movie" ? endpoints.movies.movieDetails : endpoints.tv.tvDetails
    }/${mediaId}/credits`
  );

  return (
    <>
      <section className="mb-6 scroll-mt-12" id="cast">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {castResponse.cast.map((cast) => (
            <div
              key={`${cast.id}-${cast.cast_id}`}
              className="flex gap-2 rounded bg-gray-dark p-2"
            >
              <div className="aspect-square h-12 w-12">
                <Image
                  src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                  alt={cast.name}
                  width={180}
                  height={180}
                  className="h-full w-full rounded object-cover text-xs"
                />
              </div>
              <div className="overflow-x-hidden">
                <Link
                  href={`/people/${cast.id}`}
                  className="block truncate font-work-sans text-sm font-medium hover:underline"
                >
                  {cast.name}
                </Link>
                <small
                  className="block truncate text-gray-light"
                  title={cast.character}
                >
                  {cast.character}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="crew" className="scroll-mt-10">
        <h2 className="mb-2 font-work-sans text-lg font-medium">Crew</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {castResponse.crew.map((cast) => (
            <div
              key={`${cast.id}-${cast.job}`}
              className="flex gap-2 rounded bg-gray-dark p-2"
            >
              <div className="aspect-square h-12 w-12">
                <Image
                  src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                  alt={cast.name}
                  width={180}
                  height={180}
                  className="h-full w-full rounded object-cover text-xs"
                />
              </div>
              <div className="overflow-x-hidden">
                <Link
                  href={`/people/${cast.id}`}
                  className="block truncate font-work-sans text-sm font-medium hover:underline"
                >
                  {cast.name}
                </Link>
                <small
                  className="block truncate text-gray-light"
                  title={cast.job}
                >
                  {cast.job}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Cast;
