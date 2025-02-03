"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (localStorage.getItem("username")) {
      router.push("/"); // Redirect to home if the user is already logged in
    }
  }, [router]);

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      setLoading(true); // Start loading

      // Simulate a login process (e.g., a delay or API call)
      setTimeout(() => {
        // Store username and authentication status
        localStorage.setItem("username", username);
        localStorage.setItem("isAuthenticated", "true");

        // Refresh the page after login
        window.location.reload(); // This forces the page to reload
      }, 1500); // Simulate a 1.5 second login delay
    } else {
      setError("Please enter a valid username and password.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 text-white">
      {/* Full-page overlay loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bouncing-loader flex space-x-2">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-600 bg-opacity-30 p-6 rounded-lg shadow-lg w-96 text-center backdrop-blur-sm m-4">
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          {error && <p className="text-red-400 mb-2">{error}</p>}

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-3 text-black rounded"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 text-black rounded"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            {loading ? (
              <div className="spinner-border animate-spin border-t-4 border-blue-500 w-6 h-6 mx-auto"></div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
