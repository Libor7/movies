/** COMPONENTS */
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";

/** LIBRARIES */
import { FC, useCallback, useContext } from "react";

/** MODELS */
import { IMovie, IMovieExtended } from "../../../model/Movie";

/** OTHER */
import { MovieContext } from "../../../store/MovieContext";

interface FavoriteIconProps {
  movie: IMovie | IMovieExtended;
}

const FavoriteIcon: FC<FavoriteIconProps> = ({ movie }) => {
  const { addToFavorite, removeFromFavorite } = useContext(MovieContext);
  const { palette } = useTheme();
  const { primary, secondary } = palette;
  const { isFavorite } = movie;

  const toggleFavorite = useCallback(
    (_event: React.SyntheticEvent) => {
      isFavorite ? removeFromFavorite(movie) : addToFavorite(movie);
    },
    [addToFavorite, isFavorite, movie, removeFromFavorite]
  );

  return (
    <IconButton aria-label="toggle favorite" onClick={toggleFavorite}>
      {isFavorite && (
        <StarIcon
          sx={{
            color: secondary.main,
          }}
          fontSize="large"
        />
      )}
      {!isFavorite && (
        <StarBorderIcon
          sx={{
            color: primary.dark,
          }}
          fontSize="large"
        />
      )}
    </IconButton>
  );
};

export default FavoriteIcon;
