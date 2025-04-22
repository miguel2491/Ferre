
const isDev = window.location.protocol === 'http:';
const API_URL = isDev ? 'http://localhost:3001/api' : 'http://localhost:3001/api';

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};

export const crearProducto = async (producto) => {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  return res.json();
};

export const getVentas = async () => {
  const res = await fetch(`${API_URL}/ventas`);
  return res.json();
};

export const crearVenta = async (venta) => {
  const res = await fetch(`${API_URL}/ventas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(venta),
  });
  return res.json();
};
