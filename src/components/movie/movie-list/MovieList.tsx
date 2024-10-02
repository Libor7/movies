/** CUSTOM COMPONENTS */
import MovieItem from "../movie-item/MovieItem";
import MoviesEmpty from "../movies-empty/MoviesEmpty";

/** LIBRARIES */
import { FC, memo, useContext } from "react";

/** MODELS */
import { HeaderType, IMovie } from "../../../model/Movie";
import { CONTENT, RECORDS_PER_PAGE } from "../../../model/constants";

/** OTHER */
import { MovieContext } from "../../../store/MovieContext";

/** STYLES */
import styles from "./MovieList.module.css";

interface MovieListProps {
  movies: IMovie[];
  isFavoritePage?: boolean;
}

const MovieList: FC<MovieListProps> = ({ movies, isFavoritePage }) => {
  const { pagination, miscellaneousData } = useContext(MovieContext);

  const currentPage = pagination.favorite.currentPage;
  const fromIndex = RECORDS_PER_PAGE * currentPage - RECORDS_PER_PAGE;
  const toIndex = RECORDS_PER_PAGE * currentPage;

  const isFavoriteFixed =
    isFavoritePage && miscellaneousData.headerPosition === HeaderType.FIXED;
  const classes = `${styles.container} ${
    isFavoriteFixed ? styles.fixed : styles.static
  }`;

  const moviesToShow = movies.map((movie, index) => {
    if (isFavoritePage) {
      return index >= fromIndex && index < toIndex ? (
        <MovieItem key={movie.imdbID} movie={movie} />
      ) : null;
    } else {
      return <MovieItem key={movie.imdbID} movie={movie} />;
    }
  });

  const moviesBeenFound = moviesToShow.length > 0;
  
  return (
    <>
      {moviesBeenFound && <ul className={classes}>{moviesToShow}</ul>}
      {!moviesBeenFound && isFavoritePage && (
        <MoviesEmpty
          title={CONTENT.MOVIES_EMPTY_FAVORITE_TITLE}
          description={CONTENT.MOVIES_EMPTY_FAVORITE_DESCRIPTION}
        />
      )}
    </>
  );
};

export default memo(MovieList);
