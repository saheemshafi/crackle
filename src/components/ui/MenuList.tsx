"use client";
import { FC, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

interface MenuListProps {
  icon?: JSX.Element;
  buttonHTML?: JSX.Element;
  buttonClasses?: string;
  children: React.ReactNode;
}

const MenuList: FC<MenuListProps> = ({
  icon: Icon,
  buttonHTML,
  buttonClasses,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const toggle = useCallback(() => {
    if (!isOpen || isOpening) {
      setIsOpen((prev) => !prev);
      setTimeout(() => {
        setIsOpening((prev) => !prev);
      }, 200);
    } else if (isOpen || !isOpening) {
      setIsOpening((prev) => !prev);
      setTimeout(() => {
        setIsOpen((prev) => !prev);
      }, 200);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={toggle}
        type="button"
        aria-label="Open Menu"
        className={twMerge(
          buttonClasses
            ? buttonClasses
            : "grid h-8 w-8 place-content-center rounded-sm outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50",
          isOpen ? "bg-gray-dark" : ""
        )}
      >
        {Icon ? <span>{Icon}</span> : buttonHTML}
      </button>
      <div
        className={twMerge(
          "absolute right-0 top-[calc(100%+0.5rem)] z-10 w-40 transform overflow-hidden rounded-md bg-gray-dark transition-all shadow-md border border-gray-md/20",
          isOpen ? "block opacity-0" : "hidden",
          isOpening ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        <div className="p-1 font-work-sans text-sm text-zinc-400">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
