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
