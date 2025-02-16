import Navbar from '../components/Navbar/Navbar';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto p-4  ">
        <h1 className="text-3xl my-6">Find Fresh Produce Direct from Farmers</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <input 
            type="text" 
            placeholder="Search products..."
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Product Categories */}
        <CategoryGrid />
      </main>
    </div>
  );
};