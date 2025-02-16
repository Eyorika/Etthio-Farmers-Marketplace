import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import ImageUploader from '../../components/ImageUploader';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: 'vegetables',
    imageUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit product to Supabase
    const { error } = await supabase
      .from('products')
      .insert([{ ...product, price: Number(product.price) }]);

    if (error) {
      console.error('Error saving product:', error);
      return;
    }

    // Reset form
    setProduct({
      name: '',
      price: '',
      quantity: '',
      category: 'vegetables',
      imageUrl: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Other form fields */}
      
      <ImageUploader 
        onUpload={(url) => setProduct({ ...product, imageUrl: url })}
      />

      <button
        type="submit"
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
      >
        Save Product
      </button>
    </form>
  );
};