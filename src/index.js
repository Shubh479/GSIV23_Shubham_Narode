import React from "react";
import ReactDOM from "react-dom";
// import { Switch, Route, BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/shards.min.css";
import "./assets/css/uicons-regular-rounded.css";
import "./assets/css/style.css";
import MoviesList from "./components/views/MoviesList";
import MovieDetails from "./components/views/MovieDetails";

toast.configure();

const RouteApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route exact path="/details/:id" component={MovieDetails} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <RouteApp></RouteApp>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
