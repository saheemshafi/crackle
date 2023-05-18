"use client";
import { FC, useState } from "react";

interface SidebarMenuProps {
  children: React.ReactNode;
  title?: string;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ children, title }) => {
  const [open, setIsOpen] = useState(false);
  return (
    <div className="p-2 [&:hover>div]:h-auto">
      <button
        className="font-work-sans font-normal text-gray-light uppercase text-sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title || "Menu"}
      </button>
      <div className="mt-2 h-0 overflow-hidden">{children}</div>
    </div>
  );
};

export default SidebarMenu;
