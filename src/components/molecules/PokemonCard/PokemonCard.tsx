import { useFavorites } from '../../../hooks/useFavorites';
import type { Pokemon } from '../../../types/pokemon.types';
import { capitalize, getBestImage, getTypeColor } from '../../../utils/helpers';
import { Badge } from '../../atoms/Badge/Badge';
import { Card } from '../../atoms/Card/Card';
import styles from './PokemonCard.module.css';

/**
 * Componente PokemonCard molecule
 * Tarjeta que muestra información básica de un Pokémon
 */

export interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(pokemon.id);
  };

  const imageUrl = getBestImage(pokemon.sprites, pokemon.id);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card hoverable className={styles.pokemonCard}>
      <div className={styles.favoriteButton}>
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className={styles.favButton}
        >
          <span className={isFav ? styles.heartFilled : styles.heartEmpty}>
            {isFav ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      <div
        className={styles.clickableArea}
        onClick={handleCardClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCardClick();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={`${capitalize(pokemon.name)} sprite`}
            className={styles.pokemonImage}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <span className={styles.pokemonId}>
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <h3 className={styles.pokemonName}>{capitalize(pokemon.name)}</h3>

          <div className={styles.types}>
            {pokemon.types.map(type => (
              <Badge key={type.name} color={getTypeColor(type.name)} size="sm">
                {type.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
