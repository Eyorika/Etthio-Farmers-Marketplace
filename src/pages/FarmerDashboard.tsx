import Navbar from '../components/Navbar/Navbar';
import ProductForm from '../features/farmer/components/ProductForm';
import ProductList from '../features/farmer/components/ProductList';
// Export as default
const FarmerDashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl my-6">Farmer Dashboard</h1>
        {/* Add farmer-specific content here */}
      </main>
      <div className="container mx-auto p-4">
      <div className="grid lg:grid-cols-2 gap-8">
        <ProductForm />
        <ProductList />
      </div>
    </div>
    </div>
  );
};

export default FarmerDashboard; // Proper default export