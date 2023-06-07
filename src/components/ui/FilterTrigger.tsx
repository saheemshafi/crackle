"use client";
import { FC, useContext } from "react";
import { GlobalContext } from "@/providers/GlobalProvider";
import { VscFilter } from "react-icons/vsc";

interface FilterTriggerProps {}

const FilterTrigger: FC<FilterTriggerProps> = ({}) => {
  const { mobileFiltersOpen, setMobileFiltersOpen } = useContext(GlobalContext);
  return (
    <button
      className="flex place-items-center gap-2 self-baseline rounded-sm border border-gray-md/30 px-3 py-1 text-sm outline-none hover:border-gray-dark hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50 sm:hidden"
      onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
    >
      <VscFilter /> Filter
    </button>
  );
};

export default FilterTrigger;
