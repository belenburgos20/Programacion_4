import { ordersService } from "../../src/services/orders.service";
import type { ordenInput } from "../../src/models/order.model";

describe("ordersService", () => {
  beforeEach(() => {
    ordersService.clearAll();
  });

  test("deberia crear un pedido con precio calculado y estado pendiente", () => {
    const pedido: ordenInput = {
      tamanio: "M",
      toppings: ["queso", "jamon"],
    };

    const resultado = ordersService.crearPedido(pedido);

    expect(resultado).toHaveProperty("precio");
    expect(resultado.estado).toBe("pendiente");
    expect(resultado.tamanio).toBe("M");
  });

  test("no debería permitir más de 5 toppings", () => {
    const pedido: ordenInput = {
      tamanio: "L",
      toppings: ["a", "b", "c", "d", "e", "f"],
    };
    expect(() => ordersService.crearPedido(pedido)).toThrow(
      "máximo 5 toppings"
    );
  });

  test("no debería permitir cancelar un pedido entregado", () => {
    const orden = ordersService.crear(
      [{ tamanio: "M", toppings: ["queso"] }],
      "Calle Falsa 123"
    );
    orden.estado = "entregado";

    expect(() => ordersService.cancelar(orden.id)).toThrow(
      "No se puede cancelar la orden"
    );
  });

  test("debería permitir cancelar un pedido pendiente", () => {
    const orden = ordersService.crear(
      [{ tamanio: "M", toppings: ["queso"] }],
      "Calle Falsa 123"
    );

    expect(orden.estado).toBe("pendiente");

    const resultado = ordersService.cancelar(orden.id);

    expect(resultado).not.toBeNull();
    expect(resultado?.estado).toBe("cancelado");
  });
});
