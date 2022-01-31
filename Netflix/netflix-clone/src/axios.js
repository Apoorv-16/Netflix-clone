import axios from "axios";

// base URl to make request to movies database//
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default instance;
