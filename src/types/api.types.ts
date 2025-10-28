/**
 * Tipos para manejo de estados de API
 */

export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
}

export interface PaginationState {
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface FilterState {
  types: string[];
  searchTerm: string;
}




