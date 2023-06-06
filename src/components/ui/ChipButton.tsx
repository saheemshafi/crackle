import { FC, MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ChipButtonProps {
  text: string | JSX.Element;
  active?: boolean;
  handler: MouseEventHandler;
}

const ChipButton: FC<ChipButtonProps> = ({ text, active, handler }) => {
  return (
    <button
      onClick={handler}
      className={twMerge(
        "rounded-full border border-transparent bg-gray-dark px-2 py-1 text-xs text-white transition-all hover:border-brand/50 focus:ring-1 focus:ring-brand/50",
        active ? "bg-brand" : ""
      )}
    >
      {text}
    </button>
  );
};

export default ChipButton;
