/** LIBRARIES */
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

/** MODELS */
import {
  HeaderType,
  IMiscellaneous,
  IMovie,
  IMovieData,
  IMovieState,
  IPagination,
  IPaginationOptions,
  PAGE_NUMBER_DEFAULT,
} from "../model/Movie";

/** OTHER */
import { parseMovieData } from "../helpers/util";

export const initialPagination = {
  movies: {
    currentPage: PAGE_NUMBER_DEFAULT,
    pages: PAGE_NUMBER_DEFAULT,
  },
  favorite: {
    currentPage: PAGE_NUMBER_DEFAULT,
    pages: PAGE_NUMBER_DEFAULT,
  },
};

const initialMiscellaneousData = {
  headerPosition: HeaderType.STATIC,
};

const initialMovieContext = {
  favoriteMovies: [],
  movies: [],
  pagination: initialPagination,
  searchedText: "",
  miscellaneousData: initialMiscellaneousData,
  changePagination: () => {},
  loadPagination: (paginationObject: IPagination) => {},
  addToFavorite: (movie: IMovie) => {},
  removeFromFavorite: (movie: IMovie) => {},
  loadFavoriteMovies: (movies: IMovie[]) => {},
  processMovieData: (data: IMovieData[]) => [],
  setNewMovies: (movies: IMovie[]) => {},
  setSearchedString: (text: string) => {},
  changeMiscellaneousData: (key: string, val: any) => {},
};

export const MovieContext = createContext<IMovieState>(initialMovieContext);

export const MovieContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [pagination, setPagination] = useState<IPagination>(initialPagination);
  const [searchedText, setSearchedText] = useState<string>("");
  const [miscellaneousData, setMiscellaneousData] = useState<IMiscellaneous>(
    initialMiscellaneousData
  );

  const changeMiscellaneousData = useCallback((key: string, val: any) => {
    setMiscellaneousData((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  }, []);

  const changePagination = useCallback((options: IPaginationOptions) => {
    setPagination((prevState) => {
      const { key, state, value } = options;

      const newState = {
        ...prevState,
        [state]: {
          ...prevState[state],
          [key]: value,
        },
      };
      localStorage.setItem("pagination", JSON.stringify(newState));
      return newState;
    });
  }, []);

  const loadPagination = useCallback((paginationObject: IPagination) => {
    setPagination(paginationObject);
  }, []);

  const changeMovie = useCallback((movie: IMovie) => {
    const updatedMovie = { ...movie, isFavorite: !movie.isFavorite };

    setMovies((prevState) => {
      const updatedMovies = [...prevState];
      const indexOfMovie = updatedMovies.findIndex(
        (mov) => movie.imdbID === mov.imdbID
      );
      updatedMovies[indexOfMovie] = updatedMovie;
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  }, []);

  const addToFavorite = useCallback(
    (movie: IMovie) => {
      changeMovie(movie);
      setFavoriteMovies((prevState) => {
        const newState = [
          ...prevState,
          { ...movie, isFavorite: !movie.isFavorite },
        ];
        localStorage.setItem("favoriteMovies", JSON.stringify(newState));
        return newState;
      });
    },
    [changeMovie]
  );

  const removeFromFavorite = useCallback(
    (movie: IMovie) => {
      changeMovie(movie);
      setFavoriteMovies((prevState) =>
        prevState.filter((favMovie) => favMovie.imdbID !== movie.imdbID)
      );
    },
    [changeMovie]
  );

  const loadFavoriteMovies = useCallback((movies: IMovie[]) => {
    setFavoriteMovies(movies);
  }, []);

  const processMovieData = useCallback(
    (data: IMovieData[]): IMovie[] => {
      const favoriteMoviesIds = favoriteMovies.map((movie) => movie.imdbID);
      return parseMovieData(data, favoriteMoviesIds);
    },
    [favoriteMovies]
  );

  const setNewMovies = useCallback((movies: IMovie[]) => {
    setMovies(movies);
    localStorage.setItem("movies", JSON.stringify(movies));
  }, []);

  const setSearchedString = useCallback((text: string) => {
    setSearchedText(text);
    localStorage.setItem("searchedText", JSON.stringify(text));
  }, []);

  return (
    <MovieContext.Provider
      value={{
        favoriteMovies,
        movies,
        pagination,
        searchedText,
        miscellaneousData,
        changePagination,
        loadPagination,
        addToFavorite,
        removeFromFavorite,
        loadFavoriteMovies,
        processMovieData,
        setNewMovies,
        setSearchedString,
        changeMiscellaneousData,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
