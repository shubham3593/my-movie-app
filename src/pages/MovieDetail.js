import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
      setMovie(movieResponse.data);

      const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
      setCast(castResponse.data.cast);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <div className="movie-detail-header" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}>
        <div className="movie-detail-content">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p className="rating">Rating: {movie.vote_average}</p>
            <p className="details">{movie.runtime} min | {movie.genres.map(genre => genre.name).join(', ')} | Release Date: {movie.release_date}</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      <h2 className="cast-title">Cast</h2>
      <div className="cast-list">
        {cast.slice(0, 10).map((actor) => (
          <div key={actor.cast_id} className="cast-card">
            <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} className="cast-image" />
            <p className="cast-name">{actor.name}</p>
            <p className="cast-character">Character: {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;
