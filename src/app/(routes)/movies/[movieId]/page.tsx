import Image from "next/image";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "@/lib/api/options";
import { MovieDetails } from "@/types/movie";
import { BsDot } from "react-icons/bs";
import MediaPageActions from "@/components/MediaPageActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authentication/auth-options";
import { UserProfile } from "@/types/user";
import { MediaAccountState } from "@/types/api-response";

export const revalidate = 0;

interface MovieDetailPageProps {
  params: { movieId: string };
}

const MovieDetailPage = async ({ params }: MovieDetailPageProps) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserProfile;
  const response = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}`,
    options
  );
  const movieDetails: MovieDetails = await response.json();
  const accountStateResponse = await fetch(
    `${endpoints.movies.movieDetails}/${params.movieId}/account_states?session_id=${user.session_id}`,
    { ...options, next: { revalidate: 0 }, cache: "no-store" }
  );
  const accountState: MediaAccountState = await accountStateResponse.json();
  return (
    <>
      <section className="flex flex-col items-start gap-6 bg-gradient-to-t from-gray-dark to-dark p-5 text-white sm:flex-row">
        <div
          className="w-full sm:w-auto rounded-lg shrink"
          style={{
            background: `linear-gradient(to bottom left,#0e0f10f7,#121416),url(https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path})`,
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat"
          }}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
            alt={movieDetails.title}
            width={600}
            height={600}
            className="aspect-[2/3] w-full sm:max-w-[250px] rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="flex-1">
          <div className="rounded-md border border-gray-dark bg-dark p-3">
            <h1 className="font-work-sans text-xl font-semibold">
              {movieDetails.title}
              <span className="font-normal text-gray-light">
                {" "}
                ({new Date(movieDetails.release_date).getFullYear()})
              </span>
            </h1>
            <p className="mb-2 font-work-sans text-sm italic text-gray-light">
              {movieDetails.tagline}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-y-2 items-start sm:items-center text-sm">
              <span className="rounded border border-gray-md px-1 font-semibold uppercase text-gray-md">
                {movieDetails.original_language}
              </span>
              {movieDetails.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="ml-2 flex items-center font-normal text-white"
                >
                  <BsDot />
                  {genre.name}
                </span>
              ))}
              <span className="flex items-center text-gray-light">
                <BsDot />
                {Math.round(movieDetails.runtime / 60)}h{" "}
                {movieDetails.runtime % 60}m
              </span>
            </div>
            <MediaPageActions
              accountState={accountState}
              type={"movie"}
              mediaId={movieDetails.id}
            />
          </div>
          <div className="mt-3 rounded-md border border-gray-dark bg-dark p-3">
            <div>
              <h2 className="mb-2 font-work-sans text-lg font-medium">
                Overview
              </h2>
              <p className="font-work-sans text-gray-light">
                {movieDetails.overview}
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-md border border-gray-dark bg-dark p-3">
            <div>
              <h2 className="mb-2 font-work-sans text-lg font-medium">
                Production
              </h2>
              <div className="grid sm:grid-cols-2 gap-2 lg:grid-cols-3 md:gap-3">
                {movieDetails.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center gap-2 rounded bg-gray-dark p-2"
                  >
                    <div className="shrink-0 rounded p-1">
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                        width={100}
                        height={100}
                        alt={company.name}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <div className="overflow-x-hidden">
                      <p
                        title={company.name}
                        className="truncate font-work-sans text-sm font-medium leading-none"
                      >
                        {company.name}
                      </p>
                      <small className="text-gray-light">
                        {company.origin_country}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetailPage;
