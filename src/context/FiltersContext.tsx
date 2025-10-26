import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

/**
 * Context para manejar los filtros de Pokémon
 */

interface FiltersContextType {
  selectedTypes: string[];
  searchTerm: string;
  addTypeFilter: (type: string) => void;
  removeTypeFilter: (type: string) => void;
  toggleTypeFilter: (type: string) => void;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const addTypeFilter = (type: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) return prev;
      return [...prev, type];
    });
  };

  const removeTypeFilter = (type: string) => {
    setSelectedTypes(prev => prev.filter(t => t !== type));
  };

  const toggleTypeFilter = (type: string) => {
    if (selectedTypes.includes(type)) {
      removeTypeFilter(type);
    } else {
      addTypeFilter(type);
    }
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSearchTerm('');
  };

  const hasActiveFilters =
    selectedTypes.length > 0 || searchTerm.trim().length > 0;

  const value: FiltersContextType = useMemo(
    () => ({
      selectedTypes,
      searchTerm,
      addTypeFilter,
      removeTypeFilter,
      toggleTypeFilter,
      setSearchTerm,
      clearFilters,
      hasActiveFilters,
    }),
    [selectedTypes, searchTerm, hasActiveFilters]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFiltersContext must be used within FiltersProvider');
  }
  return context;
};
