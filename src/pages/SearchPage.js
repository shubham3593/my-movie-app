import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { useLocation } from 'react-router-dom';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery().get('query');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`);
      setMovies(response.data.results);
    };
    fetchSearchResults();
  }, [query, page]);

  return (
    <div>
      <h1 style={{color:'white'}}>Search Results for "{query}"</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default SearchPage;
