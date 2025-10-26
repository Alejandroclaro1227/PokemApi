import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../../../hooks/useFavorites';
import { Badge } from '../../atoms/Badge/Badge';
import styles from './Navbar.module.css';

/**
 * Componente Navbar organism
 * Barra de navegación principal
 */

export const Navbar = () => {
  const location = useLocation();
  const { favoritesCount } = useFavorites();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={styles.navbar}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>PokéApp</span>
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link
              to="/"
              className={`${styles.navLink} ${
                isActive('/') ? styles.active : ''
              }`}
            >
              <span className={styles.navIcon}>🏠</span>
              <span className={styles.navText}>Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={`${styles.navLink} ${
                isActive('/favorites') ? styles.active : ''
              }`}
            >
              <span className={styles.navIcon}>❤️</span>
              <span className={styles.navText}>Favoritos</span>
              {favoritesCount > 0 && (
                <Badge size="sm" color="var(--color-primary)">
                  {favoritesCount}
                </Badge>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};


