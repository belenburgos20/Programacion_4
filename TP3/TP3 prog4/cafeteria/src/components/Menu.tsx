import { useEffect, useState } from 'react';
import type { Product } from '../types/product';

export default function Menu() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch('/api/menu');
      const data: Product[] = await res.json();
      if (active) setItems(data);
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <ul>
      {items.map((p) => (
        <li key={p.id}>{p.name} - ${p.price}</li>
      ))}
    </ul>
  );
}