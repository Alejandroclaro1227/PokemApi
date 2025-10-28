import { useFavoritesContext } from '../context/FavoritesContext';

/**
 * Hook personalizado para trabajar con favoritos
 * Abstrae la lógica del contexto
 */
export const useFavorites = () => {
  const context = useFavoritesContext();

  return {
    favorites: context.favorites,
    addFavorite: context.addFavorite,
    removeFavorite: context.removeFavorite,
    isFavorite: context.isFavorite,
    toggleFavorite: context.toggleFavorite,
    favoritesCount: context.favoritesCount,
  };
};




