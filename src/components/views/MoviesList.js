import React, { useEffect, useState } from "react";
import Header from "../Header";
import MovieCard from "../MovieCard";
import { getMovieData } from "../../services/dataService";
import config from "../../config/envConfig";
import http from "../../services/httpService";
import "./MoviesList.css";
import { PulseLoader } from "react-spinners";
import { dispatcher } from "../../store/storeHelpers";
import * as actionType from "../../store/ActionTypes";
import store from "../../store/Store";
import { useHistory } from "react-router-dom";
import noData from "../../assets/img/no_data_found_dashboard.png";

function MoviesList() {
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [noDataImg, setNoDataImg] = useState(false);
  http.setTokenInHeader(config.token);

  const history = useHistory();

  function movieDetailHandler(item) {
    history.push(`/details/${item.id}`);
  }

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setData([...data, ...Object.values(store.getState().movie_list)]);
      setMainData([...data, ...Object.values(store.getState().movie_list)]);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    async function getData() {
      try {
        setLoader(true);
        const response = await getMovieData(currentPage);
        dispatcher(actionType.GET_MOVIES_LIST, response.data.results);
        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    }
    getData();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (!searchValue) {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollHeight - (scrollTop + clientHeight) < 50) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchValue]);

  return (
    <>
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        mainData={mainData}
        setData={setData}
        setNoDataImg={setNoDataImg}
      />
      <div className="movieList__cardItems">
        {data.map((item) => {
          return (
            <MovieCard
              key={item.id}
              item={item}
              movieDetailHandler={(datas) => movieDetailHandler(datas)}
            />
          );
        })}
      </div>
      {noDataImg && !loader && data.length === 0 && (
        <div>
          <img
            src={noData}
            alt="No Data Found"
            className="movieList__noDataFoundImg"
            width="40%"
          />
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

export default MoviesList;
