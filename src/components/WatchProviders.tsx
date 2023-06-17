"use client";
import {
  MouseEventHandler,
  useState,
  MouseEvent,
  useEffect,
  FC,
  SetStateAction,
  Dispatch,
} from "react";
import { Country } from "@/types/country";
import endpoints from "@/lib/constants/endpoints.json";
import { clientOptions, options } from "@/lib/api/options";
import { ProviderResponse } from "@/types/api-response";
import Image from "next/image";
import { WatchProvider } from "@/types/watch-provider";
import { twMerge } from "tailwind-merge";
import Skeleton from "./ui/Skeleton";
import { fetcher } from "@/lib/api/fetcher";

interface WatchProvidersProps {
  region: Country["iso_3166_1"];
  type: "movie" | "tv";
  activeProviders: string[];
  setActiveProviders: Dispatch<SetStateAction<string[]>>;
}

const WatchProviders: FC<WatchProvidersProps> = ({
  region,
  type,
  activeProviders,
  setActiveProviders,
}) => {
  const [providers, setProviders] = useState<WatchProvider[]>([]);

  useEffect(() => {
    fetcher<ProviderResponse>(
      type == "movie" ? endpoints.providers.movie : endpoints.providers.tv,
      "",
      clientOptions
    ).then((provider: ProviderResponse) => {
      setProviders(provider.results);
    });
  }, [region, type]);

  return (
    <div className="flex flex-wrap justify-between gap-2">
      {providers.length > 0
        ? providers.map((provider) => (
            <button
              title={provider.provider_name}
              key={provider.provider_id}
              className={twMerge(
                "relative overflow-hidden rounded-lg border border-gray-dark bg-gray-dark p-0.5 shadow-md after:absolute after:inset-0 after:z-10 after:bg-dark/50 focus-visible:ring-2 focus-visible:ring-brand/50",
                activeProviders.includes(provider.provider_id.toString())
                  ? "ring-2 ring-brand/50 after:bg-transparent"
                  : ""
              )}
              onClick={(e) => {
                if (
                  !activeProviders.includes(provider.provider_id.toString())
                ) {
                  setActiveProviders((prev) => [
                    ...prev,
                    provider.provider_id.toString(),
                  ]);
                  return;
                }
                setActiveProviders(
                  activeProviders.filter(
                    (providerId) =>
                      providerId !== provider.provider_id.toString()
                  )
                );
              }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w300/${provider.logo_path}`}
                width={300}
                height={300}
                className="aspect-square h-9 w-9 rounded-md object-cover"
                alt={provider.provider_name}
              />
            </button>
          ))
        : new Array(12)
            .fill(null)
            .map((_, i) => (
              <Skeleton
                key={i}
                className="h-9 w-9 rounded border border-gray-md/30 bg-gray-dark"
              />
            ))}
    </div>
  );
};

export default WatchProviders;
