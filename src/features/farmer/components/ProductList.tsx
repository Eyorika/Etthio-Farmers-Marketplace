import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../stores/authStore';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string; // Add this
  image_url: string;   // Add this
  farmer_id: string;   // Add this
}
const ProductList = () => {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);

  // Function to fetch products from Supabase
  const fetchProducts = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('farmer_id', user.id);

    if (error) {
      console.error('Error fetching products:', error.message);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Fetch initial products
    fetchProducts();

    // Real-time updates (Subscribe to changes in 'products' table)
    const channel = supabase
      .channel('products_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products', filter: `farmer_id=eq.${user.id}` },
        (payload) => {
          console.log('Change received:', payload);
          fetchProducts(); // Re-fetch products on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-6 py-3 text-left">Name</th>
          <th className="px-6 py-3 text-left">Price</th>
          <th className="px-6 py-3 text-left">Quantity</th>
          <th className="px-6 py-3 text-left">Categories</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-t">
            <td className="px-6 py-4">{product.name}</td>
            <td className="px-6 py-4">{product.price} ብር</td>
            <td className="px-6 py-4">{product.quantity}</td>
            <td className="px-6 py-4">{product.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
