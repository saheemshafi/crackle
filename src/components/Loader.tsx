import { FC } from "react";

interface LoaderProps {}

const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className="flex justify-center py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-r-transparent"></div>
    </div>
  );
};

export default Loader;
