import { Video } from "@/types/videos";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

interface VideoCardProps extends HTMLAttributes<HTMLDivElement> {
  video: Video;
}

const VideoCard: FC<VideoCardProps> = ({ video, className }) => {
  return (
    <figure className={"relative rounded-lg bg-gray-dark p-2"}>
      <Link
        href={`/videos?videoId=${video.key}`}
        className="group relative rounded-md border border-gray-md/30 block"
      >
        <div className="animate-in absolute inset-0 grid place-items-center transition-opacity  group-hover:grid md:hidden">
          <div className="flex gap-2 bg-dark/50 rounded-full p-1">
            <BsPlayCircle size={30} />
          </div>
        </div>
        <Image
          src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
          alt={"Backdrop"}
          width={900}
          height={600}
          blurDataURL="/images/image-placeholder.jpeg"
          placeholder={"blur"}
          className={twMerge("aspect-video rounded-md object-cover", className)}
        />
      </Link>
    </figure>
  );
};

export default VideoCard;
