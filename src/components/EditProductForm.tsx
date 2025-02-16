import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Product } from '../types/product';
type EditProductFormProps = {
  product: Product;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  onClose: () => void;
};

const EditProductForm: React.FC<EditProductFormProps> = ({ product, setEditingProduct, onClose }) => {
  const [formData, setFormData] = useState<Product>({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    category: product.category,
    image_url: product.image_url || '',
    farmer_id: product.farmer_id,
    created_at: product.created_at
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: formData.name,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
        })
        .eq("id", product.id);
  
      if (error) throw error;
      setEditingProduct(null);
    } catch (error) {
      console.error("ምርቱን ማስተካከል አልተቻለም:", error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">ምርት ማስተካከያ</h2>

        <label className="block mb-2">
          ምርት ስም:
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </label>

        <label className="block mb-2">
          ዋጋ (ብር):
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </label>

        <label className="block mb-2">
          ብዛት:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </label>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-400 text-white px-3 py-1 rounded-md">
            መተው
          </button>
          <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded-md">
            ማስተካከያ
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
