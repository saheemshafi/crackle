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
  const [isOpen, setIsOpen] = useState(true);

  const toggle = useCallback(() => {
    if (!collapsible) return;
    setIsOpen((prev) => !prev);
  }, [collapsible]);

  return (
    <div className="p-2">
      <button
        type="button"
        tabIndex={!collapsible ? -1 : 0}
        className="flex w-full justify-between font-work-sans text-sm font-medium capitalize text-gray-light outline-none hover:text-zinc-400 focus-visible:rounded-sm focus-visible:text-zinc-400 focus-visible:ring-2 focus-visible:ring-brand/50"
        onClick={toggle}
      >
        <span>{title || "Menu"}</span>
        {collapsible && (
          <span className="rounded-sm hover:bg-zinc-800">
            <RxCaretRight
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </span>
        )}
      </button>
      <div
        className={`[&>ul]:py-1 ${
          collapsible ? "grid overflow-y-clip" : "mt-2 block"
        } ${isOpen ? "grid-rows-1" : "grid-rows-[0]"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarMenu;
