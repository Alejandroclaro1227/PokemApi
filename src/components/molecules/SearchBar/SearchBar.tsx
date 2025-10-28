import { useEffect, useState } from 'react';
import { debounce } from '../../../utils/helpers';
import { validatePokemonName } from '../../../utils/validators';
import { Input } from '../../atoms/Input/Input';
import styles from './SearchBar.module.css';

/**
 * Componente SearchBar molecule
 * Barra de búsqueda con validación
 */

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const SearchBar = ({
  onSearch,
  placeholder = 'Buscar Pokémon...',
  initialValue = '',
}: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>('');

  // Debounce de la búsqueda
  useEffect(() => {
    const debouncedSearch = debounce((searchValue: string) => {
      if (searchValue.length === 0) {
        setError('');
        onSearch('');
        return;
      }

      if (searchValue.length < 3) {
        setError('Mínimo 3 caracteres');
        return;
      }

      if (!validatePokemonName(searchValue)) {
        setError('Solo letras, números, espacios y guiones');
        return;
      }

      setError('');
      onSearch(searchValue.toLowerCase());
    }, 300);

    debouncedSearch(value);
  }, [value, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    setError('');
    onSearch('');
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputWrapper}>
        <span className={styles.searchIcon} aria-hidden="true">
          🔍
        </span>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          error={error}
          fullWidth
          aria-label="Buscar Pokémon"
          className={styles.searchInput}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};




