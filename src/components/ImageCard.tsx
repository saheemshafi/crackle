"use client";

import { toastOptions } from "@/lib/utlities/toast";
import * as Backdrop from "@/types/backdrop";
import Image from "next/image";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { BiCheck, BiErrorAlt } from "react-icons/bi";
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
      const request = fetch(
        `/api/og?path=${image.file_path.slice(1).split(".")[0]}&width=${
          image.width
        }&height=${image.height}`
      );

      const res = await toast.promise(
        request,
        {
          error: (
            <div className="flex items-center">
              <BiErrorAlt className="mr-3 text-brand" size={20} /> Oops!
              Something went wrong.
            </div>
          ),
          loading: (
            <div className="flex flex-col">
              <div className="flex items-center w-full">
                <div className="mr-3 h-3 w-3 animate-spin rounded-full border-2 border-r-transparent "></div>{" "}
                Downloading image...
              </div>
              <p className="text-sm text-gray-light mt-1 block">
                Large images might take some time to download
              </p>
            </div>
          ),
          success: (
            <div className="flex items-center">
              <BiCheck size={20} className="animate-in mr-3 text-brand" />{" "}
              Downloaded
            </div>
          ),
        },
        { ...toastOptions, icon: null }
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
        <div className="animate-in absolute inset-0 grid place-items-center transition-opacity  group-hover:grid md:hidden">
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
