import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import Paginate from "@/components/Paginate";
import PersonCard from "@/components/PersonCard";
import { fetcher } from "@/lib/api/fetcher";
import endpoints from "@/lib/constants/endpoints.json";
import { SearchParams } from "@/lib/helpers/query-url";
import { ApiResponse } from "@/types/api-response";
import { Person } from "@/types/person";

interface PopularFacesPage {
  searchParams: { page: SearchParams["page"] };
}

const PopularFacesPage = async ({ searchParams }: PopularFacesPage) => {
  const people = await fetcher<ApiResponse<Person>>(
    endpoints.people,
    `?page=${searchParams["page"] || "1"}`
  );

  return (
    <Container>
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        Popular Faces
      </h1>
      {people.results.length > 0 ? (
        <>
          {" "}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {people.results.map((person) => (
              <PersonCard person={person} key={person.id} />
            ))}
          </div>
          <Paginate items={people} />
        </>
      ) : (
        <EmptyState
          title="Oops!"
          description="Seems we can't find any popular people"
          actions={[{ title: "Home", path: "/" }]}
        />
      )}
    </Container>
  );
};

export default PopularFacesPage;
