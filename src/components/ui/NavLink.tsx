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
        className={`py-2 px-3  hover:text-white transition-colors flex gap-2 items-center focus-visible:ring-2 focus-visible:ring-brand/50 outline-none  font-normal font-work-sans rounded-sm capitalize ${
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
        className={`hover:text-white transition-colors p-1 focus-visible:ring-2 focus-visible:ring-brand/50 outline-none font-normal font-work-sans rounded-sm capitalize ${
          pathname === href ? "text-white" : "text-gray-light"
        }`}
      >
        <span className="text-sm">{text || "Link"}</span>
      </Link>
    );
  }
};

export default NavLink;
