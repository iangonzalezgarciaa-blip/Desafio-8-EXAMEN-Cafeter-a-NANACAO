const express = require('express');
const cors = require('cors');
function crearApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  let cafes = [{ id: 1, nombre: 'Americano' }, { id: 2, nombre: 'Cappuccino' }, { id: 3, nombre: 'Latte' }];
  app.get('/cafes', (req, res) => res.status(200).json(cafes));
  app.get('/cafes/:id', (req, res) => {
    const cafe = cafes.find(item => item.id === Number(req.params.id));
    if (!cafe) return res.status(404).json({ message: 'Café no encontrado' });
    res.status(200).json(cafe);
  });
  app.post('/cafes', (req, res) => {
    const { id, nombre } = req.body || {};
    if (!Number.isSafeInteger(id) || id <= 0 || typeof nombre !== 'string' || !nombre.trim()) return res.status(400).json({ message: 'Datos inválidos' });
    if (cafes.some(cafe => cafe.id === id)) return res.status(400).json({ message: 'El ID ya existe' });
    const cafe = { id, nombre: nombre.trim() };
    cafes.push(cafe);
    return res.status(201).json(cafe);
  });
  app.put('/cafes/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0 || id !== req.body?.id) return res.status(400).json({ message: 'El ID de la URL y el payload deben coincidir' });
    const cafe = cafes.find(item => item.id === id);
    if (!cafe) return res.status(404).json({ message: 'Café no encontrado' });
    if (typeof req.body.nombre !== 'string' || !req.body.nombre.trim()) return res.status(400).json({ message: 'Nombre inválido' });
    cafe.nombre = req.body.nombre.trim();
    return res.status(200).json(cafe);
  });
  app.delete('/cafes/:id', (req, res) => {
    const indice = cafes.findIndex(item => item.id === Number(req.params.id));
    if (indice === -1) return res.status(404).json({ message: 'Café no encontrado' });
    cafes.splice(indice, 1);
    return res.status(200).json({ message: 'Café eliminado' });
  });
  app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));
  app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400) return res.status(400).json({ message: 'JSON inválido' });
    console.error(error);
    return res.status(500).json({ message: 'Error interno' });
  });
  return app;
}
module.exports = { crearApp };
