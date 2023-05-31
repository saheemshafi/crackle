import { AllHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";

const Skeleton: FC<AllHTMLAttributes<HTMLDivElement>> = (attrs) => {
  return (
    <div
      className={twMerge(`h-4 animate-pulse bg-gray-md/50`, attrs.className)}
    ></div>
  );
};

export default Skeleton;
