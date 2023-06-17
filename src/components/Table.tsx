import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface TableProps {
  head: React.ReactNode;
  rows: React.ReactNode;
  className?: string;
}

const Table: FC<TableProps> = ({ head, rows, className = "" }) => {
  return (
    <table
      className={twMerge("w-full rounded-md text-sm sm:text-base", className)}
    >
      <thead className="border-b border-gray-md/30 bg-dark/20 text-gray-light">
        {head}
      </thead>
      <tbody className="font-work-sans">{rows}</tbody>
    </table>
  );
};

export default Table;
