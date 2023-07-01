import Container from "@/components/Container";
import Image from "next/image";

const PreviewPage = ({ params }: { params: { url: string } }) => {
  return (
    <Container>
      <div className="grid place-items-center">
        <Image
          alt="image-preview"
          src={`https://image.tmdb.org/t/p/original/${params.url}`}
          width={800}
          height={600}
          className="md:max-w-lg"
        />
      </div>
    </Container>
  );
};

export default PreviewPage;
