import type { ordenInput, Orden, estadoOrden } from "../models/order.model"

let ordenes: Orden[] = []
let nextId = 1

export const ordersService = {
  crearPedido: (orderData: ordenInput) => {
    const basePrecios = {
      S: 10000,
      M: 14500,
      L: 18000,
    }

    const base = basePrecios[orderData.tamanio]
    const precio = base + orderData.toppings.length * 1500

    return {
      tamanio: orderData.tamanio,
      toppings: orderData.toppings,
      estado: "pendiente" as estadoOrden,
      precio,
    }
  },

  crear: (items: ordenInput[], direccion: string): Orden => {
    const id = `order-${nextId++}`

    let precioTotal = 0
    for (const item of items) {
      const result = ordersService.crearPedido(item)
      precioTotal += result.precio
    }

    const order: Orden = {
      id,
      items,
      direccion,
      estado: "pendiente",
      precioTotal,
      creadoEn: new Date(),
    }

    ordenes.push(order)
    return order
  },

  buscarPorId: (id: string): Orden | null => {
    return ordenes.find((order) => order.id === id) || null
  },

  buscarTodos: (estado?: estadoOrden): Orden[] => {
    if (estado) {
      return ordenes.filter((order) => order.estado === estado)
    }
    return ordenes
  },

  cancelar: (id: string): Orden | null => {
    const order = ordersService.buscarPorId(id)

    if (!order) {
      return null
    }

    if (order.estado === "entregado") {
      throw new Error("No se puede cancelar la orden")
    }

    order.estado = "cancelado"
    return order
  },

  clearAll: () => {
    ordenes = []
    nextId = 1
  },
}
