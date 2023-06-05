import Container from "@/components/Container";
import PersonCard from "@/components/PersonCard";
import { options } from "@/lib/api/options";
import endpoints from "@/lib/constants/endpoints.json";
import { ApiResponse } from "@/types/api-response";
import { Person } from "@/types/person";

interface PopularFacesPage {}

const PopularFacesPage = async ({}: PopularFacesPage) => {
  const peoplePromise: Response = await fetch(endpoints.people, {
    ...options,
    next: { revalidate: 2592000 },
  });

  const people: ApiResponse<Person> = await peoplePromise.json();

  return (
    <Container>
      <h1 className="text-2xl mb-6 font-medium pb-3 after:bg-brand after:rounded-md after:bottom-0 after:left-0 after:w-12 after:h-1 after:absolute relative">Popular Faces</h1>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {people.results.map((person) => (
          <PersonCard person={person} key={person.id} />
        ))}
      </div>
    </Container>
  );
};

export default PopularFacesPage;
