import Container from "@/components/Container";
import { FC } from "react";

interface VideoPreviewPageProps {
  searchParams: { videoId: string | undefined };
}

const VideoPreviewPage: FC<VideoPreviewPageProps> = ({ searchParams }) => {
  return (
    <Container>
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube.com/embed/${searchParams.videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </Container>
  );
};

export default VideoPreviewPage;
