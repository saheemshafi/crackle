"use client";
import { FC, useCallback, useState } from "react";
import { IconType } from "react-icons/lib";

interface MenuListProps {
  title?: string;
  icon?: JSX.Element;
  buttonHTML?: JSX.Element;
  buttonClasses?: string;
  children: React.ReactNode;
}

const MenuList: FC<MenuListProps> = ({
  title,
  icon: Icon,
  buttonHTML,
  buttonClasses,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const toggle = useCallback(() => {
    setIsOpening((prev) => !prev);
    setTimeout(() => {
      setIsOpen((prev) => !prev);
    }, 200);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className={`${
          buttonClasses
            ? buttonClasses
            : "grid h-8 w-8 place-content-center rounded-sm outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
        }`}
      >
        {Icon ? <span>{Icon}</span> : buttonHTML}
      </button>
      <div
        className={`absolute right-0 top-[calc(100%+0.5rem)] z-10 transition-all ${
          isOpening
            ? " translate-y-0 opacity-100"
            : "translate-y-2 transform opacity-0"
        } w-40 overflow-hidden rounded-md bg-gray-dark`}
      >
        <div className="flex items-center justify-between bg-zinc-800 p-2">
          <h4 className="font-work-sans text-sm font-medium">
            {title || "Menu"}
          </h4>
          <span>{Icon && Icon}</span>
        </div>
        <div className="p-1 font-work-sans text-sm text-zinc-400">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
