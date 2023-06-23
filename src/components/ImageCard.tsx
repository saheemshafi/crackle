"use client";

import * as Backdrop from "@/types/backdrop";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { CgMaximizeAlt } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

interface ImageCardProps extends HTMLAttributes<HTMLDivElement> {
  image: Backdrop.Image;
}

const ImageCard: FC<ImageCardProps> = ({ image, className }) => {

  return (
    <figure className={"relative rounded-lg bg-gray-dark p-2"}>
      <div className="group relative rounded-md border border-gray-md/30">
        <div className="animate-in absolute inset-0 grid place-items-center transition-opacity  group-hover:grid md:hidden">
          <div className="flex gap-2">
            <Link href={`/image-preview${image.file_path}?w=${image.width}&h=${image.height}`} className="grid disabled:opacity-90 h-8 w-8 transform place-items-center rounded-full border border-gray-md/30 bg-dark/80 shadow-md backdrop-blur-sm transition-transform hover:scale-105"><CgMaximizeAlt size={24} /></Link>
          </div>
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
