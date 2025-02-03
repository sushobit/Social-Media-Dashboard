"use client";

import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Importing the icons from react-icons

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(null); // Start with null to avoid SSR mismatch

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    // Initial time set after component mounts
    setCurrentTime(new Date());

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []); // Empty dependency array means it only runs once after mount

  if (!currentTime) {
    return null; // Return null to prevent rendering on server-side
  }

  // Get time-related greeting
  const hours = currentTime.getHours();
  const greeting =
    hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";

  // Set class to highlight the time
  const timeHighlightClass =
    hours < 12
      ? "highlight-morning"
      : hours < 18
      ? "highlight-afternoon"
      : "highlight-evening";

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="socials">
          {/* Replacing SVGs with react-icons */}
          <a href="https://www.facebook.com/" target='_blank'  className="social-icon" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="https://x.com/?lang=en" target='_blank'  className="social-icon" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.linkedin.com/" target='_blank'  className="social-icon" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.instagram.com/" target='_blank' className="social-icon" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
        </div>
        <div className="copyright">
          <p>&copy; 2025 Social Media Dashboard. All rights reserved.</p>
        </div>
      </div>

      {/* Displaying current time with greeting */}
      <div className={`clock-container ${timeHighlightClass}`}>
        <p>{greeting}, it is {currentTime.toLocaleTimeString()}</p>
      </div>

      {/* Back to top button */}
      <div className="back-to-top">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
