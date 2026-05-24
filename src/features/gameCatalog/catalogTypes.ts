export interface Game {
  id: string;
  title: string;
  genre: string;
  platform: string;
  price: number;
  releaseYear: number;
}

export interface SearchFilters {
  genre: string;
  platform: string;
  releaseYear: string;
}