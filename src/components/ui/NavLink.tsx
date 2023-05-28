"use client";
import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  text: string;
  type?: "sidebar-link" | "link";
  icon?: JSX.Element;
}

const NavLink: FC<NavLinkProps> = ({
  href,
  icon: Icon,
  text,
  type = "sidebar-link",
}) => {
  const pathname = usePathname();
  if (type == "sidebar-link") {
    return (
      <Link
        href={href}
        className={`flex items-center  gap-2 rounded-sm px-3 py-2 font-work-sans font-normal capitalize outline-none  transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-brand/50 ${
          pathname === href
            ? "text-white [&>svg]:text-brand"
            : "text-gray-light"
        }`}
      >
        {Icon ? Icon : null}
        <span className="text-sm">{text || "Link"}</span>
      </Link>
    );
  } else {
    return (
      <Link
        href={href}
        className={`rounded-sm p-1 font-work-sans font-normal capitalize outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-brand/50 ${
          pathname === href ? "text-white" : "text-gray-light"
        }`}
      >
        <span className="text-sm">{text || "Link"}</span>
      </Link>
    );
  }
};

export default NavLink;
