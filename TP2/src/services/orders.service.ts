import type { ordenInput, Orden, estadoOrden } from "../models/order.model";

const BASE_PRECIOS = { S: 10000, M: 14500, L: 18000 };
const PRECIO_TOPPING = 1500;

let ordenes: any[] = [];
let nextId = 1;

function validarToppings(toppings: string[]) {
  if (toppings.length > 5) {
    throw new Error("máximo 5 toppings");
  }
}

export const ordersService = {
  crearPedido: (orderData: ordenInput) => {
    validarToppings(orderData.toppings);

    const base = BASE_PRECIOS[orderData.tamanio];
    const precio = base + orderData.toppings.length * PRECIO_TOPPING;

    return {
      tamanio: orderData.tamanio,
      toppings: orderData.toppings,
      estado: "pendiente" as estadoOrden,
      precio,
    };
  },

  crear: (items: ordenInput[], direccion: string) => {
    const id = `order-${nextId++}`;
    const precioTotal = items.reduce((acc, item) => {
      const result = ordersService.crearPedido(item);
      return acc + result.precio;
    }, 0);

    const orden = {
      id,
      items,
      direccion,
      estado: "pendiente" as estadoOrden,
      precioTotal,
      creadoEn: new Date(),
    };

    ordenes.push(orden);
    return orden;
  },

  buscarPorId: (id: string) => {
    return ordenes.find((o) => o.id === id) || null;
  },

  buscarTodos: (estado?: estadoOrden) => {
    if (estado) {
      return ordenes.filter((orden) => orden.estado === estado);
    }
    return ordenes;
  },

  cancelar: (id: string) => {
    const orden = ordersService.buscarPorId(id);
    if (!orden) return null;

    const esEntregado = orden.estado === "entregado";
    if (esEntregado) throw new Error("No se puede cancelar la orden");

    orden.estado = "cancelado";
    return orden;
  },

  clearAll: () => {
    ordenes = [];
    nextId = 1;
  },
};
