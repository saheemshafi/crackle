import { Country } from "@/types/country";
import { ReleaseType } from "@/types/release-date";

export const getRegion = (
  countries: Country[],
  iso_3166_1: Country["iso_3166_1"]
) => {
  return countries.find((country) => country.iso_3166_1 == iso_3166_1)
    ?.english_name;
};

export const getReleaseType = (type: ReleaseType): string => {
  let typeInString = "";
  switch (type) {
    case ReleaseType.Digital:
      typeInString = "Digital";
      break;
    case ReleaseType.Physical:
      typeInString = "Physical";
      break;
    case ReleaseType.Premiere:
      typeInString = "Premiere";
      break;
    case ReleaseType.Theatrical:
      typeInString = "Theatrical";
      break;
    case ReleaseType.Theatrical_Limited:
      typeInString = "Theatrical(limited)";
      break;
    case ReleaseType.Tv:
      typeInString = "Tv";
      break;
  }
  return typeInString;
};
