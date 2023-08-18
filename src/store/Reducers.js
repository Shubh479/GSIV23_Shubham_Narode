import { combineReducers } from "@reduxjs/toolkit";
import MovieDetailReducer from "./MovieDetailReducer";
import movieReducer from "./MovieReducer";

export default combineReducers({
  movie_list: movieReducer,
  movieDetail_list: MovieDetailReducer,
});
