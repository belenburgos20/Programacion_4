import { ordersService } from "../../src/services/orders.service"
import type { OrderInput } from "../../src/models/order.model"

describe("ordersService", () => {
  beforeEach(() => {
    ordersService.clearAll()
  })

  test("debería crear un pedido con precio calculado y estado pendiente", () => {
    const pedido: OrderInput = {
      size: "M",
      toppings: ["queso", "jamon"],
    }

    // Llamamos a la función del servicio
    const resultado = ordersService.createOrder(pedido)

    expect(resultado).toHaveProperty("precio")
    expect(resultado.status).toBe("pending")
    expect(resultado.size).toBe("M")
  })

  test("debería calcular el precio correctamente según size y toppings", () => {
    const pedidoS: OrderInput = { size: "S", toppings: ["queso"] }
    const pedidoM: OrderInput = { size: "M", toppings: ["queso", "jamon"] }
    const pedidoL: OrderInput = { size: "L", toppings: ["queso", "jamon", "tomate"] }

    expect(ordersService.createOrder(pedidoS).precio).toBe(11500) // 10000 + 1500
    expect(ordersService.createOrder(pedidoM).precio).toBe(17500) // 14500 + 3000
    expect(ordersService.createOrder(pedidoL).precio).toBe(22500) // 18000 + 4500
  })

  test("no debería permitir cancelar un pedido entregado", () => {
    const order = ordersService.create([{ size: "M", toppings: ["queso"] }], "Calle Falsa 123")

    // Simular que el pedido fue entregado
    order.status = "delivered"

    expect(() => ordersService.cancel(order.id)).toThrow("Cannot cancel delivered order")
  })

  test("debería permitir cancelar un pedido pendiente", () => {
    const order = ordersService.create([{ size: "M", toppings: ["queso"] }], "Calle Falsa 123")

    const cancelled = ordersService.cancel(order.id)

    expect(cancelled).not.toBeNull()
    expect(cancelled?.status).toBe("cancelled")
  })
})
