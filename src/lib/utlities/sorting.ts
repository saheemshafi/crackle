import { GenreResponse } from "@/types/api-response";
import { Genre } from "@/types/genre";
import { Movie } from "@/types/movie";
import { Tv } from "@/types/tv";

export function sortByGenre<T extends Movie | Tv>(
  items: T[],
  { genres }: Pick<GenreResponse, "genres">
): Record<Genre["name"], T[]> {
  const itemsByGenre: { [genre: string]: T[] } = {};
  const addedItems = new Set();
  items.forEach((item) => {
    item?.genre_ids.forEach((genreId) => {
      const matchingGenre = genres.find(
        (matchingGenre) => matchingGenre.id === genreId
      )?.name;
      if (!matchingGenre) return;
      if (!itemsByGenre[matchingGenre]) {
        itemsByGenre[matchingGenre] = [];
      }
      if (!addedItems.has(item.id)) {
        itemsByGenre[matchingGenre].push(item);
        addedItems.add(item.id);
      }
    });
  });
  return itemsByGenre;
}
