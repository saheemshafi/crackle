"use client";

import { toastOptions } from "@/lib/utlities/toast";
import * as Backdrop from "@/types/backdrop";
import Image from "next/image";
import { FC, HTMLAttributes, useState } from "react";
import toast from "react-hot-toast";
import { BiCheck, BiErrorAlt } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import * as uuid from "uuid"

interface ImageCardProps extends HTMLAttributes<HTMLDivElement> {
  image: Backdrop.Image;
}

const ImageCard: FC<ImageCardProps> = ({ image, className }) => {
  const [downloading, setDownloading] = useState(false);

 async function downloadImage(
    path: string,
    width: number,
    height: number
  ) {
    if (typeof document == "undefined") return;
    const request = fetch(
      `/api/og?path=${
        path.slice(1).split(".")[0]
      }&width=${width}&height=${height}&ext=${path.split(".")[1]}`
    ).then((res) => res.blob());
  
    const blob = await toast.promise(
      request,
      {
        error: (
          <div className="flex items-center gap-2">
            <BiErrorAlt className="mr-3 text-brand" size={20} /> Oops! Something
            went wrong.
          </div>
        ),
        loading: (
          <div className="flex flex-col">
            <div className="flex w-full items-center gap-2">
              <div className="aspect-square h-4 w-4 animate-spin rounded-full border-2 border-r-transparent "></div>
              Starting Download...
            </div>
            <p className="mt-1 block text-sm text-gray-light">
              Large images might take some time to download
            </p>
          </div>
        ),
        success: (
          <div className="flex items-center gap-2">
            <BiCheck size={20} className="animate-in mr-3 text-brand" /> Download
            Started!
          </div>
        ),
      },
      { ...toastOptions, icon: null }
    );
  
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `crackle-${uuid.v1()}.${path.split(".")[1]}`;
    anchor.click()
    anchor.remove()
  }
  
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
                toast.error("Oops! Something Went Wrong", {
                  ...toastOptions,
                  icon: <BiErrorAlt className="text-brand" size={20} />,
                });
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
