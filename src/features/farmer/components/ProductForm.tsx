import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../stores/authStore';

interface Product {
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
}

const ProductForm = () => {
  const { user } = useAuthStore();
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    quantity: 1,
    category: 'vegetables',
    description: ''
  });

  const categories = [
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'dairy', label: 'Dairy' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('products')
        .insert({
          ...product,
          farmer_id: user.id,
          available: true
        });

      if (error) throw error;

      setProduct({
        name: '',
        price: 0,
        quantity: 1,
        category: 'vegetables',
        description: ''
      });
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-header">Add New Product</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form fields */}
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-dark mt-6"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;