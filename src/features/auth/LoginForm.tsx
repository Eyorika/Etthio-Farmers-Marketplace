// src/features/auth/LoginForm.tsx
import { supabase } from '../../lib/supabase';

const handleLogin = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('ስህተት ተከስቷል:', error.message);
  }
};