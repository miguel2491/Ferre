import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import DashboardLayout from './pages/Principal/DashboardLayout'; // Layout
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';

function App() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') setAutenticado(true);
  }, []);

  const manejarLogin = () => {
    localStorage.setItem('auth', 'true');
    setAutenticado(true);
  };

  const manejarLogout = () => {
    localStorage.removeItem('auth');
    setAutenticado(false);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route
          path="/login"
          element={
            autenticado ? <Navigate to="/productos" replace /> : <Login onLogin={manejarLogin} />
          }
        />

        {/* Rutas protegidas */}
        {autenticado ? (
          <Route path="/" element={<DashboardLayout onLogout={manejarLogout} />}>
            <Route path="productos" element={<Productos />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="*" element={<Navigate to="/productos" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
