import { Movie } from "@/types/movie";
import { KnownFor, Person } from "@/types/person";
import { Tv } from "@/types/tv";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface PersonCardProps {
  person: Person;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const PersonCard: FC<PersonCardProps> = ({ person, className }) => {
  return (
    <div
      className={twMerge(
        "rounded-md border border-gray-dark bg-gradient-to-t p-2 transition-colors hover:from-zinc-900 hover:to-transparent md:p-3",
        className
      )}
    >
      <Link
        title={person.name}
        href={`/people/${person.id}`}
        className="-m-2 mb-1 block overflow-hidden rounded-sm md:m-0 md:mb-0"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w300/${person.profile_path}`}
          width={300}
          height={300}
          alt={person.name}
          className="aspect-square w-full object-cover"
        />
      </Link>
      <div className="mt-3">
        <Link href={`/people/${person.id}`}>
          <p className="font-work-sans font-medium leading-5">{person.name}</p>
        </Link>
        <div className="truncate text-xs text-gray-light sm:text-sm">
          <span className="hidden font-medium lg:inline">Known For:</span>{" "}
          {person.known_for.length === 0 && <span>N/A</span>}
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
