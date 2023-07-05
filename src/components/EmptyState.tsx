import Link from "next/link";
import { FC } from "react";
import { RxCaretRight } from "react-icons/rx";
import Button from "./ui/Button";

type Action =
  | { title: string; path: string }
  | { title: string; action: () => any };

interface EmptyStateProps {
  title: string;
  description: string;
  actions?: Action[];
}

const EmptyState: FC<EmptyStateProps> = ({ actions, title, description }) => {
  return (
    <div className="grid place-items-center py-24 text-gray-light">
      <div className="mb-6 text-center font-work-sans ">
        <div className="mb-2 text-2xl font-semibold sm:text-3xl">{title}</div>
        <p className="max-w-lg">{description}</p>
      </div>
      {actions && (
        <div className="flex items-center gap-4 font-work-sans font-medium text-white">
          {actions.map((action) =>
            "path" in action ? (
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
            ) : (
              <Button
                attrs={{
                  className:
                    "group flex items-center transition-colors hover:text-brand",
                }}
                text={
                  <>
                    {" "}
                    {action.title}{" "}
                    <RxCaretRight
                      size={20}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                }
                key={action.title}
                handler={action.action}
              ></Button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
