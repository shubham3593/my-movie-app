import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  return (
    <nav style={{ display: 'flex', alignItems: 'center', padding: '1rem', backgroundColor: '#1c1c1c' }}>
      <Link 
        to="/" 
        style={{ flex: 1, color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}
      >
        My Movies
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>Popular Movies</Link>
        <Link to="/top-rated" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>Top Rated</Link>
        <Link to="/upcoming" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>Upcoming</Link>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
    
  );
}

export default Navbar;
