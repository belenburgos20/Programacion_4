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
