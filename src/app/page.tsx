import Container from "@/components/Container";
import MovieCard from "@/components/MovieCard";
import Slider from "@/components/Slider";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/authentication/auth-options";

interface HomeProps {}

const Home = async ({}: HomeProps) => {
  const session: Session | null = await getServerSession(authOptions);
  // console.log(session);
  return (
    <>
      <Container id="action">
        {JSON.stringify(session)}
        <Slider title="Action">
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
        </Slider>
      </Container>
      <Container id="trending">
        <Slider title="Trending">
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
        </Slider>
      </Container>
      <Container id="airing-today">
        <Slider title="Airing Today">
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
          <MovieCard movie={{}} sliderItem />
        </Slider>
      </Container>
    </>
  );
};

export default Home;
