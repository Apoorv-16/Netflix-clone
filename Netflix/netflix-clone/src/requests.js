const API_KEY = "d6b19df889fe16ed01d742fbbbadd936";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en=us`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en=us`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_generes=28`,
  // fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  // fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  // fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  // fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

  fetchTopComedyMovies: `/discover/movie?api_key=${API_KEY}&with_generes=35&language=en=us`,
  fetchTopHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_generes=27`,
  fetchTopRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_generes=10749`,
  fetchTopDocumentaries: `/discover/movie?api_key=${API_KEY}&with_generes=99`,
};

export default requests;
