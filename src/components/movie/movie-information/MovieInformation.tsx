/** LIBRARIES */
import { FC } from "react";

/** STYLES */
import styles from "./MovieInformation.module.css";

interface MovieInformationProps {
  propertyName: string;
  value: string;
}

const MovieInformation: FC<MovieInformationProps> = ({
  propertyName,
  value,
}) => {
  return (
    <p className={styles.info}>
      {propertyName}: {value}
    </p>
  );
};

export default MovieInformation;
