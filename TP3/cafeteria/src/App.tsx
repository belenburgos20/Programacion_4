import { type Product } from "./types";
import Menu from "./components/Menu";
import { useOrder } from "./hooks/useOrder";
import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { order, addToOrder, getTotal, removeOrder, resetOrder } = useOrder();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProducts(data);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleSendOrder = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await res.json();
      if (res.ok) {
        resetOrder();
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1>Menú</h1>

      {error && <p>Error al cargar menú</p>}

      {!error && !loading && products.length === 0 && (
        <p>No hay productos disponibles</p>
      )}

      {!error && !loading && products.length > 0 && (
        <Menu products={products} onAdd={addToOrder} />
      )}

      <h2>Pedido</h2>
      <ul aria-label="pedido-list">
        {order.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeOrder(item.id);
              }}
            >
              Eliminar {item.name}
            </button>
          </li>
        ))}
      </ul>

      <p>Total: ${getTotal()}</p>

      {order.length > 0 && (
        <>
          <button onClick={handleSendOrder}>Enviar pedido</button>
        </>
      )}

      {message && <p>{message}</p>}
    </main>
  );
}
