import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("Test Integracion — Flujo completo", () => {
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
  test("muestra el total actualizado al agregar productos", async () => {
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

    expect(screen.getByText(/total:\s*\$\d+/i)).toBeInTheDocument();
  });
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
