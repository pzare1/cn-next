import { searchMovie } from "@actions/movieData";
import { Movie } from "@lib/types";
import MovieCard from "./MovieCard";

const SearchResults = async ({ query }: { query: string }) => {
  let searchedMovies: Movie[] = [];

  searchedMovies = await searchMovie(query);

  return searchedMovies.length === 0 ? (
    <div className="search-page">
      <h1 className="text-heading2-bold text-white flex justify-center items-center">{`No Result for the ${query}`}</h1>
    </div>
  ) : (
    <div className="search-page">
      <h1 className="text-[2rem] font-light text-center text-white bg-blue-1 p-3 rounded-full w-full">Results for {query}</h1>

      <div className="list">
        {searchedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;