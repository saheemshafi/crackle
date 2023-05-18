"use client";
import { FC, useCallback, useState } from "react";
import { RxCaretRight } from "react-icons/rx";

interface SidebarMenuProps {
  children: React.ReactNode;
  title?: string;
  collapsible?: boolean;
}

const SidebarMenu: FC<SidebarMenuProps> = ({
  children,
  title,
  collapsible = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    if (!collapsible) return;
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  return (
    <div className="p-2">
      <button
        type="button"
        tabIndex={!collapsible ? -1 : 0}
        className="font-work-sans font-normal text-gray-light uppercase text-sm flex justify-between w-full hover:text-zinc-400 focus-visible:text-zinc-400 focus-visible:ring-2 focus-visible:ring-brand/50 outline-none focus-visible:rounded-sm"
        onClick={toggle}
      >
        <span>{title || "Menu"}</span>
        {collapsible && (
          <span className="hover:bg-zinc-800 rounded-sm">
            <RxCaretRight
              className={`w-5 h-5 transition-transform ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </span>
        )}
      </button>
      <div
        className={`[&>ul]:py-1 ${
          collapsible ? "grid overflow-y-clip" : "block mt-2"
        } ${isOpen ? "grid-rows-1" : "grid-rows-[0]"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarMenu;
