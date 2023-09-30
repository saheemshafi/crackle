"use client";

import { BiSearch } from "react-icons/bi";
import Button from "./ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchProps {}

function Search({}: SearchProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  return (
    <form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search?query=${query}`);
      }}
      className="flex w-full"
    >
      <div className="flex flex-wrap w-full gap-2">
        <input
          type="text"
          className="w-[500px] flex-1 rounded-sm border border-gray-dark bg-gray-dark p-2 pl-4 outline-offset-2 focus:outline focus:outline-brand/30"
          name="search"
          id="search"
          placeholder="Search for movies, series and people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          minLength={3}
        />
        <Button
          type="primary"
          text={"Search Crackle"}
          icon={<BiSearch size={20} />}
        />
      </div>
    </form>
  );
}

export default Search;
