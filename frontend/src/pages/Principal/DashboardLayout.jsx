import React from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom'; // 👈 Importa Outlet

function DashboardLayout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    onLogout(); // Llama a la función onLogout pasada como prop
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Menú</h2>
        <nav>
        <Link to="/productos" className="block py-2 hover:bg-gray-700 rounded px-2">Productos</Link>
        <Link to="/ventas" className="block py-2 hover:bg-gray-700 rounded px-2">Ventas</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Punto de Ventas</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Cerrar Sesión
          </button>
        </header>

        {/* Página actual */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Outlet /> {/* 👈 Aquí se renderiza la página actual */}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
