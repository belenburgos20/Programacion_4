import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("HU5 — Enviar pedido (mock POST)", () => {
  test("envia el pedido y muestra mensaje de confirmación", async () => {
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

    fireEvent.click(screen.getByRole("button", { name: "Agregar Café" }));
    fireEvent.click(screen.getByRole("button", { name: "Agregar Tostada" }));

    const orderList = screen.getByRole("list", { name: "pedido-list" });
    expect(orderList).toHaveTextContent("Café");
    expect(orderList).toHaveTextContent("Tostada");
    expect(
      screen.getByRole("button", { name: "Enviar pedido" })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Enviar pedido" }));

    await waitFor(() => {
      expect(
        screen.getByText("Pedido enviado correctamente")
      ).toBeInTheDocument();
    });

    const orderListAfter = screen.getByRole("list", { name: "pedido-list" });
    expect(orderListAfter).toBeEmptyDOMElement();
  });
});
