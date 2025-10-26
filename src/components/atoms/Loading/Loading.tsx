import styles from './Loading.module.css';

/**
 * Componente Loading atómico
 * Indicador de carga
 */

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}

export const Loading = ({
  size = 'md',
  fullScreen = false,
  text,
}: LoadingProps) => {
  const content = (
    <div className={styles.loadingContent}>
      <output
        className={`${styles.spinner} ${styles[size]}`}
        aria-label="Cargando"
      >
        <div className={styles.pokeball}>
          <div className={styles.pokeballTop}></div>
          <div className={styles.pokeballBottom}></div>
          <div className={styles.pokeballCenter}></div>
        </div>
      </output>
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className={styles.fullScreen}>{content}</div>;
  }

  return content;
};
