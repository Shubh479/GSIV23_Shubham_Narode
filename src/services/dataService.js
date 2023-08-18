import http from "./httpService";
import config from "../config/envConfig";

const host = config.host;
const apiKey = config.apiKey;

export async function getMovieData(page) {
  return await http.get(host + `movie/upcoming?page=${page}`);
}

export async function getSearchedMovieData(data) {
  return await http.get(
    host +
      `/search/movie?query=${data}&include_adult=false&language=en-US&page=1`
  );
}

export async function getMovieDetailesData(data) {
  return await http.get(
    host +
      `/movie/${data}?api_key=${apiKey}&language=en-US&append_to_response=credits`
  );
}
