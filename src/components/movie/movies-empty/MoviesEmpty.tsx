/** LIBRARIES */
import { FC } from "react";

/** STYLES */
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto auto",
    width: "60%",
  },
  title: {
    color: theme.palette.primary.dark,
    textAlign: "center",
  },
  description: {
    color: theme.palette.primary.main,
  }
}));

interface MoviesEmptyProps {
  title: string;
  description: string;
}

const MoviesEmpty: FC<MoviesEmptyProps> = ({ title, description }) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default MoviesEmpty;
