"use client";

import { fetcher } from "@/lib/api/fetcher";
import { toastOptions } from "@/lib/utlities/toast";
import * as Backdrop from "@/types/backdrop";
import Image from "next/image";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineDownload } from "react-icons/hi";

interface ImageCardProps {
  image: Backdrop.Image;
}

const ImageCard: FC<ImageCardProps> = ({ image }) => {
  const [downloading, setDownloading] = useState(false);
  async function downloadImage() {
    if (typeof document == "undefined") return;
    setDownloading(true);
    try {
      const res = await fetch(
        `/api/og?path=${image.file_path.slice(1).split(".")[0]}&width=${
          image.width
        }&height=${image.height}`
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "crackle-poster.jpg";
      anchor.click();
      anchor.remove();
    } catch (error) {
      toast("Something went wrong", toastOptions);
    } finally {
      setDownloading(false);
    }
  }
  return (
    <figure className="relative rounded-lg bg-gray-dark p-2">
      <div className="group relative">
        <div className="animate-in absolute inset-0 grid place-items-center transition-opacity  md:hidden group-hover:grid">
          <button
            onClick={downloadImage}
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
          className="aspect-video rounded-md object-cover"
        />
      </div>
      <figcaption className="absolute bottom-1 right-1.5 mt-2 rounded bg-gray-dark/95 px-1 text-sm backdrop-blur-sm">
        {image.width}x{image.height}
      </figcaption>
    </figure>
  );
};

export default ImageCard;
