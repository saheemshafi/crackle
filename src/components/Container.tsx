import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  classes?: string;
  id?: string;
}

const Container: FC<ContainerProps> = ({ children, classes = "", id }) => {
  return (
    <section className={twMerge(`p-4 text-white md:p-5`, classes)} id={id}>
      {children}
    </section>
  );
};

export default Container;
