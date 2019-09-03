import axios from "axios";
// import config from "./config";
import store from "./store";
import { push } from "react-router-redux";

export const client = axios.create({ baseURL: `http://localhost:3001/api` });
// Request interceptor
client.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("authorization") || "";
    config.headers = { authorization: token };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Response interceptor
client.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      localStorage.clear();
      store.dispatch(push("/"));
    }
    return Promise.reject(error);
  }
);

export default client;

export const rawClient = axios.create({ baseURL: `http://localhost:3001/api` });
