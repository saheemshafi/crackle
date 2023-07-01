import Image from "next/image";
import endpoints from "@/lib/constants/endpoints.json";
import { MovieDetails } from "@/types/movie";
import { BsDot, BsPlayCircle } from "react-icons/bs";
import MediaPageActions from "@/components/MediaPageActions";
import { UserProfile } from "@/types/user";
import { MediaAccountState, VideosResponse } from "@/types/api-response";
import Container from "@/components/Container";
import { getAuthUser } from "@/lib/api/getUser";
import { fetcher } from "@/lib/api/fetcher";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Type as VideoType } from "@/types/videos";
import { AppendProps } from "@/types/type-helpers";

export const revalidate = 0;

interface MovieDetailPageProps {
  params: { movieId: string };
}

const MovieDetailPage = async ({ params }: MovieDetailPageProps) => {
  let session, user, movieDetails, accountState, videos;
  try {
    session = await getAuthUser();
    user = session?.user as UserProfile;
    movieDetails = await fetcher<
      AppendProps<MovieDetails, { videos: VideosResponse }>
    >(
      `${endpoints.movies.movieDetails}/${params.movieId}?append_to_response=videos`
    );

    videos = movieDetails.videos.results;
    accountState = await fetcher<MediaAccountState>(
      `${endpoints.movies.movieDetails}/${params.movieId}/account_states?session_id=${user?.session_id}`,
      "",
      { next: { revalidate: 0 } }
    );
  } catch (err) {
    notFound();
  }

  return (
    <Container classes="flex flex-col items-start gap-6 bg-gradient-to-t from-gray-dark to-dark sm:flex-row">
      <div>
        <div
          className="w-full shrink rounded-lg sm:w-auto sm:min-w-[250px]"
          style={{
            background: `linear-gradient(to bottom left,#0e0f10f7,#121416),url(https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            width={342}
            blurDataURL="/images/image-placeholder.jpeg"
            placeholder="blur"
            height={600}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md sm:max-w-[250px]"
          />
        </div>
        <div className="mt-4">
          <Link
            href={`/videos?videoId=${
              videos.find((video) => video.type == VideoType.Trailer)?.key
            }`}
            className="button tmdb"
          >
            <BsPlayCircle size={16} /> <span>Play Trailer</span>
          </Link>
        </div>
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
          <div className="flex flex-col flex-wrap items-start gap-y-2 text-sm sm:flex-row sm:items-center">
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
            <div className="grid gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-3">
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
    </Container>
  );
};

export default MovieDetailPage;
