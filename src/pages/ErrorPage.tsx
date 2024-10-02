/** CUSTOM COMPONENTS */
import MainLayout from "../components/layout/main-layout/MainLayout";

/** LIBRARIES */
import {
  ErrorResponse,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";

/** MODELS */
import { CONTENT } from "../model/constants";
import { IMovie, IPagination } from "../model/Movie";

/** OTHER */
import { getFromLocalStorage } from "../helpers/util";

/** STYLES */
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useLayoutEffect } from "react";
import { initialPagination, MovieContext } from "../store/MovieContext";

const useStyles = makeStyles(() => ({
  "error-wrapper": {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    order: 1,
  },
  code: {
    fontSize: "5em",
    margin: "2em 0 0",
  },
  advice: {
    width: "60%",
    textAlign: "center",
  },
}));

const Error = () => {
  const error = useRouteError() as Response | ErrorResponse;
  const styles = useStyles();
  const {
    movies,
    favoriteMovies,
    pagination,
    searchedText,
    changePagination,
    loadFavoriteMovies,
    setNewMovies,
    setSearchedString,
  } = useContext(MovieContext);

  useLayoutEffect(() => {
    const favMovies = getFromLocalStorage("favoriteMovies", []) as IMovie[];
    loadFavoriteMovies(favMovies);
  }, [loadFavoriteMovies]);

  useEffect(() => {
    loadFavoriteMovies(favoriteMovies);
  }, [favoriteMovies, loadFavoriteMovies]);

  useLayoutEffect(() => {
    const movies = getFromLocalStorage("movies", []) as IMovie[];
    setNewMovies(movies);
  }, [setNewMovies]);

  useEffect(() => {
    setNewMovies(movies);
  }, [movies, setNewMovies]);

  useLayoutEffect(() => {
    const searchedText = getFromLocalStorage("searchedText", "") as string;
    setSearchedString(searchedText);
  }, [setSearchedString]);

  useEffect(() => {
    setSearchedString(searchedText);
  }, [searchedText, setSearchedString]);

  useLayoutEffect(() => {
    const pagination = getFromLocalStorage(
      "pagination",
      initialPagination
    ) as IPagination;
    changePagination({
      key: "currentPage",
      state: "favorite",
      value: pagination.favorite.currentPage,
    });
    changePagination({
      key: "pages",
      state: "favorite",
      value: pagination.favorite.pages,
    });
    changePagination({
      key: "currentPage",
      state: "movies",
      value: pagination.movies.currentPage,
    });
    changePagination({
      key: "pages",
      state: "movies",
      value: pagination.movies.pages,
    });
  }, [changePagination]);

  useEffect(() => {
    changePagination({
      key: "currentPage",
      state: "movies",
      value: pagination.movies.currentPage,
    });
  }, [pagination.movies.currentPage, changePagination]);

  useEffect(() => {
    changePagination({
      key: "pages",
      state: "movies",
      value: pagination.movies.pages,
    });
  }, [pagination.movies.pages, changePagination]);

  useEffect(() => {
    changePagination({
      key: "currentPage",
      state: "favorite",
      value: pagination.favorite.currentPage,
    });
  }, [pagination.favorite.currentPage, changePagination]);

  useEffect(() => {
    changePagination({
      key: "pages",
      state: "favorite",
      value: pagination.favorite.pages,
    });
  }, [pagination.favorite.pages, changePagination]);

  let errorMessage = CONTENT.ERROR_MESSAGE_GENERIC;
  const isPageNotFound = error.status === 404;
  const statusCode = isPageNotFound ? 404 : 500;
  const heading = isPageNotFound
    ? CONTENT.ERROR_PAGE_TITLE_NOT_FOUND
    : CONTENT.ERROR_PAGE_TITLE_SERVER;
  const adviceMessage = isPageNotFound
    ? CONTENT.ERROR_PAGE_NOT_FOUND_ADVICE
    : CONTENT.ERROR_SERVER_ADVICE;

  if (isRouteErrorResponse(error) && error.status === 404) {
    errorMessage = CONTENT.ERROR_PAGE_NOT_FOUND;
  }

  if ((error as Response).status === 599) {
    errorMessage = CONTENT.ERROR_FETCH_MOVIES;
  }

  if ((error as Response).status === 598) {
    errorMessage = CONTENT.ERROR_FETCH_MOVIE;
  }

  return (
    <>
      <MainLayout />
      <div className={styles["error-wrapper"]}>
        <h2 className={styles.code}>{statusCode}</h2>
        <h2>{heading}</h2>
        <p className={styles.advice}>{errorMessage}</p>
        <p className={styles.advice}>{adviceMessage}</p>
      </div>
    </>
  );
};

export default Error;
