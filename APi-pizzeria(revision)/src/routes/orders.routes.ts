import express from "express"
import { ordersController } from "../controllers/order.controllers"

const router = express.Router()

router.post("/", ordersController.crearPedido)
router.get("/:id", ordersController.getOrdenPorId)
router.post("/:id/cancel", ordersController.cancelarOrden)
router.get("/", ordersController.listarOrdenes)

export default router
