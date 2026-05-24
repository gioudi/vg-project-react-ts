import { useState } from "react";
import { gatewayClient } from "../../../services/gatewayClient";
import type { GameFormData, InventoryGame } from "../inventoryTypes";


export const useGameInventory = () => {
    const [inventory, setInventory] = useState<InventoryGame[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);



    // Read all existing records from the Inventory database instance
    const fetchInventory = async () => {
        setLoading(true);
        try {
            const response = await gatewayClient.get<InventoryGame[]>('/inventory');
            setInventory(response.data)
        } catch (err: any) {
           setError(err.message || 'Failed to fetch inventory form server.');
        } finally {
            setLoading(false);
        }
    }

    // Create (POST) a fresh game entity

    const createGame = async (gameData: GameFormData) => {
        setLoading(true);
        try {
            await gatewayClient.post('/inventory', gameData);
            await fetchInventory();
        } catch (err: any) {
           setError(err.message || 'Failed to persist new game entry.');
        } finally {
            setLoading(false);
        }
    }


   // Update (PUT) an existing entity by its unique UUID bound path

    const updateGame = async (id: string, gameData: GameFormData) => {
        setLoading(true);
        try {
            await gatewayClient.put(`/inventory/${id}`, gameData);
            await fetchInventory();
        } catch (err: any) {
           setError(err.message || 'Failed to modify game configuration.');
        } finally {
            setLoading(false);
        }
    }


       // Delete (DELETE) an existing and intercept the 204 status cleanly

    const deleteGame = async (id: string) => {
        setLoading(true);
        try {
            await gatewayClient.delete(`/inventory/${id}`);
            await fetchInventory();
        } catch (err: any) {
           setError(err.message || 'Failed to execute resource erasure.');
        } finally {
            setLoading(false);
        }
    } 

    return {inventory, loading, error, fetchInventory, createGame, updateGame, deleteGame}
}