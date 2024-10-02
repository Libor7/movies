/** CUSTOM COMPONENTS */
import FavoriteIcon from "../../UI/star-icon/StarIcon";

/** COMPONENTS */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

/** LIBRARIES */
import { FC, memo } from "react";
import { Link } from "react-router-dom";

/** MODELS */
import { IMovie } from "../../../model/Movie";
import { CONTENT } from "../../../model/constants";

/** STYLES */
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  image: {
    width: "180px",
    height: "280px",
  },
  content: {
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: "flex",
    flexDirection: "column",
    height: "280px",
    justifyContent: "space-evenly",
    padding: 0,
    width: "180px",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  title: {
    padding: "0 1em",
    textAlign: "center",
  },
}));

interface MovieItemProps {
  movie: IMovie;
}

const MovieItem: FC<MovieItemProps> = ({ movie }) => {
  const styles = useStyles();
  const { Poster, Title, imdbID } = movie;
  const hasPoster = Poster !== "N/A";

  return (
    <li>
      <Card>
        <Link to={imdbID}>
          {hasPoster && (
            <CardMedia
              component="img"
              image={Poster}
              alt={Title}
              className={styles.image}
            />
          )}
          {!hasPoster && (
            <CardContent className={styles.content}>
              <Typography variant="body2" className={styles.title}>
                {Title}
              </Typography>
              <Typography variant="body2">{CONTENT.CARD_IMAGE_NA}</Typography>
            </CardContent>
          )}
        </Link>
        <CardActions>
          <FavoriteIcon movie={movie} />
        </CardActions>
      </Card>
    </li>
  );
};

export default memo(MovieItem);
