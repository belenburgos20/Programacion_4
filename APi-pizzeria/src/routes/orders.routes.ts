<<<<<<< HEAD:APi-pizzeria/src/routes/orders.routes.ts
// Orders Routes - API Endpoints
import express from "express"
import { ordersController } from "../controllers/order.controllers"

const router = express.Router()

router.post("/", ordersController.createOrder)
router.get("/:id", ordersController.getOrderById)
router.post("/:id/cancel", ordersController.cancelOrder)
router.get("/", ordersController.listOrders)

export default router
=======
import express from "express"
import { ordersController } from "../controllers/order.controllers"

const router = express.Router()

router.post("/", ordersController.crearPedido)
router.get("/:id", ordersController.getOrdenPorId)
router.post("/:id/cancel", ordersController.cancelarOrden)
router.get("/", ordersController.listarOrdenes)

export default router
>>>>>>> origin/dev:APi-pizzeria(revision)/src/routes/orders.routes.ts
