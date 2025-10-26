import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { FiltersProvider } from './context/FiltersContext';
import { DetailPage } from './pages/DetailPage/DetailPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { HomePage } from './pages/HomePage/HomePage';

/**
 * Componente principal de la aplicación
 * Configura routing y Contexts (usando REST API)
 */

function App() {
  return (
    <FavoritesProvider>
      <FiltersProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:id" element={<DetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </FiltersProvider>
    </FavoritesProvider>
  );
}

export default App;
