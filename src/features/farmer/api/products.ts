import { supabase } from '../../../lib/supabase';

export const addProduct = async (product: {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  categories: string[];
  description: string;
  image_url?: string;
  farmer_id?: string;
  created_at?: string;
}) => {
  const { data, error } = await supabase.from('products').insert([product]);

  if (error) {
    console.error('Error adding product:', error.message);
  } else {
    console.log('Product added:', data);
  }
};
