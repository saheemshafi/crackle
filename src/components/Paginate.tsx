"use client";
import { ApiResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";
import { Person } from "@/types/person";
import { Tv } from "@/types/tv";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

interface PaginateProps<T> {
  items: ApiResponse<T>;
}

const Paginate = <T extends Movie | Tv | Person>({
  items,
}: PaginateProps<T>) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  let initialPage = parseInt(params.get("page") || "1");
  return (
    <ReactPaginate
      pageCount={items.total_pages < 500 ? items.total_pages : 500}
      nextLabel="Next"
      initialPage={initialPage > 0 ? initialPage - 1 : initialPage}
      previousLabel="Previous"
      className="mt-12 flex flex-wrap gap-2 font-work-sans"
      nextLinkClassName="py-1 px-2 rounded-md border border-gray-md/30 hover:bg-gray-dark hover:border-gray-dark"
      previousLinkClassName="py-1 px-2 rounded-md border border-gray-md/30 hover:bg-gray-dark hover:border-gray-dark"
      pageLinkClassName="px-2 py-1 border border-gray-md/30 rounded-md hover:bg-gray-dark hover:border-gray-dark"
      activeLinkClassName="bg-gray-dark border-gray-dark text-brand font-medium"
      disabledLinkClassName="opacity-50 hover:bg-transparent hover:border-gray-md/30 pointer-events-none"
      hrefAllControls
      onPageActive={(item) => {
        console.log("page-active", item);
      }}
      onPageChange={({ selected }: { selected: number }) => {
        let searchParams = new URLSearchParams();

        params.forEach((param, key) => {
          searchParams.set(key, param);
        });
        if (selected == 0) {
          searchParams.set("page", (1).toString());
        } else {
          searchParams.set(
            "page",
            selected < 500 ? (selected + 1).toString() : selected.toString()
          );
        }
        router.push(`${pathname}?${searchParams.toString()}`);
      }}
    />
  );
};

export default Paginate;
