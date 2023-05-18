"use client";
import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  text: string;
  icon?: JSX.Element;
}

const NavLink: FC<NavLinkProps> = ({ href, icon: Icon, text }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`py-2 px-3  hover:text-white transition-colors flex gap-2 items-center  font-normal font-work-sans rounded-sm ${
        pathname === href ? "text-white [&>svg]:text-brand" : "text-gray-light"
      }`}
    >
      {Icon && Icon}
      <span className="text-sm">{text || "Link"}</span>
    </Link>
  );
};

export default NavLink;
