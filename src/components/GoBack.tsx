import Link from "next/link";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";

interface GoBackProps {
  link: string;
  children: React.ReactNode;
}

const GoBack: FC<GoBackProps> = ({ link, children }) => {
  return (
    <div className="sm:w-fit">
      <Link
        href={link}
        className="flex items-center gap-2 rounded border border-gray-dark px-3 py-1 font-medium transition-colors hover:border-gray-md/30 hover:bg-gray-dark focus-visible:border-gray-md/30"
      >
        <BiArrowBack className="shrink-0" /> {children}
      </Link>
    </div>
  );
};

export default GoBack;
