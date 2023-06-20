"use client";

import { downloadImage } from "@/lib/helpers/download-image";
import * as Backdrop from "@/types/backdrop";
import Image from "next/image";
import { FC, HTMLAttributes, useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface ImageCardProps extends HTMLAttributes<HTMLDivElement> {
  image: Backdrop.Image;
}

const ImageCard: FC<ImageCardProps> = ({ image, className }) => {
  const [downloading, setDownloading] = useState(false);

  return (
    <figure className={"relative rounded-lg bg-gray-dark p-2"}>
      <div className="group relative rounded-md border border-gray-md/30">
        <div className="animate-in absolute inset-0 grid place-items-center transition-opacity  group-hover:grid md:hidden">
          <button
            onClick={async () => {
              try {
                setDownloading(true);
                await downloadImage(image.file_path, image.width, image.height);
              } catch (error) {
                console.log(error);
              } finally {
                setDownloading(false);
              }
            }}
            className="grid h-8 w-8 transform place-items-center rounded-full border border-gray-md/30 bg-dark/80 shadow-md backdrop-blur-sm transition-transform hover:scale-105"
          >
            {downloading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-r-transparent "></div>
            ) : (
              <HiOutlineDownload size={24} />
            )}
          </button>
        </div>
        <Image
          src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
          alt={"Backdrop"}
          width={900}
          height={600}
          blurDataURL="/images/image-placeholder.jpeg"
          placeholder={image.file_path.includes("jpg") ? "blur" : "empty"}
          className={twMerge("aspect-video rounded-md object-cover", className)}
        />
      </div>
      <figcaption className="absolute bottom-1 right-1.5 mt-2 rounded bg-gray-dark/95 px-1 text-sm backdrop-blur-sm">
        {image.width}x{image.height}
      </figcaption>
    </figure>
  );
};

export default ImageCard;
