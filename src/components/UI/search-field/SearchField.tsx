/** COMPONENTS */
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

/** CUSTOM COMPONENTS */
import ErrorMessage from "../error-message/ErrorMessage";

/** LIBRARIES */
import { ChangeEvent, useCallback, useContext, useState } from "react";

/** MODELS */
import { CONTENT, RECORDS_PER_PAGE } from "../../../model/constants";
import {
  HeaderType,
  IError,
  IFalseResponse,
  PAGE_NUMBER_DEFAULT,
} from "../../../model/Movie";

/** OTHER */
import { MovieContext } from "../../../store/MovieContext";
import { getMovieData } from "../../../helpers/util";

/** STYLES */
import styles from "./SearchField.module.css";

const SearchField = () => {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [error, setError] = useState<string | null>(null);
  const {
    searchedText,
    miscellaneousData,
    setSearchedString,
    setNewMovies,
    changePagination,
    processMovieData,
  } = useContext(MovieContext);

  const isHeaderFixed = miscellaneousData.headerPosition === HeaderType.FIXED;
  const classes = `${styles.container} ${
    isHeaderFixed ? styles.fixed : styles.static
  }`;

  const searchHandler = useCallback(() => {
    if (searchedText.length === 0) {
      setError(CONTENT.ERROR_EMPTY_SEARCH_FIELD);
      return;
    }

    changePagination({
      key: "currentPage",
      state: "movies",
      value: PAGE_NUMBER_DEFAULT,
    });
    setError(null);

    getMovieData(searchedText)
      .then((responseData) => {
        const { Search, totalResults } = responseData;

        if (Search.length === 0) {
          const { error } = responseData as IFalseResponse;
          const { Error } = error as IError;

          setError(Error);
          setNewMovies([]);
          changePagination({
            key: "pages",
            state: "movies",
            value: PAGE_NUMBER_DEFAULT,
          });

          return;
        }

        changePagination({
          key: "pages",
          state: "movies",
          value: Math.ceil(totalResults / RECORDS_PER_PAGE),
        });

        const movies = processMovieData(Search);
        setNewMovies(movies);
      })
      .catch((error) => {
        const errorMessage =
          typeof error === "string"
            ? error
            : "message" in error
            ? error.message
            : CONTENT.ERROR_FETCH_MOVIES;
        setError(errorMessage);
        return;
      });
  }, [changePagination, processMovieData, searchedText, setNewMovies]);

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      setShowClearIcon(val === "" ? "none" : "flex");
      setSearchedString(val);
    },
    [setSearchedString]
  );

  const clearHandler = useCallback(
    () => setSearchedString(""),
    [setSearchedString]
  );

  const keyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") searchHandler();
    },
    [searchHandler]
  );

  const errorCloseHandler = useCallback(() => setError(null), []);

  return (
    <>
      {error && (
        <ErrorMessage message={error} onErrorClose={errorCloseHandler} />
      )}
      <section className={classes}>
        <FormControl>
          <TextField
            size="small"
            variant="outlined"
            onChange={changeHandler}
            value={searchedText}
            InputProps={{
              onKeyDown: keyDownHandler,
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer" }}
                  onClick={searchHandler}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ display: showClearIcon, cursor: "pointer" }}
                  onClick={clearHandler}
                >
                  <ClearIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </FormControl>
      </section>
    </>
  );
};

export default SearchField;
