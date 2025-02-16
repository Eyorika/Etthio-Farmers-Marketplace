import { supabase } from "./supabase";

export const getFarmerId = async (userId: string) => {
    const { data, error } = await supabase
      .from('farmers')
      .select('id')
      .eq('user_id', userId)
      .single();
  
    if (error) {
      if (error.code === 'PGRST116') { // No rows found
        throw new Error('Farmer profile not found');
      }
      throw new Error('Database error');
    }
    
    return data.id;
  };