import React, { useEffect, useState } from "react";
import Header from "../Header";
import config from "../../config/envConfig";
import "./MovieDetails.css";
import store from "../../store/Store";
import { useParams } from "react-router-dom";
import { getMovieDetailesData } from "../../services/dataService";
import * as actionType from "../../store/ActionTypes";
import { dispatcher } from "../../store/storeHelpers";
import { PulseLoader } from "react-spinners";
import moment from "moment";
import { convertMinutesToHHMM } from "../../utils/convertUnits";

function MovieDetails() {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [castName, setCastName] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setData(store.getState().movieDetail_list);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    async function getData() {
      try {
        setLoader(true);
        const response = await getMovieDetailesData(id);
        dispatcher(actionType.GET_MOVIES_LIST_BY_ID, response.data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    }
    getData();
  }, [id]);

  useEffect(() => {
    let castList = "";
    if (Object.keys(data).length !== 0) {
      for (let i = 0; i < data.credits.cast.length; i++) {
        if (i !== data.credits.cast.length - 1) {
          castList += data.credits.cast[i].name + ",";
        } else {
          castList += data.credits.cast[i].name + ".";
        }
      }
    }
    setCastName(castList);
  }, [data]);

  return (
    <>
      <Header />
      {!loader && (
        <div className="movieDetail__card">
          <div className="movieDetail__div1">
            <img
              src={config.imgHost2 + data.poster_path}
              alt="Movie Poster"
              width="150px"
            />
          </div>
          <div className="movieDetail__div2">
            <div className="movieDetail__inner_div2">
              <div className="movieDetail__div2_title">{data.title}</div>
              <div className="movieDetail__div2_rating">
                ({Math.round(data.vote_average).toFixed(1)}/10)
              </div>
            </div>
            <div className="movieDetail__div2_dateAndLength">
              <strong> Release Date - </strong>{" "}
              {moment(data.release_date).format("DD-MM-YY")} |
              <strong> Length - </strong> {convertMinutesToHHMM(data.runtime)}
            </div>
            <div>
              {" "}
              <strong> Cast - </strong>
              <span>{castName}</span>
            </div>
            <div>
              <strong> Description - </strong> {`${data.overview}`}
            </div>
          </div>
        </div>
      )}
      {loader && (
        <PulseLoader
          color="#007bff"
          size="20px"
          margin="10px"
          style={{ position: "absolute", top: "45vh", left: "40%" }}
        />
      )}
    </>
  );
}

export default MovieDetails;
