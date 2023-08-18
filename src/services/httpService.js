import axios from "axios";
import { toast } from "react-toastify";
import config from "../config/envConfig";

var auth_token = "";

function setTokenInHeader() {
  auth_token = `${config.token}`;
}

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status === 500;

  if (expectedError) {
    toast.error("Please check internet connection..!!");
  }
  return Promise.reject(error);
});

axios.interceptors.request.use(function (config) {
  if (config.headers["Authorization"] === undefined) {
    if (auth_token) {
      config.headers["Authorization"] = `Bearer ${auth_token}`;
      return config;
    }
    return config;
  }
  return config;
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setTokenInHeader,
};

export default http;
