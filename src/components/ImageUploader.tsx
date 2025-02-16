import { useState } from 'react';
import { supabase } from '../lib/supabase';

const ImageUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    setUploading(true);
    
    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    onUpload(urlData.publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleUpload} 
        disabled={uploading}
        accept="image/*"
      />
    </div>
  );
};

export default ImageUploader;