import { useEffect, useRef, useState } from 'react';
import { POKEMON_TYPES } from '../../../types/pokemon.types';
import { capitalize, getTypeColor } from '../../../utils/helpers';
import { Badge } from '../../atoms/Badge/Badge';
import { Button } from '../../atoms/Button/Button';
import styles from './FilterDropdown.module.css';

/**
 * Componente FilterDropdown molecule
 * Dropdown para filtrar por tipos de Pokémon
 */

export interface FilterDropdownProps {
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  onClearFilters: () => void;
}

export const FilterDropdown = ({
  selectedTypes,
  onToggleType,
  onClearFilters,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeClick = (type: string) => {
    onToggleType(type);
  };

  return (
    <div className={styles.filterDropdown} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={toggleDropdown}
        className={styles.triggerButton}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>🔽 Filtrar por tipo</span>
        {selectedTypes.length > 0 && (
          <Badge size="sm" color="var(--color-primary)">
            {selectedTypes.length}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className={styles.dropdownContent} role="menu">
          <div className={styles.dropdownHeader}>
            <h4 className={styles.dropdownTitle}>Tipos de Pokémon</h4>
            {selectedTypes.length > 0 && (
              <button
                type="button"
                onClick={onClearFilters}
                className={styles.clearAllButton}
              >
                Limpiar todo
              </button>
            )}
          </div>

          <div className={styles.typeGrid}>
            {POKEMON_TYPES.map(type => {
              const isSelected = selectedTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeClick(type)}
                  className={`${styles.typeButton} ${
                    isSelected ? styles.selected : ''
                  }`}
                  style={
                    {
                      '--type-color': getTypeColor(type),
                    } as React.CSSProperties
                  }
                  role="menuitemcheckbox"
                  aria-checked={isSelected}
                >
                  {isSelected && <span className={styles.checkmark}>✓</span>}
                  <span className={styles.typeName}>{capitalize(type)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
