import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { supabase } from '../../lib/supabase';

const SalesChart = ({ farmerId }: { farmerId: string }) => {
  const [salesData, setSalesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('created_at, quantity')
        .eq('farmer_id', farmerId)
        .order('created_at', { ascending: true });

      if (error) console.error('Error fetching sales data:', error);
      else setSalesData(data || []);
    };

    fetchSalesData();
  }, [farmerId]);

  const chartData = {
    labels: salesData.map((sale) => new Date(sale.created_at).toLocaleDateString()),
    datasets: [
      {
        label: 'Sales',
        data: salesData.map((sale) => sale.quantity),
        borderColor: '#2E7D32',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default SalesChart; // Add this line