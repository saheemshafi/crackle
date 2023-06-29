import Dialog from "@/components/Dialog";
import { notFound } from "next/navigation";
import { FC } from "react";

interface VideoPreviewPageProps {
  searchParams: { videoId: string | undefined };
}

const VideoPreviewPage: FC<VideoPreviewPageProps> = ({ searchParams }) => {
  if (!searchParams.videoId) {
    notFound();
  }
  return (
    <Dialog>
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube.com/embed/${searchParams.videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </Dialog>
  );
};

export default VideoPreviewPage;
