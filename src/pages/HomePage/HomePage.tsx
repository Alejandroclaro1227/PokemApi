import { useState } from 'react';
import { Button } from '../../components/atoms/Button/Button';
import { FilterDropdown } from '../../components/molecules/FilterDropdown/FilterDropdown';
import { SearchBar } from '../../components/molecules/SearchBar/SearchBar';
import { PokemonList } from '../../components/organisms/PokemonList/PokemonList';
import { MainLayout } from '../../components/templates/MainLayout/MainLayout';
import { useFilters } from '../../hooks/useFilters';
import { usePokemonList } from '../../hooks/usePokemon';
import styles from './HomePage.module.css';

/**
 * Página principal - Lista de Pokémon
 */

const ITEMS_PER_PAGE = 20;

export const HomePage = () => {
  const [offset, setOffset] = useState(0);
  const { pokemons, loading, loadMore } = usePokemonList(
    ITEMS_PER_PAGE,
    offset
  );
  const {
    selectedTypes,
    searchTerm,
    toggleTypeFilter,
    setSearchTerm,
    clearFilters,
    hasActiveFilters,
    filterPokemons,
  } = useFilters();

  // Aplicar filtros a los Pokémon cargados
  const filteredPokemons = filterPokemons(pokemons);

  const handleLoadMore = async () => {
    setOffset(prev => prev + ITEMS_PER_PAGE);
    await loadMore();
  };

  // Mostrar mensaje cuando hay filtros activos
  const resultsMessage = hasActiveFilters
    ? `${filteredPokemons.length} Pokémon encontrados`
    : `${pokemons.length} Pokémon cargados`;

  return (
    <MainLayout>
      <div className={styles.homePage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Explora el Mundo Pokémon</h1>
          <p className={styles.heroSubtitle}>
            Descubre y guarda tus Pokémon favoritos
          </p>
        </section>

        {/* Filtros y búsqueda */}
        <section className={styles.filtersSection}>
          <div className={styles.filtersContainer}>
            <div className={styles.searchWrapper}>
              <SearchBar
                onSearch={setSearchTerm}
                placeholder="Buscar Pokémon por nombre..."
                initialValue={searchTerm}
              />
            </div>

            <div className={styles.filterActions}>
              <FilterDropdown
                selectedTypes={selectedTypes}
                onToggleType={toggleTypeFilter}
                onClearFilters={clearFilters}
              />

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className={styles.clearButton}
                >
                  ✕ Limpiar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Contador de resultados */}
          <div className={styles.resultsInfo}>
            <p className={styles.resultsText}>{resultsMessage}</p>
          </div>
        </section>

        {/* Lista de Pokémon */}
        <section className={styles.listSection}>
          <PokemonList
            pokemons={filteredPokemons}
            loading={loading}
            onLoadMore={handleLoadMore}
            hasMore={
              !hasActiveFilters && pokemons.length >= offset + ITEMS_PER_PAGE
            }
            emptyMessage={
              hasActiveFilters
                ? 'No se encontraron Pokémon con estos filtros'
                : 'No hay Pokémon disponibles'
            }
          />
        </section>
      </div>
    </MainLayout>
  );
};
