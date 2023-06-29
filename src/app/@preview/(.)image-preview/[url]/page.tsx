import Dialog from "@/components/Dialog";
import Image from "next/image";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface pageProps {
  params: { url: string };
  searchParams: { w: string; h: string };
}

const page: FC<pageProps> = ({ params, searchParams }) => {
  return (
    <Dialog>
      <div className="w-full">
        <div className="aspect-video w-full">
          <Image
            alt="image-preview"
            src={`https://image.tmdb.org/t/p/original/${params.url}`}
            width={1200}
            height={800}
            className={twMerge(
              "aspect-video w-full object-cover shadow",
              params.url.includes("png") ? "object-contain" : ""
            )}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default page;
