# Prueba — Cafetería Nanacao

## Descripción

En esta prueba trabajé con una API REST de una cafetería y desarrollé los tests solicitados con **Jest** y **Supertest**. Comprobé los códigos HTTP, los datos devueltos y el comportamiento de las operaciones sobre cafés.

## Tecnologías que utilicé

- Node.js y Express para la API REST.
- Jest para organizar y ejecutar los tests.
- Supertest para realizar solicitudes HTTP al servidor durante las pruebas.

## Cómo ejecutar mi proyecto

1. Instalo las dependencias con `npm install`.
2. Ejecuto las cuatro pruebas con `npm test`.
3. Si quiero consultar manualmente la API, inicio el servidor con `npm start` y utilizo `http://localhost:3000`.

## Pruebas que implementé

| Caso | Verificación |
| --- | --- |
| `GET /cafes` | Compruebo el código 200 y que recibo un arreglo con al menos un objeto. |
| `DELETE /cafes/:id` | Compruebo el código 404 cuando intento eliminar un café que no existe. |
| `POST /cafes` | Registro un café y compruebo el código 201. También verifico que aparece en el listado. |
| `PUT /cafes/:id` | Compruebo el código 400 cuando el ID de la URL es distinto al ID del cuerpo de la solicitud. |

## Estructura

```text
app.js
index.js
package.json
tests/cafes.test.js
README.md
```

## Consideraciones

El PDF de la prueba menciona un **servidor de apoyo** que no estaba incluido en el archivo adjunto. Por eso preparé una versión autónoma de la API con las rutas necesarias y datos en memoria. Separé la aplicación del archivo de inicio para ejecutar los tests con Supertest sin abrir un puerto y restablecer los datos antes de cada caso.

## Pruebas

Mis cuatro pruebas con Jest y Supertest verifican GET /cafes (200 y arreglo), DELETE con identificador inexistente (404), POST de un café (201) y PUT con identificadores diferentes (400).

Ejecuto las pruebas con:

```bash
npm install
npm test
```

**Resultado de GitHub Actions:** ejecución exitosa. [Ver la ejecución de mis pruebas](https://github.com/iangonzalezgarciaa-blip/Desafio-8-EXAMEN-Cafeter-a-NANACAO/actions/runs/40827572520).

Las pruebas automatizadas no constituyen por sí solas una validación de integración con PostgreSQL o con material de apoyo externo.
