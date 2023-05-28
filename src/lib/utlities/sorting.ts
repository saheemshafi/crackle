import { MovieResponse, GenreResponse } from "@/types/api-response";
import { Movie } from "@/types/movie";

export function sortMoviesByGenre(
  movies: Movie[],
  { genres }: Pick<GenreResponse, "genres">
): { [genre: string]: Movie[] } {
  const moviesByGenres: { [genre: string]: Movie[] } = {};
  const addedMovies = new Set();
  movies.forEach((movie) => {
    movie.genre_ids.forEach((genre) => {
      const matchingGenre = genres.find(
        (matchingGenre) => matchingGenre.id === genre
      )?.name;
      if (!matchingGenre) return;
      if (!moviesByGenres[matchingGenre]) {
        moviesByGenres[matchingGenre] = [];
      }
      if (!addedMovies.has(movie.id)) {
        moviesByGenres[matchingGenre].push(movie);
        addedMovies.add(movie.id);
      }
    });
  });
  return moviesByGenres;
}
