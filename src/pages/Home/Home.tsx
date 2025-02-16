// src/pages/Home/Home.tsx
import Navbar from '../../components/Navbar/Navbar';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      {/* Hero Section */}
      <section className="hero-section relative text-text h-[70vh] flex items-center">
        <div className="hero-content container mx-auto px-4 z-10 fade-in">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block mb-4">እርሻ ገበያ</span>
                <span className="text-2xl md:text-3xl font-normal">
                  Connecting Farmers Directly to Markets
                </span>
              </h1>
              
              {/* Search Bar */}
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="ethio-input"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-cta-btn text-header px-6 py-2 rounded-xl font-semibold hover:bg-opacity-90 transition">
                  Search
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:block">
              <div className="bg-gradient-to-r from-primary to-accent h-96 rounded-3xl shadow-2xl flex items-center justify-center">
                <span className="text-text text-2xl">Farmers Market Illustration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-header mb-12 text-center">
            Popular Agricultural Products
          </h2>
          <CategoryGrid />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-accent text-text">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'For Farmers',
                desc: 'List your harvests easily and manage sales',
                icon: '🌱'
              },
              {
                title: 'For Buyers',
                desc: 'Discover fresh, local produce directly',
                icon: '🛒'
              },
              {
                title: 'Secure Payments',
                desc: 'Safe transactions with mobile money',
                icon: '💳'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-background text-gray-800 transition-transform hover:scale-105"
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-header mb-12 text-center">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                text: "This platform helped me double my income by connecting directly with restaurants in Addis!",
                name: "Alemayehu Bekele",
                role: "Coffee Farmer, Sidama"
              },
              {
                text: "Fresh teff flour delivered straight to our bakery. Quality is consistently excellent!",
                name: "Selamawit Girma",
                role: "Bakery Owner, Addis Ababa"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl border border-header/20 hover:shadow-lg transition-all"
              >
                <p className="text-lg text-gray-600 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-header/10 flex items-center justify-center mr-4">
                    <span className="text-2xl">👩🌾</span>
                  </div>
                  <div>
                    <p className="font-semibold text-header">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-header text-text py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EthioFarmers</h3>
              <p className="text-sm opacity-80">Connecting Agriculture to Markets</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Farmers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:opacity-80">How to Sell</a></li>
                <li><a href="#" className="hover:opacity-80">Pricing</a></li>
                <li><a href="#" className="hover:opacity-80">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Buyers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:opacity-80">Find Products</a></li>
                <li><a href="#" className="hover:opacity-80">Delivery Info</a></li>
                <li><a href="#" className="hover:opacity-80">Quality Standards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm mb-2">+251 912 345 678</p>
              <p className="text-sm">contact@ethiofarmers.com</p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm">
            <p>© 2025 EthioFarmers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
