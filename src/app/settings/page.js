'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const SettingsPage = () => {
  const [profileVisibility, setProfileVisibility] = useState('Public');
  const [linkedAccounts, setLinkedAccounts] = useState({
    facebook: true,
    twitter: false,
    instagram: true,
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [dataUsage, setDataUsage] = useState('Standard');

  const handleSave = () => {
    alert('Settings Updated Successfully!');
  };

  useEffect(() => {
    // Only run the effect on the client
    setProfileVisibility('Public'); // Ensure default values are set on the client
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Settings</h1>
      <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-3xl p-6 shadow-md max-w-2xl mx-auto text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Privacy</h2>
        <label className="block mb-2">Profile Visibility</label>
        <select
          value={profileVisibility}
          onChange={(e) => setProfileVisibility(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option>Public</option>
          <option>Friends Only</option>
          <option>Private</option>
        </select>

        <h2 className="text-xl font-semibold mt-6 mb-4">Linked Accounts</h2>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={linkedAccounts.facebook}
            onChange={() =>
              setLinkedAccounts({ ...linkedAccounts, facebook: !linkedAccounts.facebook })
            }
          />
          Link Facebook
        </label>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={linkedAccounts.twitter}
            onChange={() =>
              setLinkedAccounts({ ...linkedAccounts, twitter: !linkedAccounts.twitter })
            }
          />
          Link Twitter
        </label>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={linkedAccounts.instagram}
            onChange={() =>
              setLinkedAccounts({ ...linkedAccounts, instagram: !linkedAccounts.instagram })
            }
          />
          Link Instagram
        </label>

        <h2 className="text-xl font-semibold mt-6 mb-4">Security</h2>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
          />
          Enable Two-Factor Authentication
        </label>

        <h2 className="text-xl font-semibold mt-6 mb-4">Data Usage</h2>
        <select
          value={dataUsage}
          onChange={(e) => setDataUsage(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option>Standard</option>
          <option>Low Data Mode</option>
          <option>High Performance</option>
        </select>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
      </div>
    </div>
  );
};

export default SettingsPage;
