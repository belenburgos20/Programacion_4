import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("HU2 — Agregar item al pedido", () => {
  test('agrega un producto al pedido al hacer click en "Agregar", refactor', async () => {
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

    const addButton = screen.getByRole("button", { name: "Agregar Café" });
    fireEvent.click(addButton);

    const orderList = screen.getByRole("list", { name: "pedido-list" });
    expect(orderList).toHaveTextContent("Café");
  });
});
