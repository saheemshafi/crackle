import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TableItemProps extends HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const TableItem: FC<TableItemProps> = ({ children, className, ...attrs }) => {
  return (
    <td {...attrs} className={twMerge("p-1", className)}>
      {children}
    </td>
  );
};

export default TableItem;
