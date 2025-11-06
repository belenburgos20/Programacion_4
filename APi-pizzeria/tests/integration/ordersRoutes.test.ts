<<<<<<< HEAD:APi-pizzeria/tests/integration/ordersRoutes.test.ts
import request from "supertest"
import { makeApp } from "../../src/app"
import { ordersService } from "../../src/services/orders.service"

describe("orders routes", () => {
  const app = makeApp()

  beforeEach(() => {
    ordersService.clearAll()
  })

  describe("POST /", () => {
    test("debería crear un pedido válido y retornar 201", async () => {
      const response = await request(app)
        .post("/")
        .send({
          items: [{ size: "M", toppings: ["queso", "jamón"] }],
          address: "Calle Falsa 123, Springfield",
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty("id")
      expect(response.body).toHaveProperty("totalPrice")
      expect(response.body.status).toBe("pending")
    })

    test("debería rechazar pedido con items vacío (422)", async () => {
      const response = await request(app).post("/").send({
        items: [],
        address: "Calle Falsa 123",
      })

      expect(response.status).toBe(422)
    })

    test("debería rechazar pedido con address muy corto (422)", async () => {
      const response = await request(app)
        .post("/")
        .send({
          items: [{ size: "M", toppings: ["queso"] }],
          address: "abc",
        })

      expect(response.status).toBe(422)
    })
  })

  describe("GET /:id", () => {
    test("debería retornar un pedido existente (200)", async () => {
      const order = ordersService.create([{ size: "M", toppings: ["queso"] }], "Calle Falsa 123")
      const response = await request(app).get(`/${order.id}`)
      expect(response.status).toBe(200)
      expect(response.body.id).toBe(order.id)
    })

    test("debería retornar 404 si el pedido no existe", async () => {
      const response = await request(app).get("/:id")
      expect(response.status).toBe(404)
    })
  })

  describe("POST /:id/cancel", () => {
    test("debería cancelar un pedido pendiente (200)", async () => {
      const order = ordersService.create([{ size: "M", toppings: ["queso"] }], "Calle Falsa 123")

      const response = await request(app).post(`/${order.id}/cancel`)

      expect(response.status).toBe(200)
      expect(response.body.status).toBe("cancelled")
    })

    test("debería rechazar cancelar pedido entregado (409)", async () => {
      const order = ordersService.create([{ size: "M", toppings: ["queso"] }], "Calle Falsa 123")
      order.status = "delivered"

      const response = await request(app).post(`/${order.id}/cancel`)

      expect(response.status).toBe(409)
    })
  })

  describe("GET /", () => {
    test("debería listar todos los pedidos", async () => {
      ordersService.create([{ size: "M", toppings: ["queso"] }], "Direccion 1")
      ordersService.create([{ size: "L", toppings: ["jamón"] }], "Direccion 2")

      const response = await request(app).get("/")

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(2)
    })

    test("debería filtrar pedidos por status", async () => {
      const order1 = ordersService.create([{ size: "M", toppings: ["queso"] }], "Direccion 1")
      const order2 = ordersService.create([{ size: "L", toppings: ["jamón"] }], "Direccion 2")
      order2.status = "delivered"

      const response = await request(app).get("/?status=pending")

      expect(response.status).toBe(200)
      expect(response.body.length).toBe(1)
      expect(response.body[0].status).toBe("pending")
    })
  })
})
=======
import request from "supertest"
import { makeApp } from "../../src/app"
import { ordersService } from "../../src/services/orders.service"

describe("ordenes routes", () => {
  const app = makeApp()

  beforeEach(() => {
    ordersService.clearAll()
  })

  describe("POST /", () => {
    test("deberia crear un pedido valido y retornar 201", async () => {
      const respuesta = await request(app)
        .post("/")
        .send({
          items: [{ tamanio: "M", toppings: ["queso", "jamón"] }],
          direccion: "Calle Falsa 123, Springfield",
        })

      expect(respuesta.status).toBe(201)
      expect(respuesta.body).toHaveProperty("id")
      expect(respuesta.body).toHaveProperty("precioTotal")
      expect(respuesta.body.estado).toBe("pendiente")
    })

    test("deberia rechazar pedido con items vacio (422)", async () => {
      const respuesta = await request(app).post("/").send({
        items: [],
        direccion: "Calle Falsa 123",
      })
      expect(respuesta.status).toBe(422)
    })

    test("deberia rechazar pedido con direccion muy corto (422)", async () => {
      const respuesta = await request(app)
        .post("/")
        .send({
          items: [{ tamanio: "M", toppings: ["queso"] }],
          direccion: "abc",
        })

      expect(respuesta.status).toBe(422)
    })
  })

  describe("GET /:id", () => {
    test("deberia retornar un pedido existente (200)", async () => {
      const orden = ordersService.crear([{ tamanio: "M", toppings: ["queso"] }], "Calle Falsa 123")
      const respuesta = await request(app).get(`/${orden.id}`)
      expect(respuesta.status).toBe(200)
      expect(respuesta.body.id).toBe(orden.id)
    })

    test("deberia retornar 404 si el pedido no existe", async () => {
      const respuesta = await request(app).get("/:id")
      expect(respuesta.status).toBe(404)
    })
  })

  describe("POST /:id/cancel", () => {
    test("deberia cancelar un pedido pendiente (200)", async () => {
      const orden = ordersService.crear([{ tamanio: "M", toppings: ["queso"] }], "Calle Falsa 123")
      const respuesta = await request(app).post(`/${orden.id}/cancel`)
      expect(respuesta.status).toBe(200)
      expect(respuesta.body.estado).toBe("cancelado")
    })

    test("deberia rechazar cancelar un pedido entregado (409)", async () => {
      const orden = ordersService.crear([{ tamanio: "M", toppings: ["queso"] }], "Calle Falsa 123")
      orden.estado = "entregado"
      const respuesta = await request(app).post(`/${orden.id}/cancel`)
      expect(respuesta.status).toBe(409)
    })
  })

  describe("GET /", () => {
    test("deberia listar todos los pedidos", async () => {
      ordersService.crear([{ tamanio: "M", toppings: ["queso"] }], "Direccion 1")
      ordersService.crear([{ tamanio: "L", toppings: ["jamón"] }], "Direccion 2")
      const respuesta = await request(app).get("/")
      expect(respuesta.status).toBe(200)
      expect(Array.isArray(respuesta.body)).toBe(true)
      expect(respuesta.body.length).toBe(2)
    })

    test("deberia filtrar pedidos por estado", async () => {
      const orden1 = ordersService.crear([{ tamanio: "M", toppings: ["queso"] }], "Direccion 1")
      const orden2 = ordersService.crear([{ tamanio: "L", toppings: ["jamón"] }], "Direccion 2")
      orden2.estado = "entregado"
      const respuesta = await request(app).get("/?estado=pendiente")
      expect(respuesta.status).toBe(200)
      expect(respuesta.body.length).toBe(1)
      expect(respuesta.body[0].estado).toBe("pendiente")
    })
  })
})
>>>>>>> origin/dev:APi-pizzeria(revision)/tests/integration/ordersRoutes.test.ts
