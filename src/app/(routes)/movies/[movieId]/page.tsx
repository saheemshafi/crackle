import { FC } from "react";

interface pageProps {
  params: { movieId: string };
}

const page: FC<pageProps> = ({ params }) => {
  return <div>You are viewing movie {params.movieId}</div>;
};

export default page;
