import Container from "@/components/Container";
import Slider from "@/components/Slider";
import Image from "next/image";
import { FC } from "react";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <Container id="action">
      <Slider title="Action">
        <div
          data-slider-item
          className="card relative overflow-hidden rounded-lg shadow-md"
        >
          {/* <div
            className="transparent absolute inset-0 bg-gradient-to-t from-dark"
            aria-hidden
          ></div> */}
          <div>
            <Image
              src="/images/dummy-poster.jpg"
              width={300}
              height={300}
              alt="Poster"
            />
          </div>
          <div className="mt-1 w-full px-1 py-2">
            <p className="font-work-sans text-sm font-semibold leading-snug">
              The Super Mario Bros Movie
            </p>
            <small className="-mt-1 text-xs text-gray-light">June 6,2020</small>
          </div>
        </div>
        <div
          data-slider-item
          className="card relative overflow-hidden rounded-lg shadow-md"
        >
          {/* <div
            className="transparent absolute inset-0 bg-gradient-to-t from-dark"
            aria-hidden
          ></div> */}
          <div>
            <Image
              src="/images/dummy-poster.jpg"
              width={300}
              height={300}
              alt="Poster"
            />
          </div>
          <div className="mt-1 w-full px-1 py-2">
            <p className="font-work-sans text-sm font-semibold leading-snug">
              The Super Mario Bros Movie
            </p>
            <small className="-mt-1 text-xs text-gray-light">June 6,2020</small>
          </div>
        </div>
        <div
          data-slider-item
          className="card relative overflow-hidden rounded-lg shadow-md"
        >
          {/* <div
            className="transparent absolute inset-0 bg-gradient-to-t from-dark"
            aria-hidden
          ></div> */}
          <div>
            <Image
              src="/images/dummy-poster.jpg"
              width={300}
              height={300}
              alt="Poster"
            />
          </div>
          <div className="mt-1 w-full px-1 py-2">
            <p className="font-work-sans text-sm font-semibold leading-snug">
              The Super Mario Bros Movie
            </p>
            <small className="-mt-1 text-xs text-gray-light">June 6,2020</small>
          </div>
        </div>
        <div
          data-slider-item
          className="card relative overflow-hidden rounded-lg shadow-md"
        >
          {/* <div
            className="transparent absolute inset-0 bg-gradient-to-t from-dark"
            aria-hidden
          ></div> */}
          <div>
            <Image
              src="/images/dummy-poster.jpg"
              width={300}
              height={300}
              alt="Poster"
            />
          </div>
          <div className="mt-1 w-full px-1 py-2">
            <p className="font-work-sans text-sm font-semibold leading-snug">
              The Super Mario Bros Movie
            </p>
            <small className="-mt-1 text-xs text-gray-light">June 6,2020</small>
          </div>
        </div>
        <div
          data-slider-item
          className="card relative overflow-hidden rounded-lg shadow-md"
        >
          {/* <div
            className="transparent absolute inset-0 bg-gradient-to-t from-dark"
            aria-hidden
          ></div> */}
          <div>
            <Image
              src="/images/dummy-poster.jpg"
              width={300}
              height={300}
              alt="Poster"
            />
          </div>
          <div className="mt-1 w-full px-1 py-2">
            <p className="font-work-sans text-sm font-semibold leading-snug">
              The Super Mario Bros Movie
            </p>
            <small className="-mt-1 text-xs text-gray-light">June 6,2020</small>
          </div>
        </div>
      </Slider>
    </Container>
  );
};

export default Home;
