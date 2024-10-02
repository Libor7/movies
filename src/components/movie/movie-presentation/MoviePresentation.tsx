/** CUSTOM COMPONENTS */
import FavoriteIcon from "../../UI/star-icon/StarIcon";
import TabPanel from "../../UI/tab-panel/TabPanel";
import MovieOverview from "../movie-overview/MovieOverview";
import MovieDetails from "../movie-details/MovieDetails";

/** COMPONENTS */
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

/** LIBRARIES */
import { FC, useCallback, useContext, useMemo, useState } from "react";

/** MODELS */
import {
  HeaderType,
  IFilteredMovie,
  IMovieExtended,
  ITabs,
} from "../../../model/Movie";

/** OTHER */
import { MovieContext } from "../../../store/MovieContext";
import useWindowSize from "../../../hooks/useWindowSize";

/** STYLES */
import { makeStyles } from "@mui/styles";
import externalClasses from "./MoviePresentation.module.css";

const useStyles = makeStyles((theme: any) => ({
  container: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    margin: "5vw",
    [theme.breakpoints.up("sm")]: {
      margin: "5vw 15vw",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      margin: "10vw 5vw",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "7.5vw 5vw",
    },
  },
  "image-wrapper": {
    flex: "1 1 0",
    padding: "1em",
    [theme.breakpoints.up("xs")]: {
      marginTop: "2.5vw",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "5vw",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
      padding: "1em 0 1em 2em",
    },
  },
  image: {
    maxWidth: "350px",
    width: "75vw",
  },
  "main-info": {
    flexGrow: 1,
    padding: "2em",
    width: "80%",
  },
  "info-header": {
    padding: "0 1em",
  },
  "title-wrapper": {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: theme.palette.primary.dark,
    marginTop: 0,
    [theme.breakpoints.up("lg")]: {
      alignSelf: "center",
      marginBottom: 0,
    },
  },
  rating: {
    color: theme.palette.primary.contrastText,
    display: "inline-block",
    paddingRight: "0.5em",
    verticalAlign: "middle",
  },
}));

const TabProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const movieOverviewKeys = ["Actors", "Director", "Genre"];

const movieDetailsKeys = [
  "Awards",
  "Country",
  "Language",
  "Production",
  "Released",
  "Type",
  "Website",
  "Writer",
];

interface MoviePresentationProps {
  movie: IMovieExtended;
}

const MoviePresentation: FC<MoviePresentationProps> = ({ movie }) => {
  const { favoriteMovies, miscellaneousData } = useContext(MovieContext);
  const [tabValue, setTabValue] = useState<0 | 1>(0);
  const { isExtraLarge } = useWindowSize();
  const styles = useStyles();
  const { palette } = useTheme();
  const { secondary } = palette;

  const isHeaderFixed = miscellaneousData.headerPosition === HeaderType.FIXED;
  const classes = isHeaderFixed
    ? externalClasses.fixed
    : externalClasses.static;

  const favoriteIds = favoriteMovies.map((movie) => movie.imdbID);
  const isFav = favoriteIds.find((id) => id === movie.imdbID);
  const updatedMovie = useMemo(
    () => ({ ...movie, isFavorite: isFav ? true : false }),
    [isFav, movie]
  );

  const { Plot, Poster, Runtime, Title, Year, imdbRating } = updatedMovie;
  const hasPoster = Poster !== "N/A";

  const filterEmptyData = useCallback(
    (movie: IMovieExtended, keys: string[]) => {
      let filteredMovie: IFilteredMovie = {};

      for (let key in movie) {
        const val = movie[key as keyof IMovieExtended];

        if (
          val !== "N/A" &&
          typeof val === "string" &&
          keys.indexOf(key) >= 0
        ) {
          filteredMovie[key] = val;
        }
      }

      return filteredMovie;
    },
    []
  );

  const parseContent = useCallback((key: string, value: string) => {
    return value === "N/A" ? key + " not cited" : value;
  }, []);

  const tabs: ITabs[] = useMemo(
    () => [
      {
        component: (
          <MovieOverview
            movie={filterEmptyData(movie, movieOverviewKeys)}
            Plot={parseContent("Description", Plot)}
          />
        ),
        label: "Overview",
      },
      {
        component: (
          <MovieDetails movie={filterEmptyData(movie, movieDetailsKeys)} />
        ),
        label: "Details",
      },
    ],
    [Plot, filterEmptyData, movie, parseContent]
  );

  const tabChangeHandler = useCallback(() => {
    setTabValue((prevState) => (prevState === 0 ? 1 : 0));
  }, []);

  return (
    <section className={`${classes} ${styles.container}`}>
      <div className={styles["image-wrapper"]}>
        {hasPoster && (
          <img
            src={Poster}
            alt={parseContent("Title", Title)}
            className={styles.image}
          />
        )}
      </div>
      <div className={styles["main-info"]}>
        <div className={styles["info-header"]}>
          <div className={styles["title-wrapper"]}>
            <h3 className={styles.title}>{Title}</h3>
            {isExtraLarge && <FavoriteIcon movie={updatedMovie} />}
          </div>
          <span className={styles.rating}>
            {parseContent("Rating", imdbRating)}
          </span>
          {!isExtraLarge && <FavoriteIcon movie={updatedMovie} />}
          <p>
            {parseContent("Year", Year)} | {parseContent("Runtime", Runtime)}
          </p>
        </div>
        <Box>
          <Tabs
            value={tabValue}
            onChange={tabChangeHandler}
            aria-label="movie tabs"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                sx={{ color: secondary.contrastText, fontWeight: 600 }}
                label={tab.label}
                {...TabProps(index)}
              />
            ))}
          </Tabs>
          {tabs.map((tab, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              {tab.component}
            </TabPanel>
          ))}
        </Box>
      </div>
    </section>
  );
};

export default MoviePresentation;
