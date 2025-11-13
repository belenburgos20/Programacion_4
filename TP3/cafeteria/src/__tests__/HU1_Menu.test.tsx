import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("HU1, visualizacion inicial del menu ", () => {
  test("muestra productos del menu mockeados por la API, refactor", async () => {
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
      expect(screen.getByText("Café")).toBeInTheDocument();
    });
  });
});
