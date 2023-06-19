import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import ImageCard from "./ImageCard";
import { ImagesResponse } from "@/types/api-response";

interface ImageListProps {
  mediaId: string;
}

const ImageList = async ({ mediaId }: ImageListProps) => {
  const images = await fetcher<ImagesResponse>(
    `${endpoints.movies.movieDetails}/${mediaId}/images`
  );
  console.log(images);
  return (
    <section className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {images.backdrops.map((backdrop) => (
        <ImageCard key={backdrop.file_path} image={backdrop} />
      ))}
    </section>
  );
};

export default ImageList;
