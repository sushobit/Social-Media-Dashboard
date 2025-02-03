"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa"; 
import Link from 'next/link';

const Header = () => {
  const [userName, setUserName] = useState(""); // State to hold the username
  const router = useRouter();

  useEffect(() => {
    // On every render, check if the user is logged in
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUserName(storedUser); // Set username from localStorage if available
    }
  }, []); // Empty dependency array to run only once after mount

  const handleLogout = () => {
    // Clear the username and authentication status on logout
    localStorage.removeItem("username");
    localStorage.removeItem("isAuthenticated");
    setUserName(""); // Clear the username from state
    router.push("/login"); // Redirect to login page
  };

  return (
    <header className="flex justify-between items-center bg-gray-200 text-black py-4 px-6 shadow-lg">
        <Link href="/">
        <h1 className="text-xl font-bold">Social Media Dashboard</h1>
      </Link>
      {/* Display the username if available */}
      <span className="text-lg font-medium">
        {userName ? `Hello, ${userName}` : "Welcome!"}
      </span>
      <div className="flex gap-4">

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-red-600 rounded-full hover:bg-red-500"
        >
          <FaSignOutAlt className="text-white" size={20} />
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
