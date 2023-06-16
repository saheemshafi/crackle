"use client";

import { getRegion } from "@/lib/helpers/format-helpers";
import { GlobalContext } from "@/providers/GlobalProvider";
import { Country } from "@/types/country";
import Link from "next/link";
import { useContext } from "react";
import { BiX } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import Button from "./ui/Button";

interface AsideLinksProps {
  title: string | JSX.Element | null;
  link: string;
  items: Country["iso_3166_1"][];
  regions: Country[];
}

const AsideLinks = ({ title, link, items, regions }: AsideLinksProps) => {
  const uniqueLinks = new Set(items);
  const links = Array.from(uniqueLinks);
  const { mobileAsideLinksOpen, setMobileAsideLinksOpen } =
    useContext(GlobalContext);
  return (
    <aside
      className={twMerge(
        "scroll-design fixed inset-0 top-[56px] z-[21] shrink-0 grow-0 self-start overflow-y-auto rounded-md bg-dark/[98%] p-3 pr-1 backdrop-blur-sm sm:relative sm:inset-auto sm:right-0 sm:top-auto sm:z-0  sm:block sm:w-64 sm:overflow-y-visible sm:rounded-none sm:bg-gray-dark/30 sm:p-0",
        mobileAsideLinksOpen ? "animate-in block shadow-lg" : "hidden"
      )}
    >
      <div className="sticky top-0 flex items-center justify-between gap-2 rounded-lg border border-gray-md/30 bg-gray-dark px-3 py-2 font-work-sans font-medium shadow-md sm:static sm:border-none">
        <p>{title}</p>
        <span className="hidden h-5 w-5 items-center justify-center rounded bg-gray-md/30 sm:flex">
          {items.length}
        </span>
        <Button
          icon={<BiX size={28} />}
          text={<span className="sr-only">Close {title}</span>}
          attrs={{
            className:
              "grid h-8 w-8 place-items-center rounded-sm outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50 sm:hidden",
            type: "button",
          }}
          handler={() => setMobileAsideLinksOpen(false)}
        />
      </div>
      <div>
        <ul className="scroll-design p-2 sm:max-h-[600px] sm:overflow-y-auto">
          {links.map((item) => (
            <li key={item}>
              <Link className="menu-link" href={`${link}#${item}`}>
                {(getRegion(regions, item) || "")?.length > 0
                  ? getRegion(regions, item)
                  : item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AsideLinks;
