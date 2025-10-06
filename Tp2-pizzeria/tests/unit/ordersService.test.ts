import { ordersService } from "../../src/services/ordersService";
import { OrderInput } from "../../src/models/order";

describe('ordersService', () => {
  test('debería crear un pedido con precio calculado y estado pendiente', () => {
    const pedido: OrderInput = {
      size: 'M',
      toppings: ['queso', 'jamon']
    };

    //Llamamos a la función del servicio
    const resultado = ordersService.createOrder(pedido);

    expect(resultado).toHaveProperty('precio');           // que tenga precio
    expect(resultado.status).toBe('pending');            // que empiece pendiente
    expect(resultado.size).toBe('M');                    // que mantenga el tamaño
  });
});

