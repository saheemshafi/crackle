"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface TablistProps {
  links: { name: string; path: string }[];
}

const Tablist: FC<TablistProps> = ({ links }) => {
  const pathname = usePathname();
  return (
    <div className="flex gap-1 rounded-full border border-gray-md/30 bg-gray-dark p-0.5 text-sm">
      {links.map((link, i) => (
        <Link
          key={i}
          className={twMerge(
            "rounded-full px-2 py-0.5 font-work-sans transition-colors",
            pathname
              .substring(pathname.lastIndexOf("/"))
              .includes(link.path.split("/").at(-1) ?? "")
              ? "bg-brand"
              : "hover:bg-gray-md/30"
          )}
          href={link.path}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Tablist;
