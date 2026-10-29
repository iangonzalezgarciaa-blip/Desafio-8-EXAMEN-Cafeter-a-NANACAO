const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafés", () => {
  test("GET /cafes responde 200 y entrega un arreglo con al menos un objeto", async () => {
    const respuesta = await request(server).get("/cafes");
    expect(respuesta.statusCode).toBe(200);
    expect(Array.isArray(respuesta.body)).toBe(true);
    expect(respuesta.body.length).toBeGreaterThan(0);
    expect(respuesta.body[0]).toEqual(expect.any(Object));
  });

  test("DELETE /cafes/:id responde 404 para un café inexistente", async () => {
    const respuesta = await request(server)
      .delete("/cafes/999999")
      .set("Authorization", "token-prueba");
    expect(respuesta.statusCode).toBe(404);
  });

  test("POST /cafes agrega un café y responde 201", async () => {
    const cafeNuevo = { id: 987654, nombre: "Café de prueba" };
    const respuesta = await request(server).post("/cafes").send(cafeNuevo);
    expect(respuesta.statusCode).toBe(201);
    expect(Array.isArray(respuesta.body)).toBe(true);
    expect(respuesta.body).toContainEqual(cafeNuevo);
    const listado = await request(server).get("/cafes");
    expect(listado.body).toContainEqual(cafeNuevo);
  });

  test("PUT /cafes/:id responde 400 cuando el ID no coincide con el payload", async () => {
    const respuesta = await request(server)
      .put("/cafes/1")
      .send({ id: 2, nombre: "Café actualizado" });
    expect(respuesta.statusCode).toBe(400);
  });
});
