import React from "react";
import "./MovieCard.css";
import config from "../config/envConfig";

function MovieCard({ item, movieDetailHandler }) {
  return (
    <>
      <div
        className="movieCard__container"
        onClick={() => movieDetailHandler(item)}
      >
        <div className="movieCard__imgContainer">
          <img
            src={config.imgHost + item.poster_path}
            alt="Movie Poster"
            className="movieCard__img"
          />
        </div>
        <div className="movieCard__titleRating">
          <div>
            <strong> {item.title}</strong>
          </div>
          <div>{item.vote_average}/10 </div>
        </div>
        <div className="movieCard__description">{item.overview}</div>
      </div>
    </>
  );
}

export default MovieCard;
