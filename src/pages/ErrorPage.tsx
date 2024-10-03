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

/** STYLES */
import { makeStyles } from "@mui/styles";
import { useContext, useLayoutEffect } from "react";
import { MovieContext } from "../store/MovieContext";

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
    loadPagination,
    loadFavoriteMovies,
    setNewMovies,
    setSearchedString,
  } = useContext(MovieContext);

  useLayoutEffect(() => {
    const storedSearchedText = localStorage.getItem("searchedText");
    const storedMovies = localStorage.getItem("movies");
    const storedFavoriteMovies = localStorage.getItem("favoriteMovies");
    const storedPagination = localStorage.getItem("pagination");

    if (storedSearchedText) setSearchedString(JSON.parse(storedSearchedText));
    if (storedMovies) setNewMovies(JSON.parse(storedMovies));
    if (storedFavoriteMovies) loadFavoriteMovies(JSON.parse(storedFavoriteMovies));
    if (storedPagination) loadPagination(JSON.parse(storedPagination));
  }, [loadFavoriteMovies, loadPagination, setNewMovies, setSearchedString]);

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
