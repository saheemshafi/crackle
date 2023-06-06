import Container from "@/components/Container";
import Skeleton from "@/components/ui/Skeleton";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  const items = Array(15).fill(null);
  return (
    <Container>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((_, index) => (
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
      </div>
    </Container>
  );
};

export default loading;
