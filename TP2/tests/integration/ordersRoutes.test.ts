import request from "supertest";
import { makeApp } from "../../src/app";
import { ordersService } from "../../src/services/orders.service";

describe("ordenes routes", () => {
  const app = makeApp();

  beforeEach(() => {
    ordersService.clearAll();
  });

  describe("POST /", () => {
    test("deberia crear un pedido valido y retornar 201", async () => {
      const respuesta = await request(app)
        .post("/")
        .send({
          items: [{ tamanio: "M", toppings: ["queso", "jamón"] }],
          direccion: "Calle Falsa 123, Yrigoyen 585",
        });

      expect(respuesta.status).toBe(201);
      expect(respuesta.body).toHaveProperty("id");
      expect(respuesta.body).toHaveProperty("precioTotal");
      expect(respuesta.body.estado).toBe("pendiente");
    });
    test("deberia rechazar pedido con items vacio (422)", async () => {
      const respuesta = await request(app).post("/").send({
        items: [],
        direccion: "Calle Falsa 123",
      });
      expect(respuesta.status).toBe(422);
    });

    test("deberia rechazar pedido con direccion muy corto (422)", async () => {
      const respuesta = await request(app)
        .post("/")
        .send({
          items: [{ tamanio: "M", toppings: ["queso"] }],
          direccion: "abc",
        });

      expect(respuesta.status).toBe(422);
    });
  }),
    describe("GET /:id", () => {
      test("deberia retornar un pedido existente (200)", async () => {
        const orden = ordersService.crear(
          [{ tamanio: "M", toppings: ["queso"] }],
          "Calle Falsa 123"
        );
        const respuesta = await request(app).get(`/${orden.id}`);
        expect(respuesta.status).toBe(200);
        expect(respuesta.body.id).toBe(orden.id);
      });

      test("deberia retornar 404 si el pedido no existe", async () => {
        const respuesta = await request(app).get("/:id");
        expect(respuesta.status).toBe(404);
      });
    });
  describe("POST /:id/cancel", () => {
    test("deberia cancelar un pedido pendiente (200)", async () => {
      const orden = ordersService.crear(
        [{ tamanio: "M", toppings: ["queso"] }],
        "Calle Falsa 123"
      );
      const respuesta = await request(app).post(`/${orden.id}/cancel`);
      expect(respuesta.status).toBe(200);
      expect(respuesta.body.estado).toBe("cancelado");
    });

    test("deberia rechazar cancelar un pedido entregado (409)", async () => {
      const orden = ordersService.crear(
        [{ tamanio: "M", toppings: ["queso"] }],
        "Calle Falsa 123"
      );
      orden.estado = "entregado";
      const respuesta = await request(app).post(`/${orden.id}/cancel`);
      expect(respuesta.status).toBe(409);
    });
  });

  describe("GET /", () => {
    test("deberia listar todos los pedidos", async () => {
      ordersService.crear(
        [{ tamanio: "M", toppings: ["queso"] }],
        "Direccion 1"
      );
      ordersService.crear(
        [{ tamanio: "L", toppings: ["jamón"] }],
        "Direccion 2"
      );
      const respuesta = await request(app).get("/");
      expect(respuesta.status).toBe(200);
      expect(Array.isArray(respuesta.body)).toBe(true);
      expect(respuesta.body.length).toBe(2);
    });

    test("deberia filtrar pedidos por estado", async () => {
      const orden1 = ordersService.crear(
        [{ tamanio: "M", toppings: ["queso"] }],
        "Direccion 1"
      );
      const orden2 = ordersService.crear(
        [{ tamanio: "L", toppings: ["jamón"] }],
        "Direccion 2"
      );
      orden2.estado = "entregado";
      const respuesta = await request(app).get("/?estado=pendiente");
      expect(respuesta.status).toBe(200);
      expect(respuesta.body.length).toBe(1);
      expect(respuesta.body[0].estado).toBe("pendiente");
    });
  });
});
