"use client";

import { useState, useEffect } from "react";
import { FiHome, FiBarChart2, FiSettings, FiMenu } from "react-icons/fi";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resizing to detect mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setIsSidebarOpen(false); // Close the sidebar on mobile by default
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true); // Keep sidebar open on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run it once to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* Hamburger button for mobile */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 md:hidden text-black focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar content */}
      <div
        className={`fixed top-0 left-0 h-full bg-white bg-opacity-70 backdrop-blur-sm text-black  p-6 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:block md:relative md:translate-x-0`}
        style={{ zIndex: 100 }}
      >
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
            <FiHome />{" "}
            <a href="/" className="text-black">Home</a>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
            <FiBarChart2 />{" "}
            <a href="/analytics" className="text-black">Analytics</a>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
            <FiSettings />{" "}
            <a href="/settings" className="text-black">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
