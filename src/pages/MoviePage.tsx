/** CUSTOM COMPONENTS */
import MoviePresentation from "../components/movie/movie-presentation/MoviePresentation";

/** LIBRARIES */
import { json, LoaderFunction, useLoaderData } from "react-router-dom";

/** MODELS */
import { CONTENT, OMDB_API_KEY, OMDB_API_URL } from "../model/constants";
import { IMovieExtended } from "../model/Movie";

const Movie = () => {
  const movie = useLoaderData() as IMovieExtended;

  return <MoviePresentation movie={movie} />;
};

export default Movie;

export const loader: LoaderFunction = async ({ request, params }) => {
  const response = await fetch(`${OMDB_API_URL}${OMDB_API_KEY}&i=${params.id}`);

  if (!response.ok) {
    throw json({ message: CONTENT.ERROR_FETCH_MOVIE }, { status: 598 });
  }

  return response;
};
