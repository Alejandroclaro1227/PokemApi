import { Navbar } from '../../organisms/Navbar/Navbar';
import styles from './MainLayout.module.css';

/**
 * Componente MainLayout template
 * Layout principal de la aplicación
 */

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.mainLayout}>
      <Navbar />
      <main className={styles.mainContent}>
        <div className={styles.container}>{children}</div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            Pokémon App © 2025 | Hecho con ❤️ usando React + TypeScript
          </p>
          <p className={styles.footerText}>
            Datos de{' '}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PokéAPI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};


