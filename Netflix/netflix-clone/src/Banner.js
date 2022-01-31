import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

function Banner() {
  const [movie, setMovie] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }

    fetchData();
  }, []);

  console.log(movie);

  /* to maintain the overflow for the description we are using overflow function below*/

  function truncate(str, n) {
    return str?.length.n ? str.substr(0, n - 1) + "..." : str;
  }

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=XtMThy8QKqU&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=12
          // first inner parameter gives the whole url for the trailer but we only need the string
          //for the value of v= eg. v=XtMThy8QKqU&list=PL-J2q3Ga50oMQa1JdSJxYoZELwOJAXExP&index=12 so we need only XtMThy8QKqU
          const urlParms = new URLSearchParams(new URL(url).search);
          // this statement searchs the v in the url and then returns everything after v
          setTrailerUrl(urlParms.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {" "}
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__button">
            <button
              className="banner__button"
              onClick={() => handleClick(movie)}
            >
              Play
            </button>

            <button className="banner__button">My List</button>
          </div>
          <h1 className="banner__description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
        <div className="banner__fadeBottom" />
      </header>
      <div>{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}</div>
    </>
  );
}

export default Banner;
