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
        <div className="container">
            <h2>Management Dashboard</h2>

            {/* Dynamic Action Header / Form */}
            <form onSubmit={handleSubmit} >
                <h3>{editingId ? 'Update Existing Game Info' : 'Register New Catalog Entry'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    <input type="text" name="title" placeholder="Game Title" value={formData.title} onChange={handleInputChange} required />
                    <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleInputChange} required />
                    <input type="text" name="platform" placeholder="Platform" value={formData.platform} onChange={handleInputChange} required />
                    <input type="number" name="price" placeholder="Price" value={formData.price || ''} onChange={handleInputChange} required min="0" step="0.01" />
                    <input type="number" name="releaseYear" placeholder="Release Year" value={formData.releaseYear || ''} onChange={handleInputChange} required />
                </div>
                <button type="submit" style={{ padding: '10px 20px', background: editingId ? '#e67e22' : '#2ecc71', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    {editingId ? 'Apply Database Update' : 'Save To Inventory Database'}
                </button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setFormData(initialFormState); }} >
                        Cancel
                    </button>
                )}
            </form>

            {error && <p style={{ color: 'red' }}><strong>Database Communication Exception:</strong> {error}</p>}
            {loading && <p>Syncing data streams...</p>}

            {/* Admin Operations Table */}
            <table className='table'>
                <thead>
                    <tr>
                        <th style={{ padding: '12px' }}>Database UUID (Key)</th>
                        <th style={{ padding: '12px' }}>Title</th>
                        <th style={{ padding: '12px' }}>Genre</th>
                        <th style={{ padding: '12px' }}>Platform</th>
                        <th style={{ padding: '12px' }}>Price</th>
                        <th style={{ padding: '12px' }}>Year</th>
                        <th style={{ padding: '12px', textDirection: 'center' }}>System Management Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>Inventory database is currently clear of records.</td>
                        </tr>
                    ) : (
                        inventory.map((game) => (
                            <tr key={game.id} >
                                <td >{game.id}</td>
                                <td >{game.title}</td>
                                <td >{game.genre}</td>
                                <td >{game.platform}</td>
                                <td >${game.price.toFixed(2)}</td>
                                <td>{game.releaseYear}</td>
                                <td >
                                    <button onClick={() => startEdit(game)} >Edit</button>
                                    <button onClick={() => deleteGame(game.id)} >Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

