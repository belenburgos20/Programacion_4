## TP3 - Cafeteria (TDD con React + Vitest + MSW)
---

## Objetivo Central
- Aplicar Desarrollo Guiado por Pruebas (TDD) en React para construir una pequeña
aplicación que simule el flujo de pedidos en una cafetería. El estudiante deberá
demostrar dominio del ciclo Rojo → Verde → Refactor , el uso de React Testing Library
(RTL) con consultas accesibles, el manejo de estado y la integración con una API
simulada mediante MSW .
---

## Stack Tecnológico
- React + TypeScript + Vite
- Vitest + React Testing Library + @testing-library/user-event
- MSW (Mock Service Worker)
- Zod para validaciones
- Context API o hooks personalizados para el estado global
---

## Contexto del Proyecto.
- Una cafetería desea digitalizar el proceso de toma de pedidos. El sistema mostrará un
menú de productos , permitirá agregar ítems a un pedido , visualizar el total a pagar , y
enviar el pedido (simulado). El objetivo del trabajo es implementar progresivamente
cada funcionalidad siguiendo la metodología TDD , escribiendo primero los tests y
luego la mínima implementación que los haga pasar.
---

## Configuracion del entorno
-
-
-
-
-

---

## TDD - Casos HU1, HU2, HU3, HU4, HU5, HU6.
---
HU1 - Visualizacion inicial del menu

- *Test rojo* - test que verifique que se muestran productos mockeados por la API (
screen.getByText('Café') ).
(captura)

- *Test verde* - implementar fetch a /api/menu (interceptado por MSW).
(captura)

- *Refactor* - separar el componente <Menu /> .
(captura)

---
HU2 - Agregar ítem al pedido

- *Test* - simular click sobre el botón “Agregar” de un producto.
(captura)

- *Verificacion* - Aparece en el área de pedido ( getByRole('list') ).
(captura)

- *Implementacion* - Estado local o contexto ( useOrder ).
(captura)

---
HU3 - Calcular total del pedido

- *Test* - agregar varios productos y verificar el texto "Total: $..." .
(captura)

- *Implementacion* - Implementar cálculo dinámico.
(captura)

- *Verificacion* -  Validar con expect(screen.getByText(/total:
\$\d+/i)).toBeInTheDocument() .
(captura)

---
HU4 - Eliminar ítem del pedido

- *Test* - verificar que el clic en “Eliminar” remueve solo ese producto.
(captura)

- *Implementacion* - Implementar e.stopPropagation() si se anidan botones.
(captura)

- *Usar* - setState funcional.
(captura)

---
HU5 -  Enviar pedido (MSW + Contexto) - Mockear endpoint /api/orders con MSW .

*Test*
1. Agregar varios ítems.
2. Click en “Enviar pedido”.
3. Esperar await waitFor(...) que muestre mensaje “Pedido confirmado”.

(captura)


*Implementacion* - Implementar envío y limpiar estado tras éxito.
(captura)

---
HU6 -  Caso límite: error o menú vacío

- *Test* -  Usar server.use() para simular un error 500 o lista vacía.
(captura)

- *Implementacion* - Verificar que la app muestre “No hay productos disponibles” o “Error al cargar
menú”
(captura)

---

## Integracion completa



## Como ejecutar el proyeco
- git clone 
- cd TP3/cafeteria
- npm install
- npm run dev
---
## Ejecutar tests
- npx vitest
