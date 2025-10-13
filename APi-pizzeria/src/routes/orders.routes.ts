// Orders Routes - API Endpoints
import express from "express"
import { ordersController } from "../controllers/order.controllers"

const router = express.Router()

router.post("/", ordersController.createOrder)
router.get("/:id", ordersController.getOrderById)
router.post("/:id/cancel", ordersController.cancelOrder)
router.get("/", ordersController.listOrders)

export default router
