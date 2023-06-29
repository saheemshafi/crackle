import Dialog from "@/components/Dialog";
import { FC } from "react";

interface VideoPreviewPageProps {}

const VideoPreviewPage: FC<VideoPreviewPageProps> = ({}) => {
  return (
    <Dialog>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/5miHyP6lExg"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </Dialog>
  );
};

export default VideoPreviewPage;
