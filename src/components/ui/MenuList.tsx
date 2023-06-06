"use client";
import React, { FC, useState, AllHTMLAttributes, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface MenuListProps {
  icon?: JSX.Element;
  buttonHTML?: JSX.Element | string;
  buttonClasses?: string;
  children: React.ReactNode;
  classes?: AllHTMLAttributes<HTMLDivElement>["className"];
}

const MenuList: FC<MenuListProps> = ({
  icon: Icon,
  buttonHTML,
  buttonClasses,
  children,
  classes = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const dropdownMenu = useRef<HTMLDivElement>(null);

  function toggle() {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpening(true);
      }, 200);
      return;
    }
    handleClose();
  }

  function handleClose() {
    setIsOpening(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }

  useEffect(() => {
    function close(e: any) {
      if (dropdownMenu.current?.contains(e.target)) return;
      handleClose();
    }
    document.addEventListener('mousedown', close);
    return () => {
      document.removeEventListener('mousedown', close);
    }
  }, [])

  return (
    <div
      data-menu-container
      className="relative"
      ref={dropdownMenu}
    >
      <button
        onClick={() => toggle()}
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
        onClick={() => toggle()}
        className={twMerge(
          "absolute right-0 top-[calc(100%+0.5rem)] z-10 w-40 transform overflow-hidden rounded-md border border-gray-md/20 bg-gray-dark shadow-md transition-all",
          classes,
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
