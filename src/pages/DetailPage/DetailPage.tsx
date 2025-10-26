import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../components/atoms/Loading/Loading';
import { PokemonDetail } from '../../components/organisms/PokemonDetail/PokemonDetail';
import { MainLayout } from '../../components/templates/MainLayout/MainLayout';
import { usePokemonDetail } from '../../hooks/usePokemon';
import styles from './DetailPage.module.css';

/**
 * Página de detalle de un Pokémon
 */

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pokemonId = id ? Number.parseInt(id, 10) : 0;

  const { pokemon, loading, error } = usePokemonDetail(pokemonId);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.detailPage}>
          <Loading
            size="lg"
            fullScreen={false}
            text="Cargando detalles del Pokémon..."
          />
        </div>
      </MainLayout>
    );
  }

  if (error || !pokemon) {
    return (
      <MainLayout>
        <div className={styles.detailPage}>
          <div className={styles.errorState}>
            <span className={styles.errorIcon}>😢</span>
            <h2 className={styles.errorTitle}>
              {error ? 'Error al cargar el Pokémon' : 'Pokémon no encontrado'}
            </h2>
            <p className={styles.errorText}>
              {error?.message ||
                'El Pokémon que buscas no existe o no se pudo cargar.'}
            </p>
            <button onClick={handleBack} className={styles.backButton}>
              ← Volver al inicio
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.detailPage}>
        <PokemonDetail pokemon={pokemon} onBack={handleBack} />
      </div>
    </MainLayout>
  );
};
