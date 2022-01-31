import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // if we leave these brackets [] empty we say  run once and then dont run
    // it is dependent on the elements inside the [] whenever they change this functio must run

    async function fetchData() {
      // if we use await then even if the fetching takes 5 sec , dosent matter it will wait for the time data is fetched .
      //this is done using await
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      //https://api.themoviedb.org/3" along with the fetchURL added to the end of the base url,
      console.log(request);

      return request;
    }
    fetchData();
  }, [fetchUrl]);

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

  // A snippit of code which runs on a specific condition

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/*several row posters*/}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
