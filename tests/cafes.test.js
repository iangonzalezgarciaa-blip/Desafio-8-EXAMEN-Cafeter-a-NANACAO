const request = require('supertest');
const { crearApp } = require('../app');
describe('Prueba Cafetería Nanacao', () => {
  let app;
  beforeEach(() => { app = crearApp(); });
  test('GET /cafes responde 200 y entrega un arreglo con al menos un objeto', async () => {
    const respuesta = await request(app).get('/cafes');
    expect(respuesta.statusCode).toBe(200);
    expect(Array.isArray(respuesta.body)).toBe(true);
    expect(respuesta.body.length).toBeGreaterThan(0);
    expect(respuesta.body[0]).toEqual(expect.any(Object));
  });
  test('DELETE /cafes/:id devuelve 404 al eliminar un ID inexistente', async () => {
    const respuesta = await request(app).delete('/cafes/999999');
    expect(respuesta.statusCode).toBe(404);
  });
  test('POST /cafes registra un café nuevo y devuelve 201', async () => {
    const cafeNuevo = { id: 100, nombre: 'Mocaccino' };
    const respuesta = await request(app).post('/cafes').send(cafeNuevo);
    expect(respuesta.statusCode).toBe(201);
    expect(respuesta.body).toMatchObject(cafeNuevo);
    const listado = await request(app).get('/cafes');
    expect(listado.body).toContainEqual(cafeNuevo);
  });
  test('PUT /cafes/:id devuelve 400 si el ID de URL difiere del payload', async () => {
    const respuesta = await request(app).put('/cafes/1').send({ id: 2, nombre: 'Café actualizado' });
    expect(respuesta.statusCode).toBe(400);
  });
});
