import Link from "next/link";
import { FC } from "react";
import { RxCaretRight } from "react-icons/rx";

interface EmptyStateProps {
  title: string;
  description: string;
  actions?: { title: string; path: string }[];
}

const EmptyState: FC<EmptyStateProps> = ({ actions, title, description }) => {
  return (
    <div className="grid place-items-center py-24 text-gray-light">
      <div className="mb-6 text-center font-work-sans ">
        <div className="mb-2 text-3xl font-semibold">{title}</div>
        <p className="max-w-lg">{description}</p>
      </div>
      {actions && (
        <div className="flex items-center gap-4 font-work-sans font-medium text-white">
          {actions.map((action) => (
            <Link
              key={action.path}
              className="group flex items-center transition-colors hover:text-brand"
              href={action.path}
            >
              {action.title}{" "}
              <RxCaretRight
                size={20}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
