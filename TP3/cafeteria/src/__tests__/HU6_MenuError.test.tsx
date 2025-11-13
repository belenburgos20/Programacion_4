import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("HU6 — Caso límite: error o menú vacío", () => {
  test("muestra 'No hay productos disponibles' cuando la API retorna una lista vacía", async () => {
    server.use(http.get("/api/menu", () => HttpResponse.json([])));

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText("No hay productos disponibles")
      ).toBeInTheDocument();
    });
  });

  test("muestra 'Error al cargar menú' cuando la API retorna un error 500", async () => {
    server.use(
      http.get("/api/menu", () =>
        HttpResponse.json(
          { error: "Error interno del servidor" },
          { status: 500 }
        )
      )
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Error al cargar menú")).toBeInTheDocument();
    });
  });
});
