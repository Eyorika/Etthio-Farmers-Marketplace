// src/components/ProductList.tsx
import { useEffect, useState } from "react";
import { getProducts } from "../api/firestore";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Available Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.price} ETB/kg
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
