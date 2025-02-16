import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import FarmerDashboard from './pages/FarmerDashboard';
import App from './App';
import React from 'react';
import './styles/globals.css';
import './styles/fonts.css';

import { supabase } from './lib/supabase';
import { useAuthStore } from './stores/authStore';

supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setUser(session?.user || null);
});

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);