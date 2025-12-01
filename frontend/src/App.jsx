import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MapPage from './pages/MapPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import EntityDetailsPage from './pages/EntityDetailsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import Navbar from './components/Navbar.jsx';
import { useProtectedRoute } from './hooks/useProtectedRoute.js';

function ProtectedRoute({ children }) {
  useProtectedRoute();
  return children;
}

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/map" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <AppLayout>
                <MapPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/entity/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <EntityDetailsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <SettingsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
