/** CUSTOM COMPONENTS */
import SearchField from "../components/UI/search-field/SearchField";
import MovieList from "../components/movie/movie-list/MovieList";
import CustomPagination from "../components/UI/pagination/Pagination";

/** LIBRARIES */
import { useCallback, useContext, useEffect } from "react";

/** OTHER */
import { MovieContext } from "../store/MovieContext";
import { getMovieData } from "../helpers/util";
import MoviesEmpty from "../components/movie/movies-empty/MoviesEmpty";
import { CONTENT } from "../model/constants";

const Movies = () => {
  const {
    pagination,
    searchedText,
    movies,
    setNewMovies,
    changePagination,
    processMovieData,
  } = useContext(MovieContext);

  const pageCount = pagination.movies.pages;
  const currentPage = pagination.movies.currentPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination.movies.currentPage]);

  const pageChangeHandler = useCallback(
    async (_event: React.ChangeEvent<unknown>, value: number) => {
      changePagination({ key: "currentPage", state: "movies", value });
      const { Search } = await getMovieData(searchedText, value);
      const newMovies = processMovieData(Search);
      setNewMovies(newMovies);
    },
    [changePagination, processMovieData, searchedText, setNewMovies]
  );

  return (
    <>
      <SearchField />
      {!movies.length && (
        <MoviesEmpty
          title={CONTENT.MOVIES_EMPTY_SEARCH_TITLE}
          description={CONTENT.MOVIES_EMPTY_SEARCH_DESCRIPTION}
        />
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
      {pageCount > 1 && (
        <CustomPagination
          pages={pageCount}
          onPageChange={pageChangeHandler}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Movies;
