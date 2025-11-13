import { type Product } from "../types";

type Props = {
  products: Product[];
  onAdd: (product: Product) => void;
};

export default function Menu({ products, onAdd }: Props) {
  return (
    <ul aria-label="menu-list">
      {products.map((p) => (
        <li key={p.id}>
          {p.name}
          <button onClick={() => onAdd(p)}>Agregar {p.name}</button>
        </li>
      ))}
    </ul>
  );
}
