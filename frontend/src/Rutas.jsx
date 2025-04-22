import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dash from './pages/Principal/DashboardLayout'; // Layout con sidebar y header
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';
import ProtectedRoute from './components/ProtectedRoute';

function Rutas({ autenticado, onLogout }) {
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Dash onLogout={onLogout}>
      <Routes>
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="*" element={<Navigate to="/productos" replace />} />
      </Routes>
    </Dash>
  );
}

export default Rutas;
