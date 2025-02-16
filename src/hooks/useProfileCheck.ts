// src/hooks/useProfileCheck.ts
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export const useProfileCheck = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return;

      // Fetch profile from Supabase
      const { data, error } = await supabase
        .from('farmers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        navigate('/complete-profile');
      }
    };

    checkProfile();
  }, [user, navigate]);
};