const express = require("express");
const app = express();
const cafes = require("./cafes.json");

app.use(express.json());

app.get("/cafes", (req, res) => res.status(200).send(cafes));

app.get("/cafes/:id", (req, res) => {
  const cafe = cafes.find(c => c.id == req.params.id);
  if (cafe) return res.status(200).send(cafe);
  return res.status(404).send({ message: "No se encontró ningún cafe con ese id" });
});

app.post("/cafes", (req, res) => {
  const cafe = req.body;
  if (cafes.some(c => c.id == cafe.id)) {
    return res.status(400).send({ message: "Ya existe un cafe con ese id" });
  }
  cafes.push(cafe);
  return res.status(201).send(cafes);
});

app.put("/cafes/:id", (req, res) => {
  const cafe = req.body;
  const { id } = req.params;
  if (id != cafe.id) return res.status(400).send({
    message: "El id del parámetro no coincide con el id del café recibido"
  });
  const indice = cafes.findIndex(c => c.id == id);
  if (indice < 0) return res.status(404).send({ message: "No se encontró ningún café con ese id" });
  cafes[indice] = cafe;
  return res.send(cafes);
});

app.delete("/cafes/:id", (req, res) => {
  if (!req.header("Authorization")) return res.status(400).send({
    message: "No recibió ningún token en las cabeceras"
  });
  const indice = cafes.findIndex(c => c.id == req.params.id);
  if (indice < 0) return res.status(404).send({ message: "No se encontró ningún cafe con ese id" });
  cafes.splice(indice, 1);
  return res.send(cafes);
});

app.use((req, res) => res.status(404).send({ message: "La ruta que intenta consultar no existe" }));

if (require.main === module) app.listen(3000, () => console.log("SERVER ON"));
module.exports = app;
