/** CUSTOM COMPONENTS */
import Header from "../header/Header";
import CircularProgress from "@mui/material/CircularProgress";

/** LIBRARIES */
import { useContext, useLayoutEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";

/** OTHER */
import { MovieContext } from "../../../store/MovieContext";

/** STYLES */
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  const navigation = useNavigation();
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
