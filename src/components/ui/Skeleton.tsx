import { AllHTMLAttributes, FC } from "react";

const Skeleton: FC<AllHTMLAttributes<HTMLDivElement>> = (attrs) => {
  return <div className={`h-4 animate-pulse bg-gray-md/50 ${attrs.className}`}></div>;
};

export default Skeleton;
