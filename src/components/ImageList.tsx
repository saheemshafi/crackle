import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import ImageCard from "./ImageCard";
import { ImagesResponse } from "@/types/api-response";
import { twMerge } from "tailwind-merge";

interface ImageListProps {
  mediaId: string;
  map?: "backdrop" | "logos" | "posters";
}

const ImageList = async ({ mediaId, map = "backdrop" }: ImageListProps) => {
  const images = await fetcher<ImagesResponse>(
    `${endpoints.movies.movieDetails}/${mediaId}/images`
  );
  return (
    <section
      className={twMerge(
        "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
        map == "posters"
          ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          : ""
      )}
    >
      {map == "backdrop" &&
        images.backdrops.map((backdrop) => (
          <ImageCard key={backdrop.file_path} image={backdrop} />
        ))}

      {map == "logos" &&
        images.logos.map((logo) => (
          <ImageCard
            className="object-contain p-8"
            key={logo.file_path}
            image={logo}
          />
        ))}

      {map == "posters" &&
        images.posters.map((poster) => (
          <ImageCard
            key={poster.file_path}
            image={poster}
            className="aspect-[2/3] object-contain"
          />
        ))}
    </section>
  );
};

export default ImageList;
