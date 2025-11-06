<<<<<<< HEAD:APi-pizzeria/src/services/orders.service.ts
// Orders Service - Business Logic
import type { OrderInput, Order, OrderStatus } from "../models/order.model"

let orders: Order[] = []
let nextId = 1

export const ordersService = {
  createOrder: (orderData: OrderInput) => {
    const basePrecios = {
      S: 10000,
      M: 14500,
      L: 18000,
    }

    const base = basePrecios[orderData.size]
    const precio = base + orderData.toppings.length * 1500

    return {
      size: orderData.size,
      toppings: orderData.toppings,
      status: "pending" as OrderStatus,
      precio,
    }
  },

  create: (items: OrderInput[], address: string): Order => {
    const id = `order-${nextId++}`

    let totalPrice = 0
    for (const item of items) {
      const result = ordersService.createOrder(item)
      totalPrice += result.precio
    }

    const order: Order = {
      id,
      items,
      address,
      status: "pending",
      totalPrice,
      createdAt: new Date(),
    }

    orders.push(order)
    return order
  },

  findById: (id: string): Order | null => {
    return orders.find((order) => order.id === id) || null
  },

  findAll: (status?: OrderStatus): Order[] => {
    if (status) {
      return orders.filter((order) => order.status === status)
    }
    return orders
  },

  cancel: (id: string): Order | null => {
    const order = ordersService.findById(id)

    if (!order) {
      return null
    }

    if (order.status === "delivered") {
      throw new Error("Cannot cancel delivered order")
    }

    order.status = "cancelled"
    return order
  },

  clearAll: () => {
    orders = []
    nextId = 1
  },
}
=======
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
>>>>>>> origin/dev:APi-pizzeria(revision)/src/services/orders.service.ts
