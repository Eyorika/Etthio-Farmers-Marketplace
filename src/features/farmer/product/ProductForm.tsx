import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../stores/authStore';
import { ETHIOPIAN_CROPS } from '../../../data/ethiopianCrops';

const ProductForm = () => {
  const { user } = useAuthStore();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: 'vegetables',
    unit: 'kg',
    description: '',
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageURL = '';

      // Upload image to Supabase Storage
      if (product.image) {
        const fileExt = product.image.name.split('.').pop();
        const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products_images')
          .upload(filePath, product.image);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('products_images')
          .getPublicUrl(filePath);

        imageURL = urlData.publicUrl;
      }

      // Save product data to Supabase
      const { error } = await supabase.from('products').insert([
        {
          name: product.name,
          price: Number(product.price),
          quantity: Number(product.quantity),
          category: product.category,
          unit: product.unit,
          description: product.description,
          image_url: imageURL,
          farmer_id: user?.id,
          available: true,
        },
      ]);

      if (error) throw error;

      // Reset form
      setProduct({
        name: '',
        price: '',
        quantity: '',
        category: 'vegetables',
        unit: 'kg',
        description: '',
        image: null,
      });

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-header">አዲስ ምርት ያስገቡ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields remain the same */}
      </form>
    </div>
  );
};

export default ProductForm;