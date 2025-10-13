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
