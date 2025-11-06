<<<<<<< HEAD:APi-pizzeria/src/models/order.model.ts
export type OrderInput = {
  size: "S" | "M" | "L"
  toppings: string[]
}

export type OrderStatus = "pending" | "preparing" | "delivered" | "cancelled"

export type Order = {
  id: string
  items: OrderInput[]
  address: string
  status: OrderStatus
  totalPrice: number
  createdAt: Date
}
=======
export type ordenInput = {
  tamanio: "S" | "M" | "L"
  toppings: string[]
}

export type estadoOrden = "pendiente" | "preparado" | "entregado" | "cancelado"

export type Orden = {
  id: string
  items: ordenInput[]
  direccion: string
  estado: estadoOrden
  precioTotal: number
  creadoEn: Date
}
>>>>>>> origin/dev:APi-pizzeria(revision)/src/models/order.model.ts
