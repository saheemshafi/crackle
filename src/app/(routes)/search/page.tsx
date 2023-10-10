import Container from "@/components/Container";
import Search from "@/components/Search";
import SearchResults from "@/components/SearchResults";
import { Metadata } from "next";
import { FC, Suspense } from "react";

interface SearchPageProps {
  searchParams: { query: string } | undefined;
}

export const generateMetadata = ({
  searchParams,
}: SearchPageProps): Metadata => {
  return {
    title: `Search Crackle ${searchParams?.query ? `| ${searchParams.query}` : ""}`,
    description: "Search for movies, tv shows and people on Crackle",
  };
};

const SearchPage: FC<SearchPageProps> = ({ searchParams }) => {
  return (
    <Container>
      <div className="flex justify-center flex-col items-start rounded sm:border border-gray-dark sm:p-8">
        <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
          Search Crackle
        </h1>
        <Search />
      </div>
      <Suspense
        fallback={
          <Container>
            <p className="mt-4 font-work-sans text-lg font-semibold">
              Searching...
            </p>
          </Container>
        }
      >
        {/* @ts-ignore server component */}
        <SearchResults query={searchParams?.query} />
      </Suspense>
    </Container>
  );
};

export default SearchPage;
