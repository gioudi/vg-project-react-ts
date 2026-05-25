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
  <div className="container py-5 font-lato">
    <h2 className='fz-subtitle fz-fw-xl-600 rufina-bold text-primary-darkest mb-4 text-center text-md-start'>Video Game Catalog</h2>
    
    {/* Search Input Form */}
    <form className='Form row g-3 mb-5 p-4 bg-primary-lightest rounded-md shadow-sm align-items-end' onSubmit={handleSearchSubmit} >
      
      <div className="col-12 col-md-3">
        <label className="form-label lato-bold fz-small text-gray-dark mb-1">Genre</label>
        <input
          type="text"
          name="genre"
          className="form-control rounded-sm border-0 shadow-sm px-3 py-2 text-size-normal lato-regular"
          placeholder="Filter by Genre (e.g. RPG)"
          value={filters.genre}
          onChange={handleInputChange}
        />
      </div>

      <div className="col-12 col-md-3">
        <label className="form-label lato-bold fz-small text-gray-dark mb-1">Platform</label>
        <input
          type="text"
          name="platform"
          className="form-control rounded-sm border-0 shadow-sm px-3 py-2 text-size-normal lato-regular"
          placeholder="Filter by Platform (e.g. PC)"
          value={filters.platform}
          onChange={handleInputChange}
        />
      </div>

      <div className="col-12 col-md-3">
        <label className="form-label lato-bold fz-small text-gray-dark mb-1">Release Year</label>
        <input
          type="number"
          name="releaseYear"
          className="form-control rounded-sm border-0 shadow-sm px-3 py-2 text-size-normal lato-regular"
          placeholder="Filter by Year (e.g. 2022)"
          value={filters.releaseYear}
          onChange={handleInputChange}
        />
      </div>

      <div className="col-12 col-md-3 d-grid">
        <button className='fz-btn btn fz-btn--primary rounded-sm shadow-sm justify-content-center ' type="submit">
          Search
        </button>
      </div>
    </form>

    {/* State Render Conditions */}
    {loading && (
      <div className="text-center my-4">
        <div className="spinner-border text-success mb-2" role="status"></div>
        <p className="lato-regular-italic text-gray-dark">Querying distributed catalog engines...</p>
      </div>
    )}
    
    {error && (
      <div className="alert alert-danger rounded-md shadow-sm lato-bold" role="alert">
        Error: {error}
      </div>
    )}

    {/* Catalog Results Grid */}
    {!loading && !error && (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {games.length === 0 ? (
          <div className="w-100 text-center p-5 bg-white rounded-md shadow-sm border">
            <p className="lato-regular text-gray-dark m-0">No games match your database query criteria.</p>
          </div>
        ) : (
          games.map((game) => (
            <div key={game.id} className="card h-100 border-0 bg-white shadow-md rounded-md p-4 transition-all hover-shadow">
              <h3 className="fz-h5 rufina-bold text-primary-darkest mb-3 border-bottom pb-2">{game.title}</h3>
              <div className="mb-3 lato-regular text-gray-dark text-size-normal">
                <p className="mb-1"><strong>Genre:</strong> <span className="badge bg-gray-light text-dark fw-normal rounded-xs px-2 py-1 ms-1">{game.genre}</span></p>
                <p className="mb-1"><strong>Platform:</strong> <span className="badge bg-primary-light text-dark fw-normal rounded-xs px-2 py-1 ms-1">{game.platform}</span></p>
                <p className="mb-0"><strong>Release Year:</strong> <span className="ms-1">{game.releaseYear}</span></p>
              </div>
              <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
                <span className="fz-small lato-bold text-gray-light">PRICE</span>
                <p className="m-0 fz-h6 lato-black text-primary-darker">${game.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    )}
  </div>
);
};
