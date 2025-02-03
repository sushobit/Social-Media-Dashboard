"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import { Line, Pie, Radar, Doughnut } from "react-chartjs-2";
import { dummyData } from "./data/dummyData";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "chart.js/auto";

export default function Dashboard() {
  const [data] = useState(dummyData);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const router = useRouter();
  const [, setUsername] = useState("");

  const handleViewDetails = (account) => {
    setSelectedAccount(account);
  };

  const isAccountSelected = selectedAccount !== null;

  // Calculate Total Followers from all platforms
  const totalFollowers = data.reduce((sum, account) => sum + account.followers, 0);

  // Gauge Chart Data (Doughnut chart displaying total followers of each platform)
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

  // Pie Chart Data (Selected Account details)
  const pieChartData = isAccountSelected
    ? {
        labels: ["Followers", "Engagement Rate", "Posts"],
        datasets: [
          {
            data: [
              selectedAccount.followers,
              selectedAccount.details.engagementRate,
              selectedAccount.posts,
            ],
            backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
          },
        ],
      }
    : null;

  // Radar Chart Data (Selected Account details)
  const radarChartData = isAccountSelected
    ? {
        labels: ["Followers", "Engagement Rate", "Posts", "Impressions", "Interactions"],
        datasets: [
          {
            label: "Engagement Metrics",
            data: [
              selectedAccount.followers,
              selectedAccount.details.engagementRate,
              selectedAccount.posts,
              selectedAccount.pageImpressions,
              selectedAccount.socialInteractions,
            ],
            backgroundColor: "rgba(179, 181, 198, 0.2)",
            borderColor: "rgba(179, 181, 198, 1)",
            borderWidth: 1,
          },
        ],
      }
    : null;

  // Merged Line Chart Data (Page Impressions and Social Interactions)
  const mergedLineChartData = isAccountSelected
    ? {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Page Impressions",
            data: [
              selectedAccount.pageImpressionsJan,
              selectedAccount.pageImpressionsFeb,
              selectedAccount.pageImpressionsMar,
              selectedAccount.pageImpressionsApr,
              selectedAccount.pageImpressionsMay,
              selectedAccount.pageImpressionsJun,
            ],
            fill: false,
            borderColor: "#36A2EB",
            tension: 0.1,
          },
          {
            label: "Social Interactions",
            data: [
              selectedAccount.socialInteractionsJan,
              selectedAccount.socialInteractionsFeb,
              selectedAccount.socialInteractionsMar,
              selectedAccount.socialInteractionsApr,
              selectedAccount.socialInteractionsMay,
              selectedAccount.socialInteractionsJun,
            ],
            fill: false,
            borderColor: "#FF6384",
            tension: 0.1,
          },
        ],
      }
    : null;

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const storedUsername = localStorage.getItem("username");
  
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setUsername(storedUsername || "User"); // Set username if available
      }
    }, [router]);

    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
        <Sidebar />
        <div className="flex-1 p-6 space-y-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Social Media Dashboard</h1>
          
          {/* Cards Section */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-center">
            {/* Followers by Platform Card */}
            <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-3xl shadow-lg w-72 overflow-hidden">
              <h3 className="text-xl font-semibold text-center text-gray-700">Followers by Platform</h3>
              <Doughnut data={gaugeChartData} />
              <p className="text-center text-lg font-bold mt-4 text-gray-700">{totalFollowers} Total Followers</p>
             </div>
  
            {/* Account Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
              {data.map((account) => (
                <motion.div
                  key={account.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white bg-opacity-70 backdrop-blur-sm shadow-xl rounded-xl p-6 flex flex-col items-center transition-shadow duration-300 w-full"
                >
                  <div className="mb-4 text-4xl">{account.icon}</div>
                  <h2 className="text-xl font-semibold mt-2 text-gray-800">{account.platform}</h2>
                  <p className="text-gray-500">Followers: {account.followers}</p>
                  <p className={account.growth.startsWith("-") ? "text-red-500 font-bold" : "text-green-500 font-bold"}>{account.growth}</p>

                  <button
                    onClick={() => handleViewDetails(account)}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                  >
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
  
          {/* Expanded Details Section */}
          {isAccountSelected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white bg-opacity-70 backdrop-blur-sm  p-6 rounded-3xl shadow-2xl rounded-2xl"
            >
              <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-6">
                Social Media Insights - {selectedAccount.platform}
              </h2>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl shadow-inner">
                  <p className="text-lg font-semibold text-gray-700">
                    <span className="text-blue-600">Last Post:</span> {selectedAccount.details.lastPost}
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    <span className="text-green-600">Average Post Reach:</span> {selectedAccount.details.avgPostReach}
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    <span className="text-yellow-600">Engagement Rate:</span> {selectedAccount.details.engagementRate}%
                  </p>
                </div>
  
                <div className="space-y-3 p-4 bg-gray-50 rounded-xl shadow-inner">
                  <p className="text-lg font-semibold text-gray-700">
                    <span className="text-purple-600">Engagement Users:</span> {selectedAccount.engagementUsers}
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    <span className="text-red-600">Page Impressions:</span> {selectedAccount.pageImpressions}
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    <span className="text-indigo-600">Social Interactions:</span> {selectedAccount.socialInteractions}
                  </p>
                </div>
              </div>
  
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
          {/* Engagement Statistics */}
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Engagement Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pieChartData && (
              <div className="bg-white bg-opacity-70 backdrop-blur-sm  p-6 rounded-3xl shadow-xl">
                <h3 className="text-xl font-semibold text-center text-gray-700">Platform Data (Pie Chart)</h3>
                <Pie data={pieChartData} />
              </div>
            )}

            {radarChartData && (
              <div className="bg-white bg-opacity-70 backdrop-blur-sm  p-6 rounded-3xl shadow-xl">
                <h3 className="text-xl font-semibold text-center text-gray-700">Platform Data (Radar Chart)</h3>
                <Radar data={radarChartData} />
              </div>
            )}

            {mergedLineChartData && (
              <div className="bg-white bg-opacity-70 backdrop-blur-sm  p-6 rounded-3xl shadow-xl">
                <h3 className="text-xl font-semibold text-center text-gray-700">Page Impressions & Social Interactions</h3>
                <Line data={mergedLineChartData} />
              </div>
            )}
          </div>
        </div>
      </div>
        </div>
        
      
    );
  }
  
