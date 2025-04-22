
import React, { useEffect, useState } from 'react';
import { getVentas, crearVenta, getProductos } from '../services/api';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [venta, setVenta] = useState({ producto_id: '', cantidad: '' });

  const cargar = async () => {
    setVentas(await getVentas());
    setProductos(await getProductos());
  };

  useEffect(() => { cargar(); }, []);

  const handleChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const producto = productos.find(p => p.id === parseInt(venta.producto_id));
    const total = producto.precio * venta.cantidad;
    await crearVenta({ ...venta, total });
    setVenta({ producto_id: '', cantidad: '' });
    cargar();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Ventas</h2>
      <ul className="mb-4">
        {ventas.map((v, i) => (
          <li key={i}>Producto #{v.producto_id} - Cantidad: {v.cantidad} - Total: ${v.total}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-2">
        <select name="producto_id" value={venta.producto_id} onChange={handleChange} className="border p-2 w-full">
          <option value="">Selecciona un producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
        <input name="cantidad" value={venta.cantidad} onChange={handleChange} placeholder="Cantidad" type="number" className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Registrar Venta</button>
      </form>
    </div>
  );
}

export default Ventas;
