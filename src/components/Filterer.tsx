"use client";
import { Genre } from "@/types/genre";
import { FC, useEffect, useState, MouseEvent, useContext } from "react";
import endpoints from "@/lib/constants/endpoints.json";
import { clientOptions } from "@/lib/api/options";
import { CountryResponse } from "@/types/api-response";
import Button from "./ui/Button";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Country } from "@/types/country";
import WatchProviders from "./WatchProviders";
import { RxCaretDown } from "react-icons/rx";
import GenreBox from "./GenreBox";
import Skeleton from "./ui/Skeleton";
import { GlobalContext } from "@/providers/GlobalProvider";
import { twMerge } from "tailwind-merge";
import { BiX } from "react-icons/bi";

type SortParams =
  | "popularity.asc"
  | "popularity.desc"
  | "vote_average.asc"
  | "vote-average.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "revenue.asc"
  | "revenue.desc";

interface FiltererProps {
  type?: "tv" | "movie";
}

const Filterer: FC<FiltererProps> = ({ type = "movie" }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const [sort, setSort] = useState<SortParams>("popularity.desc");
  const [countries, setCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState<Country["iso_3166_1"]>("US");
  const [activeProviders, setActiveProviders] = useState<string[]>([]);
  const [isProvidersOpen, setIsProvidersOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { mobileFiltersOpen, setMobileFiltersOpen } = useContext(GlobalContext);

  useEffect(() => {
    const countriesPromise: Promise<CountryResponse> = fetch(
      endpoints.providers.regions,
      clientOptions
    ).then((res: Response) => res.json());

    Promise.all([countriesPromise]).then(([countries]) => {
      setCountries(countries.results);
    });
  }, [type]);

  useEffect(() => {
    const genreParams = params
      .get("genres")
      ?.trim()
      ?.split(",")
      .filter((genre) => genre.length > 0);
    const sort = params.get("sort");
    const region = params.get("region");
    const providersParams: string[] | undefined = params
      .get("providers")
      ?.trim()
      ?.split(",")
      .filter((providers) => providers.length > 0);

    if (sort) {
      setSort(sort as SortParams);
    }
    if (genreParams && genreParams?.length > 0) {
      setActiveGenres(genreParams);
    }
    setRegion(region || "US");
    if (providersParams && providersParams.length > 0) {
      setActiveProviders(providersParams);
    }
  }, [params]);

  function handleFilter(e: MouseEvent) {
    const params = new URLSearchParams();
    params.set("genres", activeGenres.join(","));
    params.set("sort", sort);
    params.set("providers", activeProviders.join(","));
    params.set("region", region);
    router.push(`${pathname}?${params}`);
    setIsProvidersOpen(false);
    setMobileFiltersOpen(false);
  }

  function removeFilters() {
    setActiveGenres([]);
    setSort("popularity.desc");
    setActiveProviders([]);
    setRegion("US");
    router.push(pathname);
    setMobileFiltersOpen(false);
  }

  return (
    <aside
      className={twMerge(
        "scroll-design fixed overflow-y-auto sm:overflow-y-visible inset-0 top-[56px] shrink-0 grow-0 self-start rounded-md bg-dark/95 p-3 pr-1 backdrop-blur-sm sm:relative sm:inset-auto sm:right-0  sm:top-auto sm:block sm:w-64 sm:rounded-none sm:bg-transparent sm:p-0",
        mobileFiltersOpen
          ? "animate-in block shadow-lg"
          : "hidden"
      )}
    >
      <div className="mb-3 flex items-center justify-between rounded border border-gray-dark px-3 py-4 shadow sm:hidden">
        <p className="font-work-sans text-lg">Filters</p>
        <Button
          icon={<BiX size={28} />}
          text={<span className="sr-only">Close Filters</span>}
          attrs={{
            className:
              "grid h-8 w-8 place-items-center rounded-sm outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50",
            type: "button",
          }}
          handler={() => setMobileFiltersOpen(false)}
        />
      </div>
      <div className="mb-3 rounded border border-gray-dark px-3 py-4 shadow">
        <label
          className="mb-1 block font-work-sans text-sm text-gray-light"
          htmlFor="sort"
        >
          Sort Items
        </label>
        <select
          name="sort"
          id="sort"
          value={sort}
          className="w-full rounded border border-gray-dark bg-gray-dark px-2 py-2 font-work-sans text-sm outline-none hover:border-gray-md/40 focus:ring-2 focus:ring-brand/30"
          onChange={(e) => setSort(e.target.value as SortParams)}
        >
          <option value={"popularity.asc"} className="bg-gray-dark">
            Popularity Asc.
          </option>
          <option value={"popularity.desc"} className="bg-gray-dark">
            Popularity Desc.
          </option>
          <option value={"vote_average.asc"} className="bg-gray-dark">
            Rating Asc.
          </option>
          <option value={"vote_average.desc"} className="bg-gray-dark">
            Rating Desc.
          </option>
          <option value={"primary_release_date.asc"} className="bg-gray-dark">
            Released Asc.
          </option>
          <option value={"primary_release_date.desc"} className="bg-gray-dark">
            Released Desc.
          </option>
          <option value={"revenue.asc"} className="bg-gray-dark">
            Revenue Inc.
          </option>
          <option value={"revenue.desc"} className="bg-gray-dark">
            Revenue Desc.
          </option>
        </select>
      </div>
      <div className="mb-3 rounded border border-gray-dark px-3 py-4 shadow">
        <div>
          <p className="mb-3 block font-work-sans text-sm text-gray-light">
            Genres
          </p>
          <GenreBox
            type={type}
            genres={genres}
            setGenres={setGenres}
            setActiveGenres={setActiveGenres}
            activeGenres={activeGenres}
          />
        </div>
      </div>
      <div className="mb-3 rounded border border-gray-dark px-3 py-4 shadow">
        <div className="mb-3">
          <div>
            <label
              className="mb-1 block font-work-sans text-sm text-gray-light"
              htmlFor="sort"
            >
              Countries
            </label>
            {countries.length > 0 ? (
              <select
                name="countries"
                id="countries"
                value={region}
                className="w-full rounded border border-gray-dark bg-gray-dark px-2 py-2 font-work-sans text-sm outline-none hover:border-gray-md/40 focus:ring-2 focus:ring-brand/30"
                onChange={(e) => {
                  setRegion(e.target.value as Country["iso_3166_1"]);
                  setActiveProviders([]);
                }}
              >
                {countries.map((country) => (
                  <option
                    key={country.iso_3166_1}
                    value={country.iso_3166_1}
                    className="bg-gray-dark"
                  >
                    {country.english_name}
                  </option>
                ))}
              </select>
            ) : (
              <Skeleton className="h-10 w-full rounded bg-gray-dark" />
            )}
          </div>
        </div>
        <div>
          <div className="mb-2">
            <Button
              text={
                <>
                  Providers
                  <RxCaretDown
                    size={18}
                    className={`transition-transform ${
                      !isProvidersOpen ? "-rotate-90" : ""
                    }`}
                  />
                </>
              }
              handler={() => setIsProvidersOpen(!isProvidersOpen)}
              type="secondary"
            />
          </div>
          <div className="scroll-design overflow-auto">
            <div
              className={`scroll-design grid overflow-y-auto px-2 ${
                isProvidersOpen ? "max-h-[200px] py-3" : "max-h-[0px] py-0"
              }`}
            >
              <WatchProviders
                type={type}
                region={region}
                activeProviders={activeProviders}
                setActiveProviders={setActiveProviders}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 flex items-start gap-2 px-2 sm:px-0">
        <Button handler={handleFilter} type="primary" text={"Apply"} />
        <Button
          text={"Clear Filters"}
          type="secondary"
          handler={removeFilters}
        />
      </div>
    </aside>
  );
};

export default Filterer;
