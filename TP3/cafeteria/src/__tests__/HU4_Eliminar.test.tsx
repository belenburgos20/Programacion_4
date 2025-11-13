import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("HU4 — Eliminar item del pedido", () => {
  test('El clic en "Eliminar" remueve solo ese producto', async () => {
    server.use(
      http.get("/api/menu", () =>
        HttpResponse.json([
          { id: "1", name: "Café", price: 2500 },
          { id: "2", name: "Tostada", price: 3000 },
        ])
      )
    );
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Agregar Café" })
      ).toBeInTheDocument();
    });

    const addCafe = screen.getByRole("button", { name: "Agregar Café" });
    const addTostada = screen.getByRole("button", { name: "Agregar Tostada" });

    fireEvent.click(addCafe);
    fireEvent.click(addTostada);
    const removeCafe = screen.getByRole("button", { name: "Eliminar Café" });
    fireEvent.click(removeCafe);

    const orderList = screen.getByRole("list", { name: "pedido-list" });

    expect(orderList).not.toHaveTextContent("Café");
    expect(orderList).toHaveTextContent("Tostada");
  });
});
