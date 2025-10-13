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
