/** CUSTOM COMPONENT */
import MovieInformation from "../movie-information/MovieInformation";

/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import { IFilteredMovie } from "../../../model/Movie";

/** STYLES */
import styles from './MovieDetails.module.css';

interface MovieDetailsProps {
  movie: IFilteredMovie;
}

const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className={styles.container}>
      {Object.entries(movie).map(([key, val]) => (
        <MovieInformation key={key} propertyName={key} value={val} />
      ))}
    </div>
  );
};

export default MovieDetails;
