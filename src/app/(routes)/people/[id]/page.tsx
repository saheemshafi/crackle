import { fetcher } from "@/lib/api/fetcher";
import { FC } from "react";
import endpoints from "@/lib/constants/endpoints.json";
import { Gender, PersonDetails } from "@/types/person";
import PersonCard from "@/components/PersonCard";
import Container from "@/components/Container";
import { BsDot } from "react-icons/bs";
import { formatter } from "@/lib/helpers/date";

interface PersonDetailsPageProps {
  params: { id: string };
}

const PersonDetailsPage = async ({ params }: PersonDetailsPageProps) => {
  const personDetails = await fetcher<PersonDetails>(
    `${endpoints.person}/${params.id}`
  );

  return (
    <Container classes="flex flex-col lg:flex-row items-start gap-5">
      <PersonCard
        className="pointer-events-none mx-auto w-full max-w-[350px] lg:w-fit"
        aria-hidden={true}
        person={{ ...personDetails, known_for: [] }}
      />
      <div className="flex-1">
        <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
          {personDetails.name}
          <span className="font-normal">
            {" "}
            ({formatter.format(new Date(personDetails.birthday))})
          </span>
        </h1>
        <div className="flex flex-col flex-wrap items-start gap-y-2 text-sm sm:flex-row sm:items-center">
          <span className="rounded border border-gray-md px-1 font-semibold uppercase text-gray-md">
            {personDetails.gender === Gender.MALE ? "Male" : "Female"}
          </span>
          <span className="ml-2 flex items-center font-medium text-white">
            <BsDot />
            Also Known as:
          </span>
          {personDetails.also_known_as.map((aslo_known_as) => (
            <span
              key={aslo_known_as}
              className="ml-2 flex items-center rounded bg-gray-dark px-1  py-0.5 font-normal text-gray-light transition-colors hover:bg-brand hover:text-white"
            >
              <BsDot />
              {aslo_known_as}
            </span>
          ))}
        </div>
        {personDetails.biography && (
          <div className="mt-3 rounded-md border border-gray-dark bg-dark p-3">
            <div>
              <h2 className="mb-4 border-b border-gray-dark pb-1 font-work-sans text-lg font-medium">
                Biography
              </h2>
              <p className="scroll-design max-h-[400px] overflow-y-scroll pr-4 font-work-sans text-gray-light">
                {personDetails.biography}
              </p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default PersonDetailsPage;
