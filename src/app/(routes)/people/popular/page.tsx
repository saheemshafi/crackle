import Container from "@/components/Container";
import PersonCard from "@/components/PersonCard";
import { options } from "@/lib/api/options";
import endpoints from "@/lib/constants/endpoints.json";
import { ApiResponse } from "@/types/api-response";
import { Person } from "@/types/person";

interface PopularFacesPage {}

const PopularFacesPage = async ({}: PopularFacesPage) => {
  
  const peoplePromise: Promise<ApiResponse<Person>> = (
    await fetch(endpoints.people, options)
  ).json();
  const people = await peoplePromise;

  return (
    <Container>
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        Popular Faces
      </h1>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {people.results.map((person) => (
          <PersonCard person={person} key={person.id} />
        ))}
      </div>
    </Container>
  );
};

export default PopularFacesPage;
