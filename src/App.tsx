import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import FarmerDashboard from './features/farmer/Dashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import ProfileWizard from './features/farmer/ProfileWizard';
import AuthGuard from './components/AuthGuard';
import EmailLoginForm from './features/auth/EmailLoginForm';
import EmailSignupForm from './features/auth/EmailSignupForm';
import AddProduct from './features/farmer/AddProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<EmailLoginForm />} />
        <Route path="/signup" element={<EmailSignupForm />} />

        {/* Protected Routes */}
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/complete-profile" element={<ProfileWizard />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;