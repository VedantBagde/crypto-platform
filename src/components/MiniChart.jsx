import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';

// ... existing imports ...

// Register Chart.js components once globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const MiniChart = React.memo(({ data, isPositive }) => {
  // Memoize chart data to prevent unnecessary re-renders
  const chartData = React.useMemo(() => {
    const labels = Array.from({ length: data.length }, (_, i) => i.toString());
    
    return {
      labels,
      datasets: [
        {
          data,
          borderColor: isPositive ? '#00ff9d' : '#ff4d4d',
          backgroundColor: isPositive 
            ? 'rgba(0, 255, 157, 0.1)' 
            : 'rgba(255, 77, 77, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
          fill: true
        }
      ]
    };
  }, [data, isPositive]);

  const options = React.useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false } }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }), []);

  return (
    <div className="h-20 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
});

export default MiniChart;