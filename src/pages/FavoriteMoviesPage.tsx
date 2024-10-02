/** CUSTOM COMPONENTS */
import MovieList from "../components/movie/movie-list/MovieList";

import CustomPagination from "../components/UI/pagination/Pagination";

/** LIBRARIES */
import { useCallback, useContext, useEffect } from "react";

/** MODELS */
import { RECORDS_PER_PAGE } from "../model/constants";

/** OTHER */
import { MovieContext } from "../store/MovieContext";

const FavoriteMovies = () => {
  const { pagination, favoriteMovies, changePagination } =
    useContext(MovieContext);

  const currentPage = pagination.favorite.currentPage;
  const pageCount = Math.ceil(favoriteMovies.length / RECORDS_PER_PAGE);

  useEffect(() => {
    changePagination({ key: "pages", state: "favorite", value: pageCount });
  }, [changePagination, pageCount]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination.favorite.currentPage]);

  const pageChangeHandler = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      changePagination({ key: "currentPage", state: "favorite", value });
    },
    [changePagination]
  );

  return (
    <>
      <MovieList movies={favoriteMovies} isFavoritePage />
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

export default FavoriteMovies;
