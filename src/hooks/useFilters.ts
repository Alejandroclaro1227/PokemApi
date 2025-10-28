import { useFiltersContext } from '../context/FiltersContext';
import type { Pokemon } from '../types/pokemon.types';

/**
 * Hook personalizado para trabajar con filtros
 */
export const useFilters = () => {
  const context = useFiltersContext();

  /**
   * Filtra los Pokémon según los criterios activos
   */
  const filterPokemons = (pokemons: Pokemon[]): Pokemon[] => {
    let filtered = [...pokemons];

    // Filtrar por tipos seleccionados
    if (context.selectedTypes.length > 0) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type =>
          context.selectedTypes.includes(type.name.toLowerCase())
        )
      );
    }

    // Filtrar por término de búsqueda
    if (context.searchTerm.trim().length > 0) {
      const searchLower = context.searchTerm.toLowerCase();
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  return {
    selectedTypes: context.selectedTypes,
    searchTerm: context.searchTerm,
    addTypeFilter: context.addTypeFilter,
    removeTypeFilter: context.removeTypeFilter,
    toggleTypeFilter: context.toggleTypeFilter,
    setSearchTerm: context.setSearchTerm,
    clearFilters: context.clearFilters,
    hasActiveFilters: context.hasActiveFilters,
    filterPokemons,
  };
};




