export type User = {
    id: string;
    email?: string;
    app_metadata?: Record<string, any>;
    user_metadata?: Record<string, any>;
    // Add other Supabase user properties you need
  };
  
  export type Product = {
    id: string;
    name: string;
    price: number;
    // Add other product fields
  };