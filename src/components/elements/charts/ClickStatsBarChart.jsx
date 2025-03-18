import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend);

const ClickStatsBarChart = ({ chartData }) => {
  const labels = chartData?.map((item) => item.clickDate) || [];
  const clickCounts = chartData?.map((item) => item.clickCount) || [];

  const data = {
    labels: labels.length > 0 ? labels : Array(14).fill(""),
    datasets: [
      {
        label: "Total Clicks",
        data: clickCounts.length > 0 ? clickCounts : [],
        backgroundColor: "#3b82f6",
        borderColor: "#1D2327",
        borderWidth: 1,
        barThickness: 25,
        borderRadius: 5,
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
            size: 15,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 15,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
          <div className="h-96">
            <Bar data={data} options={options} />
          </div>
        </div>
  );
};

export default ClickStatsBarChart;
