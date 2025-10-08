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
