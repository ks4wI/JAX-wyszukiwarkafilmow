import React, { useState } from 'react';

const API_KEY = 'b9904c3f'; 

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    setError('');
    setSelectedMovie(null);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError('Nie znaleziono filmów.');
      }
    } catch {
      setError('Wystąpił problem z połączeniem. Spróbuj ponownie.');
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setError('Nie udało się załadować szczegółów filmu.');
      }
    } catch {
      setError('Wystąpił problem z połączeniem. Spróbuj ponownie.');
    }
  };

  return (
    <div className="app">
      <h1>Wyszukiwarka Filmów</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Wpisz tytuł filmu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchMovies}>Szukaj</button>
      </div>
      {error && <p className="error">{error}</p>}
      {!selectedMovie && (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card" onClick={() => fetchMovieDetails(movie.imdbID)}>
              <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
      {selectedMovie && (
        <div className="movie-details">
          <button onClick={() => setSelectedMovie(null)}>Powrót</button>
          <h2>{selectedMovie.Title}</h2>
          <img src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/150'} alt={selectedMovie.Title} />
          <p><strong>Rok:</strong> {selectedMovie.Year}</p>
          <p><strong>Reżyser:</strong> {selectedMovie.Director}</p>
          <p><strong>Gatunek:</strong> {selectedMovie.Genre}</p>
          <p><strong>Aktorzy:</strong> {selectedMovie.Actors}</p>
          <p><strong>Opis:</strong> {selectedMovie.Plot}</p>
          <p><strong>Ocena IMDb:</strong> {selectedMovie.imdbRating}</p>
        </div>
      )}
    </div>
  );
};

export default App;
