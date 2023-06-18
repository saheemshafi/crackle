"use client";
import { FC, useContext } from "react";
import { GlobalContext } from "@/providers/GlobalProvider";
import { AiOutlineFlag } from "react-icons/ai";

interface AsideLinksTriggerProps {
  children?: React.ReactNode;
}

const AsideLinksTrigger: FC<AsideLinksTriggerProps> = ({ children }) => {
  const { mobileAsideLinksOpen, setMobileAsideLinksOpen } =
    useContext(GlobalContext);
  return (
    <button
      type="button"
      className="flex place-items-center gap-2 self-baseline rounded-sm border border-gray-md/30 px-3 py-1 text-sm outline-none hover:border-gray-dark hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50 sm:hidden"
      onClick={() => {
        console.log("Aside links open");
        setMobileAsideLinksOpen(!mobileAsideLinksOpen);
      }}
    >
      {!children ? (
        <>
          <AiOutlineFlag /> Countries
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AsideLinksTrigger;
