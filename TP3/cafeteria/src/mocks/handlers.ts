import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/menu", () => {
    return HttpResponse.json([
      { id: "1", name: "Café", price: 2500 },
      { id: "2", name: "Tostada", price: 3000 },
    ]);
  }),

  http.post("/api/orders", async () => {
    return HttpResponse.json(
      { message: "Pedido enviado correctamente" },
      { status: 201 }
    );
  }),
];
