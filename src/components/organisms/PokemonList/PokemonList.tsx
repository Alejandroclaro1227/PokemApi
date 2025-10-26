import { useNavigate } from 'react-router-dom';
import type { Pokemon } from '../../../types/pokemon.types';
import { Button } from '../../atoms/Button/Button';
import { Loading } from '../../atoms/Loading/Loading';
import { PokemonCard } from '../../molecules/PokemonCard/PokemonCard';
import styles from './PokemonList.module.css';

/**
 * Componente PokemonList organism
 * Lista de Pokémon con paginación
 */

export interface PokemonListProps {
  pokemons: Pokemon[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  emptyMessage?: string;
}

export const PokemonList = ({
  pokemons,
  loading = false,
  onLoadMore,
  hasMore = false,
  emptyMessage = 'No se encontraron Pokémon',
}: PokemonListProps) => {
  const navigate = useNavigate();

  const handlePokemonClick = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  if (loading && pokemons.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <Loading size="lg" text="Cargando Pokémon..." />
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>😔</span>
        <h3 className={styles.emptyTitle}>{emptyMessage}</h3>
        <p className={styles.emptyText}>
          Intenta ajustar los filtros o realizar otra búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className={styles.pokemonListWrapper}>
      <div className={styles.pokemonGrid}>
        {pokemons.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handlePokemonClick(pokemon.id)}
          />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className={styles.loadMoreContainer}>
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            disabled={loading}
            className={styles.loadMoreButton}
          >
            {loading ? (
              <>
                <Loading size="sm" />
                <span>Cargando más...</span>
              </>
            ) : (
              'Cargar más Pokémon'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};


