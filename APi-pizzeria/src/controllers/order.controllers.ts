<<<<<<< HEAD:APi-pizzeria/src/controllers/order.controllers.ts
import type { Request, Response } from "express"
import { z } from "zod"
import { ordersService } from "../services/orders.service"

const OrderItemSchema = z.object({
  size: z.enum(["S", "M", "L"], {
    errorMap: () => ({ message: "Size must be S, M, or L" }),
  }),
  toppings: z.array(z.string()).max(5, "Maximum 5 toppings allowed"),
})

const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).min(1, "Items array cannot be empty"),
  address: z.string().min(10, "Address must be at least 10 characters"),
})

const ListOrdersQuerySchema = z.object({
  status: z.enum(["pending", "preparing", "delivered", "cancelled"]).optional(),
})

export const ordersController = {
  createOrder: (req: Request, res: Response) => {
    try {
      const result = CreateOrderSchema.safeParse(req.body)

      if (!result.success) {
        return res.status(422).json({
          error: "Validation error",
          details: result.error.errors,
        })
      }

      const { items, address } = result.data
      const order = ordersService.create(items, address)

      return res.status(201).json(order)
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" })
    }
  },

  getOrderById: (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const order = ordersService.findById(id)

      if (!order) {
        return res.status(404).json({ error: "Order not found" })
      }

      return res.status(200).json(order)
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" })
    }
  },

  cancelOrder: (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const order = ordersService.cancel(id)

      if (!order) {
        return res.status(404).json({ error: "Order not found" })
      }

      return res.status(200).json({
        ...order,
        message: "Order cancelled successfully",
      })
    } catch (error) {
      if (error instanceof Error && error.message === "Cannot cancel delivered order") {
        return res.status(409).json({ error: error.message })
      }
      return res.status(500).json({ error: "Internal server error" })
    }
  },

  listOrders: (req: Request, res: Response) => {
    try {
      const result = ListOrdersQuerySchema.safeParse(req.query)

      if (!result.success) {
        return res.status(422).json({
          error: "Invalid query parameters",
          details: result.error.errors,
        })
      }

      const { status } = result.data
      const orders = ordersService.findAll(status)

      return res.status(200).json(orders)
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" })
    }
  },
}
=======
import type { Request, Response } from "express"
import { z } from "zod"
import { ordersService } from "../services/orders.service"

const ordenItemSchema = z.object({
  tamanio: z.enum(["S", "M", "L"], {
    errorMap: () => ({ message: "Tamanio debe ser S, M, o L" }),
  }),
  toppings: z.array(z.string()).max(5, "Maximo 5 toppings"),
})

const crearOrdenSchema = z.object({
  items: z.array(ordenItemSchema).min(1, "Minimo 1 item"),
  direccion: z.string().min(10, "Minimo 10 caracteres"),
})

const listarOrdenesSchema = z.object({
  estado: z.enum(["pendiente", "preparado", "entregado", "cancelado"]).optional(),
})

export const ordersController = {
  crearPedido: (req: Request, res: Response) => {
    try {
      const resultado = crearOrdenSchema.safeParse(req.body)

      if (!resultado.success) {
        return res.status(422).json({
          error: "Error de validacion",
          details: resultado.error.errors,
        })
      }

      const { items, direccion } = resultado.data
      const orden = ordersService.crear(items, direccion)

      return res.status(201).json(orden)
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  getOrdenPorId: (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const orden = ordersService.buscarPorId(id)

      if (!orden) {
        return res.status(404).json({ error: "Orden no econtrada" })
      }

      return res.status(200).json(orden)
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  cancelarOrden: (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const orden = ordersService.cancelar(id)

      if (!orden) {
        return res.status(404).json({ error: "Orden no encontrada" })
      }

      return res.status(200).json({
        ...orden,
        message: "Orden cancelada exitosamente",
      })
    } catch (error) {
      if (error instanceof Error && error.message === "No se puede cancelar la orden") { 
        return res.status(409).json({ error: "No se puede cancelar la orden" })
      }
      return res.status(500).json({ error: "Error interno del servidor" })
    }
  },

  listarOrdenes: (req: Request, res: Response) => {
    try {
      const resultado = listarOrdenesSchema.safeParse(req.query)

      if (!resultado.success) {
        return res.status(422).json({
          error: "Error de validacion",
          details: resultado.error.errors,
        })
      }

      const { estado } = resultado.data
      const ordenes = ordersService.buscarTodos(estado)

      return res.status(200).json(ordenes)
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" })
    }
  },
}
>>>>>>> origin/dev:APi-pizzeria(revision)/src/controllers/order.controllers.ts
