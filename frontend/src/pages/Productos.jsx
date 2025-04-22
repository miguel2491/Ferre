
import React, { useEffect, useState } from 'react';
import { getProductos, crearProducto } from '../services/api';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', precio: '', stock: '' });

  const cargar = () => getProductos().then(setProductos);

  useEffect(() => { cargar(); }, []);

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearProducto(nuevo);
    setNuevo({ nombre: '', precio: '', stock: '' });
    cargar();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Lista de Productos</h2>
      <ul className="mb-4">
        {productos.map(p => (
          <li key={p.id}>{p.nombre} - ${p.precio} - Stock: {p.stock}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="nombre" value={nuevo.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 w-full" />
        <input name="precio" value={nuevo.precio} onChange={handleChange} placeholder="Precio" type="number" className="border p-2 w-full" />
        <input name="stock" value={nuevo.stock} onChange={handleChange} placeholder="Stock" type="number" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Agregar Producto</button>
      </form>
    </div>
  );
}

export default Productos;
