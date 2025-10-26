import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/**
 * Context para manejar los Pokémon favoritos
 * Persiste en localStorage
 */

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (pokemonId: number) => void;
  removeFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  toggleFavorite: (pokemonId: number) => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const FAVORITES_STORAGE_KEY = 'pokemon-favorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Cargar favoritos del localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const addFavorite = (pokemonId: number) => {
    setFavorites(prev => {
      if (prev.includes(pokemonId)) return prev;
      return [...prev, pokemonId];
    });
  };

  const removeFavorite = (pokemonId: number) => {
    setFavorites(prev => prev.filter(id => id !== pokemonId));
  };

  const isFavorite = (pokemonId: number): boolean => {
    return favorites.includes(pokemonId);
  };

  const toggleFavorite = (pokemonId: number) => {
    if (isFavorite(pokemonId)) {
      removeFavorite(pokemonId);
    } else {
      addFavorite(pokemonId);
    }
  };

  const value: FavoritesContextType = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
      favoritesCount: favorites.length,
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      'useFavoritesContext must be used within FavoritesProvider'
    );
  }
  return context;
};
