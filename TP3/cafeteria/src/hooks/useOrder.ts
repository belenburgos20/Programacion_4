import { useState } from "react";
import { type Product } from "../types";

export function useOrder() {
  const [order, setOrder] = useState<Product[]>([]);

  const addToOrder = (product: Product) => {
    setOrder((prev) => [...prev, product]);
  };

  const getTotal = () => order.reduce((total, item) => total + item.price, 0);

  const removeOrder = (productId: string) => {
    setOrder((prev) => prev.filter((item) => item.id !== productId));
  };

  const resetOrder = () => setOrder([]);

  return { order, addToOrder, getTotal, removeOrder, resetOrder };
}
