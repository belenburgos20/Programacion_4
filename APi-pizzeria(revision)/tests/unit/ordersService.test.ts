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

  test("deberia calcular el precio correctamente según size y toppings", () => {
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

    const cancelled = ordersService.cancelar(orden.id)

    expect(cancelled).not.toBeNull()
    expect(cancelled?.estado).toBe("cancelado")
  })
})
