import Container from "@/components/Container";
import MediaDetail from "@/components/MediaDetail";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { VideosResponse } from "@/types/api-response";
import { MovieDetails } from "@/types/movie";
import { AppendProps } from "@/types/type-helpers";
import { Type as VideoType } from "@/types/videos";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsPlayCircle } from "react-icons/bs";

export const revalidate = 0;

interface MovieDetailPageProps {
  params: { movieId: string };
}

const MovieDetailPage = async ({ params }: MovieDetailPageProps) => {
  let movieDetails, videos;
  try {
    movieDetails = await fetcher<
      AppendProps<MovieDetails, { videos: VideosResponse }>
    >(
      `${endpoints.movies.movieDetails}/${params.movieId}?append_to_response=videos`
    );

    videos = movieDetails.videos.results;
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
        {/* @ts-expect-error */}
        <MediaDetail
          media={{
            id: movieDetails.id,
            title: movieDetails.title,
            tagline: movieDetails.tagline,
            genres: movieDetails.genres,
            original_language: movieDetails.original_language,
            release_date: movieDetails.release_date,
            runtime: movieDetails.runtime,
            media_type: "movie",
          }}
        />
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
