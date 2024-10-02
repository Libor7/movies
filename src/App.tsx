/** COMPONENTS */
import CircularProgress from "@mui/material/CircularProgress";

import MainLayout, {
  loader as MainLayoutLoader,
} from "./components/layout/main-layout/MainLayout";
import Error from "./pages/ErrorPage";
import { loader as MovieDetailLoader } from "./pages/MoviePage";

/** LIBRARIES */
import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

const Movies = lazy(() => import("./pages/MoviesPage"));
const Movie = lazy(() => import("./pages/MoviePage"));
const FavoriteMovies = lazy(() => import("./pages/FavoriteMoviesPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    id: "root",
    loader: MainLayoutLoader,
    children: [
      { index: true, loader: async () => redirect("movies") },
      { path: "movies", element: <Movies /> },
      { path: "movies/:id", element: <Movie />, loader: MovieDetailLoader },
      { path: "favorite-movies", element: <FavoriteMovies /> },
      {
        path: "favorite-movies/:id",
        element: <Movie />,
        loader: MovieDetailLoader,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense
      fallback={
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
          color="primary"
          size="4em"
        />
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
