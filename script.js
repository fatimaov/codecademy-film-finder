import { clearCurrentMovie, populateGenreDropdown, getSelectedGenre} from "./helpers.js";

const tmdbKey = window.TMDB_API_KEY;
const tmbdBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndPoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmbdBaseUrl+genreRequestEndPoint+requestParams;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres;
            return genres;
        }

    } catch (error) {
        console.log(error);
    }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndPoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = tmbdBaseUrl+discoverMovieEndPoint+requestParams;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
        const jsonResponse = await response.json();
        const movies = jsonResponse.results;
        return movies;
    }

  } catch (error) {
    console.log(error);
  }

};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndPoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmbdBaseUrl+movieEndPoint+requestParams;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const movieInfo = await response.json();
            return movieInfo;
        }

    } catch (error) {
        console.log(error);
    }

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;

