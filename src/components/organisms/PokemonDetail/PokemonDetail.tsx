import { useFavorites } from '../../../hooks/useFavorites';
import type { PokemonDetail as PokemonDetailType } from '../../../types/pokemon.types';
import {
  capitalize,
  formatGeneration,
  formatHeight,
  formatStatName,
  formatWeight,
  getBestImage,
} from '../../../utils/helpers';
import { Button } from '../../atoms/Button/Button';
import { Card } from '../../atoms/Card/Card';
import { TypeBadge } from '../../molecules/TypeBadge/TypeBadge';
import styles from './PokemonDetail.module.css';

/**
 * Componente PokemonDetail organism
 * Vista detallada de un Pokémon
 */

export interface PokemonDetailProps {
  pokemon: PokemonDetailType;
  onBack?: () => void;
}

export const PokemonDetail = ({ pokemon, onBack }: PokemonDetailProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(pokemon.id);

  const imageUrl = getBestImage(pokemon.sprites, pokemon.id);

  // Calcular total de stats
  const totalStats = pokemon.stats.reduce(
    (sum, stat) => sum + stat.base_stat,
    0
  );
  const maxStat = Math.max(...pokemon.stats.map(s => s.base_stat));

  return (
    <div className={styles.pokemonDetail}>
      <div className={styles.header}>
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className={styles.backButton}
          >
            ← Volver
          </Button>
        )}
      </div>

      <Card className={styles.mainCard}>
        <div className={styles.content}>
          {/* Columna izquierda: Imagen y info básica */}
          <div className={styles.leftColumn}>
            <div className={styles.imageSection}>
              <img
                src={imageUrl}
                alt={`${capitalize(pokemon.name)} sprite`}
                className={styles.pokemonImage}
              />
              <Button
                variant={isFav ? 'danger' : 'outline'}
                fullWidth
                onClick={() => toggleFavorite(pokemon.id)}
                className={styles.favoriteButton}
              >
                {isFav ? '❤️ Quitar de Favoritos' : '🤍 Agregar a Favoritos'}
              </Button>
            </div>

            <div className={styles.basicInfo}>
              <span className={styles.pokemonId}>
                #{String(pokemon.id).padStart(3, '0')}
              </span>
              <h1 className={styles.pokemonName}>{capitalize(pokemon.name)}</h1>

              <div className={styles.types}>
                {pokemon.types.map(type => (
                  <TypeBadge key={type.name} type={type} size="lg" />
                ))}
              </div>

              <div className={styles.generation}>
                <span className={styles.genLabel}>Generación:</span>
                <span className={styles.genValue}>
                  {formatGeneration(pokemon.generation_id)}
                </span>
              </div>
            </div>
          </div>

          {/* Columna derecha: Detalles */}
          <div className={styles.rightColumn}>
            {/* Características físicas */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Características</h2>
              <div className={styles.characteristicsGrid}>
                <div className={styles.characteristic}>
                  <span className={styles.charIcon}>⚖️</span>
                  <div className={styles.charInfo}>
                    <span className={styles.charLabel}>Peso</span>
                    <span className={styles.charValue}>
                      {formatWeight(pokemon.weight)}
                    </span>
                  </div>
                </div>
                <div className={styles.characteristic}>
                  <span className={styles.charIcon}>📏</span>
                  <div className={styles.charInfo}>
                    <span className={styles.charLabel}>Altura</span>
                    <span className={styles.charValue}>
                      {formatHeight(pokemon.height)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Habilidades */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Habilidades</h2>
              <div className={styles.abilitiesList}>
                {pokemon.abilities.map(ability => (
                  <div key={ability.ability.name} className={styles.ability}>
                    <span className={styles.abilityDot}>•</span>
                    <span className={styles.abilityName}>
                      {capitalize(ability.ability.name.replaceAll('-', ' '))}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Estadísticas */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Estadísticas Base</h2>
              <div className={styles.stats}>
                {pokemon.stats.map(stat => {
                  const percentage = (stat.base_stat / maxStat) * 100;
                  return (
                    <div key={stat.stat.name} className={styles.stat}>
                      <div className={styles.statHeader}>
                        <span className={styles.statName}>
                          {formatStatName(stat.stat.name)}
                        </span>
                        <span className={styles.statValue}>
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className={styles.statBarBackground}>
                        <div
                          className={styles.statBarFill}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className={styles.statTotal}>
                  <span className={styles.statTotalLabel}>Total:</span>
                  <span className={styles.statTotalValue}>{totalStats}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Card>
    </div>
  );
};
