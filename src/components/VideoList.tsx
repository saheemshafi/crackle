import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { VideosResponse } from "@/types/api-response";
import VideoCard from "./VideoCard";

interface VideoListProps {
  mediaId: string;
  type?: "tv" | "movie";
}

const VideoList = async ({ mediaId, type = "movie" }: VideoListProps) => {
  const videos = await fetcher<VideosResponse>(
    `${
      type == "movie" ? endpoints.movies.movieDetails : endpoints.tv.tvDetails
    }/${mediaId}/videos`
  );
  return (
    <section className={"mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"}>
      {videos.results.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </section>
  );
};

export default VideoList;
