import { useState, useEffect, type FC, type ChangeEvent, type FormEvent } from 'react';
import { useGameSearch } from '../hooks/useGameSearch';
import type { SearchFilters } from '../catalogTypes';

export const CatalogPage: FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    genre: '',
    platform: '',
    releaseYear: '',
  });

  const { games, loading, error, fetchGames } = useGameSearch();


  useEffect(() => {
    fetchGames(filters);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchGames(filters);
  };

  return (
    <div className="container">
      <h2 className='fz-subtitle fz-fw-xl-600'>Video Game Catalog</h2>
      
      {/* Search Input Form */}
      <form className='Form' onSubmit={handleSearchSubmit} >
        <input
          type="text"
          name="genre"
          placeholder="Filter by Genre (e.g. RPG)"
          value={filters.genre}
          onChange={handleInputChange}
  
        />
        <input
          type="text"
          name="platform"
          placeholder="Filter by Platform (e.g. PC)"
          value={filters.platform}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Filter by Year (e.g. 2022)"
          value={filters.releaseYear}
          onChange={handleInputChange}
        />
        <button className='fz-btn btn fz-btn--primary' type="submit">
          Search
        </button>
      </form>

      {/* State Render Conditions */}
      {loading && <p>Querying distributed catalog engines...</p>}
      {error && <p>Error: {error}</p>}

      {/* Catalog Results Grid */}
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {games.length === 0 ? (
            <p>No games match your database query criteria.</p>
          ) : (
            games.map((game) => (
              <div key={game.id} >
                <h3>{game.title}</h3>
                <p><strong>Genre:</strong> {game.genre}</p>
                <p><strong>Platform:</strong> {game.platform}</p>
                <p><strong>Release Year:</strong> {game.releaseYear}</p>
                <p>${game.price.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
