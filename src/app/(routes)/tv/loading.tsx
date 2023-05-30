import Container from "@/components/Container";
import Slider from "@/components/Slider";
import Skeleton from "@/components/ui/Skeleton";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  const sliderItems = Array(5).fill(null);
  const containers = Array(3).fill(null);
  return (
    <>
      {containers.map((_, index) => (
        <Container key={index}>
          <Slider
            title={<Skeleton className="h-9 w-40 rounded-sm bg-gray-dark" />}
          >
            {sliderItems.map((_, index) => (
              <div
                key={index}
                data-slider-item="true"
                className="min-h-[300px] overflow-hidden rounded-md bg-gray-dark"
              >
                <Skeleton className="h-[80%] rounded-sm" />
                <div className="p-2">
                  <Skeleton />
                  <div className="mt-2">
                    <Skeleton className="w-1/2 rounded-sm" />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </Container>
      ))}
    </>
  );
};

export default loading;
