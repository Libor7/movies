/** CUSTOM COMPONENT */
import MovieInformation from "../movie-information/MovieInformation";

/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import { IFilteredMovie } from "../../../model/Movie";

/** STYLES */
import styles from './MovieOverview.module.css';

interface MovieOverviewProps {
  movie: IFilteredMovie;
  Plot: string;
}

const MovieOverview: FC<MovieOverviewProps> = ({ movie, Plot }) => {
  return (
    <div className={styles.container}>
      <p className={styles.description}>{Plot}</p>
      {Object.entries(movie).map(([key, val]) => (
        <MovieInformation key={key} propertyName={key} value={val} />
      ))}
    </div>
  );
};

export default MovieOverview;
