import Container from "@/components/Container";
import MovieCard from "@/components/MovieCard";
import Slider from "@/components/Slider";
import Image from "next/image";
import { FC } from "react";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <>
      <Container id="action">
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

    </>
  );
};

export default Home;
