import { Movie } from "@/types/movie";
import { KnownFor, Person } from "@/types/person";
import { Tv } from "@/types/tv";
import Image from "next/image";
import { FC, AllHTMLAttributes } from "react";

interface PersonCardProps {
  person: Person;
  classes?: AllHTMLAttributes<HTMLDivElement>["className"];
}

const PersonCard: FC<PersonCardProps> = ({ person, classes }) => {
  return (
    <div className="rounded-md border border-gray-dark p-2 transition-colors hover:bg-gray-dark md:p-3">
      <div className="-m-2 mb-1 overflow-hidden rounded-sm md:m-0 md:mb-0">
        <Image
          src={`https://image.tmdb.org/t/p/w300/${person.profile_path}`}
          width={300}
          height={300}
          alt={person.name}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="mt-3">
        <p className="font-work-sans font-medium leading-5">{person.name}</p>
        <div className="truncate text-xs sm:text-sm text-gray-light">
          <span className="hidden font-medium lg:inline">Known For:</span>{" "}
          {person.known_for.map((known_for) => (
            <span
              key={known_for.id}
              title={
                isKnownForMovie(known_for)
                  ? known_for.title
                  : known_for.original_name
              }
            >
              {isKnownForMovie(known_for)
                ? known_for.title
                : known_for.original_name}
              {", "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonCard;

function isKnownForMovie(
  known_for: KnownFor<Movie> | KnownFor<Tv>
): known_for is KnownFor<Movie> {
  if ("release_date" in known_for) return true;
  return false;
}
