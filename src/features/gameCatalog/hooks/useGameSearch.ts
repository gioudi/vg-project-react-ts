import { useState } from "react";
import { gatewayClient } from "../../../services/gatewayClient";
import type { Game, SearchFilters } from "../catalogTypes"

export const useGameSearch = () => {
    const [games, setGames] =useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);


    const fetchGames = async (filters: SearchFilters) => {
        setLoading(true);
        setError(false);
        try {
            const queryParams = new URLSearchParams();
            if(filters.genre) queryParams.append('genre', filters.genre);
            if(filters.platform) queryParams.append('platform', filters.platform);
            if(filters.releaseYear) queryParams.append('releaseYear', filters.releaseYear);


            const response = await gatewayClient.get<Game[]>(`/search?${queryParams.toString()}`);

            setGames(response.data);
        } catch (err: any) {
            setError(err.message  || 'An error occurred while fetching catalog data.');
        } finally {
            setLoading(false);
        }
    }

    return {games, loading, error, fetchGames};
}