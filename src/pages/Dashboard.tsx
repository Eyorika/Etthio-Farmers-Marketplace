import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, farmers!inner(user_id)")
        .eq("farmers.user_id", user.id);

      if (!error) setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();

    const subscription = supabase
      .channel("realtime:products")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "products" },
        (payload) => {
          setProducts((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">የእርስዎ ምርቶች</h1>

      {loading ? (
        <p className="text-center py-4 text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">እስካሁን ምንም ምርት አልጨመሩም</p>
          <Link to="/add-product" className="text-primary hover:underline">
            አዲስ ምርት ይጨምሩ
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{product.name}</h3>
              <p>{product.price} ብር</p>
              <p>ብዛት: {product.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
