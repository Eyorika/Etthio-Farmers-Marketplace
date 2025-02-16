import Navbar from '../components/Navbar/Navbar';

// Export as default
const BuyerDashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl my-6">Buyer Dashboard</h1>
        {/* Add buyer-specific content here */}
      </main>
    </div>
  );
};

export default BuyerDashboard; // Proper default export