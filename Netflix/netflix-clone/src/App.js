import React from "react";
import "./App.css";
import requests from "./requests";
import Row from "./Row";
import Banner from "./Banner";
import Nav from "./Nav";
import Footer from "./Footer";
//import Youtube from "react-youtube";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchTopComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchTopHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchTopRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchTopDocumentaries} />

      <Footer />
    </div>
  );
}

export default App;
