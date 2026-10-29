# Prueba — Cafetería Nanacao

## Descripción

En esta prueba desarrollé cuatro tests con Jest y Supertest para comprobar las rutas de la API REST de Cafetería Nanacao. Utilicé la estructura del servidor entregado en el material de apoyo, con los datos de `cafes.json` y el archivo `tests/server.spec.js`.

## Instalación y ejecución

1. Instalo las dependencias con `npm install`.
2. Ejecuto mis pruebas con `npm test`.
3. Para consultar las rutas manualmente, inicio la API con `npm start` en `http://localhost:3000`.

## Pruebas implementadas

| Prueba | Resultado que compruebo |
| --- | --- |
| GET `/cafes` | Código HTTP 200, arreglo con al menos un objeto |
| DELETE `/cafes/:id` | Código HTTP 404 para un ID inexistente |
| POST `/cafes` | Código HTTP 201 y café nuevo dentro del arreglo devuelto |
| PUT `/cafes/:id` | Código HTTP 400 cuando el ID de la ruta es diferente al del cuerpo |

En la prueba de eliminación envío la cabecera `Authorization`, porque la ruta del servidor original requiere su presencia para procesar la solicitud. Para el POST verifico la respuesta en formato arreglo, tal como la devuelve el servidor.

## Organización

```text
cafes.json
index.js
package.json
tests/server.spec.js
.github/workflows/pruebas.yml
```

## Comprobación automatizada

Configuré GitHub Actions para instalar dependencias, verificar la sintaxis y ejecutar `npm test`. Consulto la evidencia de la última ejecución desde la [pestaña Actions](https://github.com/iangonzalezgarciaa-blip/Desafio-8-EXAMEN-Cafeter-a-NANACAO/actions).
