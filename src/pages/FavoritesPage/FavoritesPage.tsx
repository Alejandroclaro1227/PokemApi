import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/atoms/Loading/Loading';
import { PokemonCard } from '../../components/molecules/PokemonCard/PokemonCard';
import { MainLayout } from '../../components/templates/MainLayout/MainLayout';
import { useFavorites } from '../../hooks/useFavorites';
import { usePokemonList } from '../../hooks/usePokemon';
import type { Pokemon } from '../../types/pokemon.types';
import styles from './FavoritesPage.module.css';

/**
 * Página de Pokémon favoritos
 */

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { pokemons, loading } = usePokemonList(1000, 0); // Cargar suficientes para encontrar favoritos

  const handlePokemonClick = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  // Filtrar solo los Pokémon favoritos
  const favoritePokemons = pokemons.filter((pokemon: Pokemon) =>
    favorites.includes(pokemon.id)
  );

  if (loading && favoritePokemons.length === 0) {
    return (
      <MainLayout>
        <div className={styles.favoritesPage}>
          <Loading size="lg" text="Cargando favoritos..." />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.favoritesPage}>
        {/* Header */}
        <section className={styles.header}>
          <h1 className={styles.title}>❤️ Mis Pokémon Favoritos</h1>
          <p className={styles.subtitle}>
            {favorites.length === 0
              ? 'Aún no has agregado ningún Pokémon a favoritos'
              : `Tienes ${favorites.length} Pokémon ${
                  favorites.length === 1 ? 'favorito' : 'favoritos'
                }`}
          </p>
        </section>

        {/* Content */}
        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>💔</span>
            <h2 className={styles.emptyTitle}>No hay favoritos todavía</h2>
            <p className={styles.emptyText}>
              Explora la lista de Pokémon y agrega tus favoritos haciendo clic
              en el corazón
            </p>
            <button
              onClick={() => navigate('/')}
              className={styles.exploreButton}
            >
              Explorar Pokémon
            </button>
          </div>
        ) : (
          <section className={styles.gridSection}>
            <div className={styles.pokemonGrid}>
              {favoritePokemons.map((pokemon: Pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={() => handlePokemonClick(pokemon.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};
