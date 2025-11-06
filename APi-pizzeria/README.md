<<<<<<< HEAD:APi-pizzeria/README.md
# TP2 - API de Pizzería

Proyecto mini‑proyecto (punto 5): API REST con Express + TypeScript, validaciones con Zod, TDD con Jest (tests unitarios e integracion).

## Requisitos
- Node.js 18+ 
- npm 9+

## Instalación
```bash
npm install
```

## Scripts
- `npm run dev`: inicia el servidor en desarrollo con recarga en caliente (puerto 3000)
- `npm run build`: compila TypeScript a `dist/`
- `npm start`: ejecuta el build (`node dist/server.js`)
- `npm test`: ejecuta tests
- `npm run test:watch`: ejecuta tests en modo watch
- `npm run test:coverage`: reporte de cobertura

## Endpoints
Base URL: `http://localhost:3000`

1) Crear pedido
- Method: POST
- URL: `/`
- Body:
```json
{
  "items": [
    { "size": "M", "toppings": ["queso", "jamon"] }
  ],
  "address": "11 de Abril 461, Bahia Blanca"
}
```
- Respuestas:
  - 201 Created: retorna `Order` con `id`, `totalPrice`, `status`, etc.
  - 422 Unprocessable Entity: validación fallida

2) Obtener pedido por id
- Method: GET
- URL: `/:id`
- Respuestas:
  - 200 OK: retorna el pedido
  - 404 Not Found: si no existe

3) Cancelar pedido
- Method: POST
- URL: `/:id/cancel`
- Reglas: no se puede cancelar si `status = delivered`
- Respuestas:
  - 200 OK: retorna el pedido con `status = cancelled`
  - 404 Not Found: si no existe
  - 409 Conflict: si es que intentan cancelar un pedido entregado

4) Listar pedidos
- Method: GET
- URL: `/?status=<pending|preparing|delivered|cancelled>`
- Respuestas:
  - 200 OK: array de pedidos
  - 422 Unprocessable Entity: si `status` invalido

## Reglas de negocio
- `size ∈ {S, M, L}`
- Max. 5 `toppings` por item
- Precio = base por tamaño + 1500 por topping
  - S: 10000
  - M: 14500
  - L: 18000
- No se puede cancelar si `status = delivered`

## Validaciones (Zod)
- `items[]` no vacío
- `address` con mínimo 10 caracteres
- `size` válido, `toppings` array de strings, máx 5

## Ejemplos curl

Crear pedido (201):
```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"size": "M", "toppings": ["queso", "jamón"]}],
    "address": "Calle Falsa 123, Springfield"
  }'
```

Crear invalido (422 por items vacío):
```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{
    "items": [],
    "address": "Calle Falsa 123"
  }'
```

Obtener por id (200/404):
```bash
# suponiendo id=order-1
curl http://localhost:3000/order-1
```

Cancelar pedido (200/409/404):
```bash
curl -X POST http://localhost:3000/order-1/cancel
```

Listar todos (200):
```bash
curl http://localhost:3000/
```

Filtrar por estado (200):
```bash
curl "http://localhost:3000/?status=pending"
```

# Matriz de Casos de Prueba
| **ID | **Caso/Descripcion** | **Precondicion** | **Input** | **Accion** | **Resultado esperado** | **Test** |
|--------------|----------------|------------------|------------|-------------|--------------------------|-----------|
| **CA1** | Crear pedido valido | Servidor iniciado | `{ "items": [{"size": "M", "toppings": ["queso", "jamon"]}], "address": "Yrigoyen 585, Bahia Blanca" }` | Enviar POST `/` | Pedido creado con `status: "pending"`, `id`, y `totalPrice=17500` | verde |
| **CA2** | Crear pedido con lista de items vacia | Servidor iniciado | `{ "items": [], "address": "Yrigoyen 585" }` | Enviar POST `/` | Error de validacion “items no puede estar vacio” | verde |
| **CA3** | Crear pedido con direccion corta | Servidor iniciado | `{ "items": [{"size":"S","toppings":["queso"]}], "address":"Yri 585"}` | Enviar POST `/` | Error de validacion “address debe tener minimo 10 caracteres” | verde |
| **CA4** | Crear pedido con size invalido | Servidor iniciado | `{ "items":[{"size":"XL","toppings":["queso"]}], "address":"Yrigoyen 585, Bahia Blanca"}` | Enviar POST `/` | Error “size invalido, debe ser S, M o L” | verde |
| **CA5** | Crear pedido con mas de 5 toppings | Servidor iniciado | `{ "items":[{"size":"M","toppings":["queso","jamon","morron","aceitunas","huevo","cebolla"]}], "address":"Yrigoyen 585, Bahia Blanca"}` | Enviar POST `/` | Error “maximo 5 toppings permitidos” | verde |
| **CA6** | Obtener pedido existente | Pedido creado previamente con id=order-1 | `GET /order-1` | Enviar GET `/order-1` | Devuelve pedido con informacion completa | verde |
| **CA7** | Obtener pedido inexistente | No existe pedido con id=order-999 | `GET /order-999` | Enviar GET `/order-999` | Error “Pedido no encontrado” | verde |
| **CA8** | Cancelar pedido pendiente | Pedido con `status=pending` existente | `POST /order-1/cancel` | Enviar POST `/order-1/cancel` | Pedido actualizado a `status=cancelled` | verde |
| **CA9** | Cancelar pedido entregado | Pedido con `status=delivered` existente | `POST /order-2/cancel` | Enviar POST `/order-2/cancel` | Error de negocio “No se puede cancelar pedido entregado” | verde |
| **CA10** | Cancelar pedido inexistente | No existe pedido con id=order-999 | `POST /order-999/cancel` | Enviar POST `/order-999/cancel` | Error “Pedido no encontrado” | verde |
| **CA11** | Listar todos los pedidos | Base con pedidos creados | `GET /` | Enviar GET `/` | Devuelve arreglo de todos los pedidos | verde |
| **CA12** | Filtrar pedidos por estado valido | Base con pedidos de distintos estados | `GET /?status=pending` | Enviar GET `/` con query `status=pending` | Devuelve solo pedidos pendientes | verde |
| **CA13** | Filtrar pedidos por estado invalido | Servidor iniciado | `GET /?status=foo` | Enviar GET `/?status=foo` | Error “status invalido” | verde |
| **CA14** | Calcular precio correctamente | Servidor iniciado | `{ "items": [{"size": "L", "toppings": ["queso","jamon","morron"]}], "address": "Yrigoyen 585"}` | Enviar POST `/` | Retorna totalPrice = `18000 + (3×1500) = 22500` | verde |
| **CA15** | Validacion: toppings no es array | Servidor iniciado | `{ "items": [{"size":"S","toppings":"queso"}], "address":"Yrigoyen 585"}` | Enviar POST `/` | Error “toppings debe ser un array de strings” | verde |
| **CA16** | Validacion: body vacio | Servidor iniciado | `{}` | Enviar POST `/` | Error por falta de campos requeridos (`items`, `address`) | verde |


## Ejecutar
Desarrollo:
```bash
npm run dev
```

Producción (build + start):
```bash
npm run build
npm start
```

## Tests y cobertura
```bash
npm test
npm run test:coverage
```
Umbral global configurado en `jest.config.js` (80% líneas/funciones/branches/statements).

=======
# TP2 - API de Pizzería

Proyecto mini‑proyecto (punto 5): API REST con Express + TypeScript, validaciones con Zod, TDD con Jest (tests unitarios e integracion).

## Requisitos
- Node.js 18+ 
- npm 9+

## Instalación
```bash
npm install
```

## Scripts
- `npm run dev`: inicia el servidor en desarrollo con recarga en caliente (puerto 3000)
- `npm run build`: compila TypeScript a `dist/`
- `npm start`: ejecuta el build (`node dist/server.js`)
- `npm test`: ejecuta tests
- `npm run test:watch`: ejecuta tests en modo watch
- `npm run test:coverage`: reporte de cobertura

## Endpoints
Base URL: `http://localhost:3000`

1) Crear pedido
- Method: POST
- URL: `/`
- Body:
```json
{
  "items": [
    { "tamanio": "M", "toppings": ["queso", "jamon"] }
  ],
  "direccion": "11 de Abril 461, Bahia Blanca"
}
```
- Respuestas:
  - 201 creadoEn: retorna `Orden` con `id`, `precioTotal`, `estado`, etc.
  - 422 Unprocessable Entity: validación fallida

2) Obtener pedido por id
- Method: GET
- URL: `/:id`
- Respuestas:
  - 200 OK: retorna el pedido
  - 404 Not Found: si no existe

3) Cancelar pedido
- Method: POST
- URL: `/:id/cancel`
- Reglas: no se puede cancelar si `estado = entregado`
- Respuestas:
  - 200 OK: retorna el pedido con `estado = cancelado`
  - 404 Not Found: si no existe
  - 409 Conflict: si es que intentan cancelar un pedido entregado

4) Listar pedidos
- Method: GET
- URL: `/?estado=<pendiente|preparado|entregado|cancelado>`
- Respuestas:
  - 200 OK: array de pedidos
  - 422 Unprocessable Entity: si `estado` invalido

## Reglas de negocio
- `tamanio ∈ {S, M, L}`
- Max. 5 `toppings` por item
- Precio = base por tamaño + 1500 por topping
  - S: 10000
  - M: 14500
  - L: 18000
- No se puede cancelar si `estado = entregado`

## Validaciones (Zod)
- `items[]` no vacío
- `direccion` con mínimo 10 caracteres
- `tamanio` válido, `toppings` array de strings, máx 5

## Ejemplos curl

Crear pedido (201):
```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"tamanio": "M", "toppings": ["queso", "jamón"]}],
    "direccion": "Calle Falsa 123, Springfield"
  }'
```

Crear invalido (422 por items vacío):
```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{
    "items": [],
    "direccion": "Calle Falsa 123"
  }'
```

Obtener por id (200/404):
```bash
# suponiendo id=order-1
curl http://localhost:3000/order-1
```

Cancelar pedido (200/409/404):
```bash
curl -X POST http://localhost:3000/order-1/cancel
```

Listar todos (200):
```bash
curl http://localhost:3000/
```

Filtrar por estado (200):
```bash
curl "http://localhost:3000/?estado=pendiente"
```

# Matriz de Casos de Prueba
| **ID | **Caso/Descripcion** | **Precondicion** | **Input** | **Accion** | **Resultado esperado** | **Test** |
|--------------|----------------|------------------|------------|-------------|--------------------------|-----------|
| **CA1** | Crear pedido valido | Servidor iniciado | `{ "items": [{"tamanio": "M", "toppings": ["queso", "jamon"]}], "direccion": "Yrigoyen 585, Bahia Blanca" }` | Enviar POST `/` | Pedido creado con `estado: "pendiente"`, `id`, y `precioTotal=17500` | verde |
| **CA2** | Crear pedido con lista de items vacia | Servidor iniciado | `{ "items": [], "direccion": "Yrigoyen 585" }` | Enviar POST `/` | Error de validacion “items no puede estar vacio” | verde |
| **CA3** | Crear pedido con direccion corta | Servidor iniciado | `{ "items": [{"tamanio":"S","toppings":["queso"]}], "direccion":"Yri 585"}` | Enviar POST `/` | Error de validacion “direccion debe tener minimo 10 caracteres” | verde |
| **CA4** | Crear pedido con size invalido | Servidor iniciado | `{ "items":[{"tamanio":"XL","toppings":["queso"]}], "direccion":"Yrigoyen 585, Bahia Blanca"}` | Enviar POST `/` | Error “size invalido, debe ser S, M o L” | verde |
| **CA5** | Crear pedido con mas de 5 toppings | Servidor iniciado | `{ "items":[{"tamanio":"M","toppings":["queso","jamon","morron","aceitunas","huevo","cebolla"]}], "direccion":"Yrigoyen 585, Bahia Blanca"}` | Enviar POST `/` | Error “maximo 5 toppings permitidos” | verde |
| **CA6** | Obtener pedido existente | Pedido creado previamente con id=order-1 | `GET /orden-1` | Enviar GET `/orden-1` | Devuelve pedido con informacion completa | verde |
| **CA7** | Obtener pedido inexistente | No existe pedido con id=order-999 | `GET /orden-999` | Enviar GET `/orden-999` | Error “Pedido no encontrado” | verde |
| **CA8** | Cancelar pedido pendiente | Pedido con `estado=pendiente` existente | `POST /orden-1/cancel` | Enviar POST `/orden-1/cancel` | Pedido actualizado a `estado=cancelado` | verde |
| **CA9** | Cancelar pedido entregado | Pedido con `estado=entregado` existente | `POST /orden-2/cancel` | Enviar POST `/orden-2/cancel` | Error de negocio “No se puede cancelar pedido entregado” | verde |
| **CA10** | Cancelar pedido inexistente | No existe pedido con id=order-999 | `POST /orden-999/cancel` | Enviar POST `/orden-999/cancel` | Error “Pedido no encontrado” | verde |
| **CA11** | Listar todos los pedidos | Base con pedidos creados | `GET /` | Enviar GET `/` | Devuelve arreglo de todos los pedidos | verde |
| **CA12** | Filtrar pedidos por estado valido | Base con pedidos de distintos estados | `GET /?estado=pendiente` | Enviar GET `/` con query `estado=pendiente` | Devuelve solo pedidos pendientes | verde |
| **CA13** | Filtrar pedidos por estado invalido | Servidor iniciado | `GET /?estado=foo` | Enviar GET `/?estado=foo` | Error “estado invalido” | verde |
| **CA14** | Calcular precio correctamente | Servidor iniciado | `{ "items": [{"tamanio": "L", "toppings": ["queso","jamon","morron"]}], "direccion": "Yrigoyen 585"}` | Enviar POST `/` | Retorna precioTotal = `18000 + (3×1500) = 22500` | verde |
| **CA15** | Validacion: toppings no es array | Servidor iniciado | `{ "items": [{"tamanio":"S","toppings":"queso"}], "direccion":"Yrigoyen 585"}` | Enviar POST `/` | Error “toppings debe ser un array de strings” | verde |
| **CA16** | Validacion: body vacio | Servidor iniciado | `{}` | Enviar POST `/` | Error por falta de campos requeridos (`items`, `direccion`) | verde |


## Ejecutar
Desarrollo:
```bash
npm run dev
```

Producción (build + start):
```bash
npm run build
npm start
```

## Tests y cobertura
```bash
npm test
npm run test:coverage
```
Umbral global configurado en `jest.config.js` (80% líneas/funciones/branches/statements).

>>>>>>> origin/dev:APi-pizzeria(revision)/README.md
