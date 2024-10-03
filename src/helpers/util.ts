/** MODELS */
import { CONTENT, OMDB_API_KEY, OMDB_API_URL } from "../model/constants";
import {
  IError,
  IMovie,
  IMovieData,
  IMovies,
  PAGE_NUMBER_DEFAULT,
} from "../model/Movie";

export const getMovieData = async (text: string, page?: number) => {
  const pageNum = page || PAGE_NUMBER_DEFAULT;
  const response = await fetch(
    `${OMDB_API_URL}${OMDB_API_KEY}&s=${text}&page=${pageNum}`
  );

  if (!response.ok) {
    throw new Error(CONTENT.ERROR_FETCH_MOVIES);
  }

  const data = (await response.json()) as IMovies;

  if (!data.Search) {
    const errorData = data as unknown as IError;
    return {
      Search: [],
      totalResults: 0,
      error: errorData,
    };
  }

  return data;
};

export const parseMovieData = (
  data: IMovieData[],
  favMoviesIds: string[]
): IMovie[] => {
  const movies: IMovie[] = [];

  for (let movieObj of data) {
    const foundId = favMoviesIds.find((favId) => movieObj.imdbID === favId);
    const movie = { ...movieObj, isFavorite: foundId ? true : false };
    movies.push(movie);
  }
  return movies;
};
