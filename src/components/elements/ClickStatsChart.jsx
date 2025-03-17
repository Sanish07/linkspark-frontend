import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

// Registering components
ChartJS.register(LineElement, PointElement, Tooltip, CategoryScale, LinearScale, Legend, Filler);

const ClickStatsChart = ({ chartData }) => {

  const labels = chartData?.map((item) => item.clickDate) || [];
  const clickCounts = chartData?.map((item) => item.clickCount) || [];

  const data = {
    labels: labels.length > 0 ? labels : Array(14).fill(""), //Shows data of latest 2 weeks
    datasets: [
      {
        label: "Total Clicks",
        data: clickCounts.length > 0 ? clickCounts : [2,4,7,1,5,1,3,6,11,4,6,6,8,9], // Sample data
        backgroundColor: "rgba(183, 153, 255, 0.4)", // Soft blue background fill
        borderColor: "#7f22fe",
        pointBorderColor: "#1D2327",
        pointBackgroundColor: "#ffffff",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return Number.isInteger(value) ? value.toString() : "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Click Statistics</h2>
      <div className="h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ClickStatsChart;
