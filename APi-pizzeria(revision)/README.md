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
- URL: `/orders`
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
- URL: `/orders/:id`
- Respuestas:
  - 200 OK: retorna el pedido
  - 404 Not Found: si no existe

3) Cancelar pedido
- Method: POST
- URL: `/orders/:id/cancel`
- Reglas: no se puede cancelar si `status = delivered`
- Respuestas:
  - 200 OK: retorna el pedido con `status = cancelled`
  - 404 Not Found: si no existe
  - 409 Conflict: si es que intentan cancelar un pedido entregado

4) Listar pedidos
- Method: GET
- URL: `/orders?status=<pending|preparing|delivered|cancelled>`
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
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"size": "M", "toppings": ["queso", "jamón"]}],
    "address": "Calle Falsa 123, Springfield"
  }'
```

Crear invalido (422 por items vacío):
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [],
    "address": "Calle Falsa 123"
  }'
```

Obtener por id (200/404):
```bash
# suponiendo id=order-1
curl http://localhost:3000/orders/order-1
```

Cancelar pedido (200/409/404):
```bash
curl -X POST http://localhost:3000/orders/order-1/cancel
```

Listar todos (200):
```bash
curl http://localhost:3000/orders
```

Filtrar por estado (200):
```bash
curl "http://localhost:3000/orders?status=pending"
```

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
