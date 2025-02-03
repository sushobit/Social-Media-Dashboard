"use client";

import { useState } from "react";
import React from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { dummyData, chartData, lineChartData, lineChartInteractions } from "../data/dummyData";
import Sidebar from '../components/Sidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement for Doughnut charts
);

const AnalyticsPage = () => {
  const [data] = useState(dummyData);

  const totalFollowers = data.reduce((sum, account) => sum + account.followers, 0);

  const gaugeChartData = {
    labels: ["Facebook Followers", "Instagram Followers", "Twitter Followers", "Remaining"],
    datasets: [
      {
        data: [
          data.find(account => account.platform === "Facebook")?.followers || 0,
          data.find(account => account.platform === "Instagram")?.followers || 0,
          data.find(account => account.platform === "Twitter")?.followers || 0,
          10000 - totalFollowers, // Assuming max followers as 1M for the remaining space
        ],
        backgroundColor: ["#3b5998", "#C13584", "#1DA1F2", "#E0E0E0"], // Colors for Facebook, Instagram, Twitter, and Remaining
        borderWidth: 0,
        cutout: "80%", // Creates a gauge effect
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 p-4 lg:p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Social Media Analytics</h1>
        <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-3xl shadow-lg w-72 overflow-hidden mb-4">
          <h3 className="text-xl font-semibold text-center text-gray-700">Followers by Platform</h3>
          <Doughnut data={gaugeChartData} />
          <p className="text-center text-lg font-bold mt-4 text-gray-700">{totalFollowers} Total Followers</p>
        </div>

        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 mb-6">
          {dummyData.map((platform) => (
            <div key={platform.id} className="bg-white bg-opacity-70 backdrop-blur-sm  p-6 rounded-3xl shadow-md">
              <div className="flex items-center gap-2 mb-4">
                {platform.icon}
                <h3 className="text-gray-700 font-bold text-2xl">{platform.platform}</h3>
              </div>
              <p><strong>Followers:</strong> {platform.followers}</p>
              <p><strong>Growth:</strong> {platform.growth}</p>
              <p><strong>Posts:</strong> {platform.posts}</p>
              <p><strong>Engagement Users:</strong> {platform.engagementUsers}</p>
              <p><strong>Page Impressions:</strong> {platform.pageImpressions}</p>
              <p><strong>Social Interactions:</strong> {platform.socialInteractions}</p>
              <p><strong>Last Post:</strong> {platform.details.lastPost}</p>
              <p><strong>Avg Post Reach:</strong> {platform.details.avgPostReach}</p>
              <p><strong>Engagement Rate:</strong> {platform.details.engagementRate}</p>

              <div className="mt-4">
                <h4 className="text-lg font-semibold">Page Impressions Trend</h4>
                <Line data={lineChartData(platform)} />
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Social Interactions Trend</h4>
                <Line data={lineChartInteractions(platform)} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white bg-opacity-70 backdrop-blur-sm  p-6 rounded-3xl p-6 shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Overall Performance</h2>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
