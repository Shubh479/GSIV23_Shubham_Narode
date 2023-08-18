import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import { Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useHistory } from "react-router-dom";
import { getSearchedMovieData } from "../services/dataService";
import { toast } from "react-toastify";

function Header({
  searchValue,
  setSearchValue,
  mainData,
  setData,
  setNoDataImg,
}) {
  const history = useHistory();

  async function changeHandler(e) {
    setSearchValue(e.target.value);
    if (e.target.value.length >= 2) {
      try {
        const response = await getSearchedMovieData(e.target.value);
        setData(response.data.results);
        if (response.data.results.length === 0) {
          setNoDataImg(true);
        }
      } catch (error) {
        toast.error("Unable to get searched result, try with another keywords");
      }
    } else {
      setData(mainData);
    }
  }
  return (
    <>
      <div className="Header__container">
        <div className="Header__searchContainer">
          {window.location.pathname === "/" && (
            <TextField
              variant="outlined"
              value={searchValue}
              name="LoginId"
              onChange={changeHandler}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  width: "40vw",
                  height: "35px",
                },
              }}
              placeholder="Search"
              className="Header__search"
            />
          )}
          {window.location.pathname !== "/" && (
            <div className="headerText">Movie Details</div>
          )}
        </div>
        <Button type="button" onClick={() => history.push("/")}>
          <HomeIcon fontSize="medium" />
        </Button>
      </div>
    </>
  );
}

export default Header;
