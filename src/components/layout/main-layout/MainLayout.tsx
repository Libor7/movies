/** CUSTOM COMPONENTS */
import Header from "../header/Header";
import CircularProgress from "@mui/material/CircularProgress";

/** LIBRARIES */
import { useContext, useEffect, useLayoutEffect } from "react";
import { Outlet, useNavigation, useRouteLoaderData } from "react-router-dom";

/** MODELS */
import { ILocalStorage } from "../../../model/Movie";

/** OTHER */
import { getFromLocalStorage, setToLocalStorage } from "../../../helpers/util";
import { initialPagination, MovieContext } from "../../../store/MovieContext";

/** STYLES */
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  const {
    movies,
    favoriteMovies,
    pagination,
    searchedText,
    changePagination,
    loadFavoriteMovies,
    setSearchedString,
    setNewMovies,
  } = useContext(MovieContext);
  const navigation = useNavigation();
  const localStorage = useRouteLoaderData("root") as ILocalStorage | null;

  useLayoutEffect(() => {
    if (localStorage?.favoriteMovies && localStorage?.favoriteMovies.length > 0)
      loadFavoriteMovies(localStorage.favoriteMovies);
  }, [loadFavoriteMovies, localStorage?.favoriteMovies]);

  useLayoutEffect(() => {
    if (localStorage?.movies && localStorage?.movies.length > 0) 
      setNewMovies(localStorage.movies);
  }, [setNewMovies, localStorage?.movies]);

  useLayoutEffect(() => {
    if (localStorage?.searchedText)
      setSearchedString(localStorage.searchedText);
  }, [setSearchedString, localStorage?.searchedText]);

  useLayoutEffect(() => {
    if (localStorage?.pagination.favorite.pages)
      changePagination({
        key: "pages",
        state: "favorite",
        value: localStorage.pagination.favorite.pages,
      });
  }, [changePagination, localStorage?.pagination.favorite.pages]);

  useLayoutEffect(() => {
    if (localStorage?.pagination.favorite.currentPage)
      changePagination({
        key: "currentPage",
        state: "favorite",
        value: localStorage.pagination.favorite.currentPage,
      });
  }, [changePagination, localStorage?.pagination.favorite.currentPage]);

  useLayoutEffect(() => {
    if (localStorage?.pagination.movies.pages)
      changePagination({
        key: "pages",
        state: "movies",
        value: localStorage.pagination.movies.pages,
      });
  }, [changePagination, localStorage?.pagination.movies.pages]);

  useLayoutEffect(() => {
    if (localStorage?.pagination.movies.currentPage)
      changePagination({
        key: "currentPage",
        state: "movies",
        value: localStorage?.pagination.movies.currentPage,
      });
  }, [changePagination, localStorage?.pagination.movies.currentPage]);

  useEffect(() => {
    setToLocalStorage("favoriteMovies", favoriteMovies);
  }, [favoriteMovies]);

  useEffect(() => {
    setToLocalStorage("movies", movies);
  }, [movies]);

  useEffect(() => {
    setToLocalStorage("pagination", pagination);
  }, [pagination]);

  useEffect(() => {
    setToLocalStorage("searchedText", searchedText);
  }, [searchedText]);

  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
        {navigation.state === "loading" && (
          <CircularProgress color="primary" size="4em" />
        )}
      </main>
    </>
  );
};

export default MainLayout;

export const loader = () => {
  return {
    favoriteMovies: getFromLocalStorage("favoriteMovies", []),
    movies: getFromLocalStorage("movies", []),
    pagination: getFromLocalStorage("pagination", initialPagination),
    searchedText: getFromLocalStorage("searchedText", ""),
  };
};
