<<<<<<< HEAD:APi-pizzeria/tests/unit/ordersService.test.ts
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
=======
import { ordersService } from "../../src/services/orders.service"
import type { ordenInput } from "../../src/models/order.model"

describe("ordersService", () => {
  beforeEach(() => {
    ordersService.clearAll()
  })

  test("deberia crear un pedido con precio calculado y estado pendiente", () => {
    const pedido: ordenInput = {
      tamanio: "M",
      toppings: ["queso", "jamon"],
    }

    const resultado = ordersService.crearPedido(pedido)

    expect(resultado).toHaveProperty("precio")
    expect(resultado.estado).toBe("pendiente")
    expect(resultado.tamanio).toBe("M")
  })

  test("deberia calcular el precio correctamente según tamaño y toppings", () => {
    const pedidoS: ordenInput = { tamanio: "S", toppings: ["queso"] }
    const pedidoM: ordenInput = { tamanio: "M", toppings: ["queso", "jamon"] }
    const pedidoL: ordenInput = { tamanio: "L", toppings: ["queso", "jamon", "tomate"] }

    expect(ordersService.crearPedido(pedidoS).precio).toBe(11500) 
    expect(ordersService.crearPedido(pedidoM).precio).toBe(17500) 
    expect(ordersService.crearPedido(pedidoL).precio).toBe(22500) 
  })

  test("no deberia permitir cancelar un pedido entregado", () => {
    const orden = ordersService.crear([{ tamanio: "M", toppings: ["queso"] }], "Calle Falsa 123")

    orden.estado = "entregado"

    expect(() => ordersService.cancelar(orden.id)).toThrow("No se puede cancelar la orden")
  })

  test("deberia permitir cancelar un pedido pendiente", () => {
    const orden = ordersService.crear([{ tamanio: "M", toppings: ["queso"] }], "Calle Falsa 123")
    expect(orden.estado).toBe("pendiente")
    const cancelado = ordersService.cancelar(orden.id)
    expect(cancelado).not.toBeNull()
    expect(cancelado?.estado).toBe("cancelado")
  })
})
>>>>>>> origin/dev:APi-pizzeria(revision)/tests/unit/ordersService.test.ts
