import { ReactNode } from "react";

export enum HeaderType {
  FIXED = "fixed",
  STATIC = "static",
}

type ResultType = "movie" | "series" | "episode";

export type PaginationProp = "currentPage" | "pages";

type PaginationState = "movies" | "favorite";

type ResponseType = "True" | "False";

export const PAGE_NUMBER_DEFAULT = 1;

export interface IMovieData {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: ResultType;
  Year: string;
}

export interface IMovie extends IMovieData {
  isFavorite: boolean;
}

export interface IMovieState {
  favoriteMovies: IMovie[];
  movies: IMovie[];
  pagination: IPagination;
  searchedText: string;
  miscellaneousData: IMiscellaneous;
  changePagination: (options: IPaginationOptions) => void;
  loadPagination: (paginationObject: IPagination) => void;
  addToFavorite: (movie: IMovie) => void;
  removeFromFavorite: (movie: IMovie) => void;
  loadFavoriteMovies: (movies: IMovie[]) => void,
  processMovieData: (data: IMovieData[]) => IMovie[];
  setNewMovies: (movies: IMovie[]) => void;
  setSearchedString: (text: string) => void;
  changeMiscellaneousData: (key: string, val: any) => void;
}

export interface IMovies {
  Response: boolean;
  Search: IMovieData[];
  totalResults: number;
}

interface IPaginationState {
  currentPage: number;
  pages: number;
}

export interface IPagination {
  movies: IPaginationState;
  favorite: IPaginationState;
}

export interface IPaginationOptions {
  state: PaginationState;
  key: PaginationProp;
  value: number;
}

export interface IError {
  Response: ResponseType;
  Error: string;
}

export interface IFalseResponse {
  Search: never[];
  totalResults: number;
  error: IError;
}

export interface IMovieRating {
  Source: string;
  Value: string;
}

export interface IMovieExtended extends IMovie {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Director: string;
  DVD: string;
  Genre: string;
  Language: string;
  imdbRating: string;
  imdbVotes: string;
  Metascore: string;
  Plot: string;
  Production: string;
  Rated: string;
  Ratings: IMovieRating[];
  Released: string;
  Response: ResponseType;
  Runtime: string;
  Website: string;
  Writer: string;
}

export interface INavLink {
  label: string;
  to: string;
}

export interface ISettings {
  label: string;
  clickHandler: () => void;
}

export interface IMiscellaneous {
  headerPosition: HeaderType;
}

export interface ITabs {
  component: ReactNode;
  label: string;
}

export interface IFilteredMovie {
  [key: string]: string;
}

export interface ILocalStorage {
  favoriteMovies: IMovie[];
  movies: IMovie[];
  pagination: IPagination;
  searchedText: string;
}
