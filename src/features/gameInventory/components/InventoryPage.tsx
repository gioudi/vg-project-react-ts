import { useState, useEffect, type ChangeEvent, type FormEvent, type FC } from 'react';
import { useGameInventory } from '../hooks/useGameInventory';
import type { GameFormData, InventoryGame } from '../inventoryTypes';

const initialFormState: GameFormData = {
    title: '',
    genre: '',
    platform: '',
    price: 0,
    releaseYear: 2026
};

export const InventoryPage: FC = () => {
    const { inventory, loading, error, fetchInventory, createGame, updateGame, deleteGame } = useGameInventory();
    const [formData, setFormData] = useState<GameFormData>(initialFormState);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'releaseYear' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (editingId) {
            await updateGame(editingId, formData);
            setEditingId(null);
        } else {
            await createGame(formData);
        }
        setFormData(initialFormState);
    };

    const startEdit = (game: InventoryGame) => {
        setEditingId(game.id);
        setFormData({
            title: game.title,
            genre: game.genre,
            platform: game.platform,
            price: game.price,
            releaseYear: game.releaseYear
        });
    };

    return (
        <div className="container py-5 font-lato">
            <h2 className="fz-subtitle fz-fw-xl-600 rufina-bold text-primary-darkest mb-4">Management Dashboard</h2>

            {/* Dynamic Action Header / Form */}
            <form onSubmit={handleSubmit} className="Form p-4 mb-5 bg-primary-lightest rounded-md shadow-md">
                <h3 className="fz-h5 rufina-bold text-primary-darker mb-4">
                    {editingId ? 'Update Existing Game Info' : 'Register New Catalog Entry'}
                </h3>
                
                <div className="row g-3 mb-4">
                    <div className="col-12 col-md-4">
                        <input 
                            type="text" 
                            name="title" 
                            className="form-control rounded-sm border-0 shadow-sm px-3 py-2 text-size-normal"
                            placeholder="Game Title" 
                            value={formData.title} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <input 
                            type="text" 
                            name="genre" 
                            className="form-control rounded-sm border-0 shadow-sm px-3 py-2 text-size-normal"
                            placeholder="Genre" 
                            value={formData.genre} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <input 
                            type="text" 
                            name="platform" 
                            className="form-control rounded-sm border-0 shadow-sm px-3 py-2 text-size-normal"
                            placeholder="Platform" 
                            value={formData.platform} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input 
                            type="number" 
                            name="price" 
                            className="form-control rounded-sm border-0 shadow-sm px-3 py-2 text-size-normal"
                            placeholder="Price" 
                            value={formData.price || ''} 
                            onChange={handleInputChange} 
                            required 
                            min="0" 
                            step="0.01" 
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input 
                            type="number" 
                            name="releaseYear" 
                            className="form-control rounded-sm border-0 shadow-sm px-3 py-2 text-size-normal"
                            placeholder="Release Year" 
                            value={formData.releaseYear || ''} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <button 
                        type="submit" 
                        className={`fz-btn btn text-white rounded-sm shadow-sm px-4 fw-bold ${editingId ? 'bg-gray-dark' : 'fz-btn--primary'}`}
                    >
                        {editingId ? 'Apply Database Update' : 'Save To Inventory Database'}
                    </button>
                    
                    {editingId && (
                        <button 
                            type="button" 
                            className="fz-btn btn fz-btn--secondary rounded-sm shadow-sm px-4"
                            onClick={() => { setEditingId(null); setFormData(initialFormState); }} 
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {error && (
                <div className="alert alert-danger rounded-md shadow-sm lato-bold mb-4" role="alert">
                    <strong>Database Communication Exception:</strong> {error}
                </div>
            )}
            
            {loading && (
                <div className="text-center my-4">
                    <div className="spinner-border text-success mb-2" role="status"></div>
                    <p className="lato-regular-italic text-gray-dark">Syncing data streams...</p>
                </div>
            )}

            {/* Admin Operations Table */}
            <div className="table-responsive bg-white rounded-md shadow-md p-3">
                <table className="table table-hover align-middle m-0">
                    <thead className="table-light text-secondary font-rufina fz-small">
                        <tr>
                            <th className="py-3 px-3">Database UUID (Key)</th>
                            <th className="py-3">Title</th>
                            <th className="py-3">Genre</th>
                            <th className="py-3">Platform</th>
                            <th className="py-3">Price</th>
                            <th className="py-3">Year</th>
                            <th className="py-3 text-center">System Management Actions</th>
                        </tr>
                    </thead>
                    <tbody className="lato-regular text-size-normal">
                        {inventory.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-5 text-center text-gray-light bg-white">
                                    Inventory database is currently clear of records.
                                </td>
                            </tr>
                        ) : (
                            inventory.map((game) => (
                                <tr key={game.id}>
                                    <td className="px-3 text-size-small text-gray-dark font-monospace">{game.id}</td>
                                    <td className="lato-bold text-primary-darkest">{game.title}</td>
                                    <td><span className="badge bg-gray-light text-dark fw-normal rounded-xs px-2 py-1">{game.genre}</span></td>
                                    <td><span className="badge bg-primary-light text-dark fw-normal rounded-xs px-2 py-1">{game.platform}</span></td>
                                    <td className="lato-bold text-primary-darker">${game.price.toFixed(2)}</td>
                                    <td>{game.releaseYear}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button 
                                                onClick={() => startEdit(game)} 
                                                className="fz-btn btn fz-btn--small fz-btn--secondary rounded-sm shadow-sm"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => deleteGame(game.id)} 
                                                className="fz-btn btn fz-btn--small btn-outline-danger border rounded-sm shadow-sm bg-transparent"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

