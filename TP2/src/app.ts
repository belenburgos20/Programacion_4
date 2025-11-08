import express from "express"
import ordersRouter from "./routes/orders.routes"

export function makeApp() {
  const app = express()
  app.use(express.json())

  app.use("/", ordersRouter)

  return app
}
