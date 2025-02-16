import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../stores/authStore';

const ProductList = () => {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('farmer_id', user.id);

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data || []);
    };

    fetchProducts();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-header">የእርስዎ ምርቶች</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.price} ብር/ {product.unit}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
            <div className="mt-2 flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  product.available ? 'bg-success text-white' : 'bg-error text-white'
                }`}
              >
                {product.available ? 'በመሸጫ ላይ' : 'የተጠናቀቀ'}
              </span>
              <button className="text-primary hover:text-primary-dark">አስተካክል</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;