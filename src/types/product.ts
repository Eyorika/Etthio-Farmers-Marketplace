// types/product.ts
export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    image_url?: string;
    farmer_id: string;
    created_at: string;
    available?: boolean;
    description?: string;
  }