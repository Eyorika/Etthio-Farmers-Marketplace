import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../stores/authStore";
import { Link } from "react-router-dom";
import EditProductForm from "../../components/EditProductForm";
import { Product } from '../../types/product';
import toast from 'react-hot-toast';

import {
  PlusIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  PencilIcon,
  TrashIcon} from '@heroicons/react/24/outline'; 
import { ClipboardListIcon, DocumentDownloadIcon, SearchIcon } from "@heroicons/react/outline";

const Dashboard = () => {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [farmerId, setFarmerId] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "quantity">("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  // Data fetching and state management
  useEffect(() => {
    const getFarmer = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("farmers")
          .select("id")
          .eq("user_id", user.id)
          .single();
        if (error) throw error;
        setFarmerId(data?.id);
      } catch (error) {
        toast.error("Error fetching farmer ID");
      }
    };
    getFarmer();
  }, [user]);

  const fetchProducts = async () => {
    if (!farmerId) return;
    try {
      // Remove the .then(res => res) chain
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("farmer_id", farmerId);
  
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Realtime subscription and other effects
  useEffect(() => {
    if (!farmerId) return;
    fetchProducts();

    const subscription = supabase
      .channel("realtime:products")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
          filter: `farmer_id=eq.${farmerId}`,
        },
        async () => {
          await fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [farmerId]);

  // Product manipulation functions
  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
  try {
    // Wrap the Supabase query in a promise
    const promise = supabase
      .from("products")
      .delete()
      .in("id", selectedProducts);

    await toast.promise(Promise.resolve(promise), {
      loading: 'Deleting products...',
      success: (res) => {
      const result = res as { error?: Error };
      if (result.error) throw result.error;
      return 'Products deleted successfully!';
      },
      error: (err) => err.message || 'Failed to delete products'
    });

    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
  } catch (error) {
    console.error("Error deleting products:", error);
  }
};

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // CSV Export
  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Price', 'Quantity', 'Description'],
      ...products.map(product => [
        product.name,
        product.price,
        product.quantity,
        product.description || ''
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'products_export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Derived data
  const sortedProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a[sortBy] - b[sortBy];
    });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const paginatedProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        🚜 የእርስዎ ምርቶች
      </h1>

      {/* Quick Actions */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Link 
          to="/add-product"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Product
        </Link>
        
        <Link
          to="/orders"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <ClipboardListIcon className="w-5 h-5" />
          View Orders
        </Link>

        <button 
          onClick={exportToCSV}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <DocumentDownloadIcon className="w-5 h-5" />
          Export to CSV
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{totalProducts}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <ShoppingBagIcon className="w-8 h-8 text-green-600 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Total Value</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                {totalValue.toLocaleString()} ብር
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <CurrencyDollarIcon className="w-8 h-8 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "price" | "quantity")}
          className="px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 appearance-none"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="quantity">Sort by Quantity</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="mb-4">
          <button
            onClick={handleBulkDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Selected ({selectedProducts.length})
          </button>
        </div>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleProductSelection(product.id)}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="mt-4 space-y-2">
                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                      <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">{product.price} ብር</span>
                    </p>
                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                      <ArchiveBoxIcon className="w-5 h-5 mr-2 text-green-500" />
                      <span className={`font-medium ${
                        product.quantity === 0 ? 'text-red-500' :
                        product.quantity < 5 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        Quantity: {product.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="flex-1 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PencilIcon className="w-5 h-5" />
                  ማስተካከያ
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-300 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <TrashIcon className="w-5 h-5" />
                  ማጥፋት
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 space-y-4">
            <div className="mx-auto max-w-xs text-gray-500 dark:text-gray-400">
              <ArchiveBoxIcon className="w-24 h-24 mx-auto opacity-50" />
              <h3 className="mt-4 text-xl font-medium">No Products Found</h3>
              <p className="mt-2">Get started by adding your first product</p>
              <Link
                to="/add-product"
                className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
              >
                Add Product
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1 ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(sortedProducts.length / productsPerPage)))}
          disabled={currentPage === Math.ceil(sortedProducts.length / productsPerPage)}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Product Form */}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          setEditingProduct={setEditingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;