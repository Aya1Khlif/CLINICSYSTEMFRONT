import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getUserInfo } from '../services/api';

function UserInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth_token'));

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!isLoggedIn) {
        setError('Please login to view user information.');
        setLoading(false);
        return;
      }
      try {
        const response = await getUserInfo();
        console.log('UserInfo response:', response);
        if (response.error) throw new Error(response.error);
        setUserInfo(response.data || {});
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user info. Please ensure you are logged in.');
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [isLoggedIn]);

  if (loading) {
    return <div className="text-center text-lg text-blue-600 py-12">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg my-12">
        {error}
      </div>
    );
  }

  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">User Info</h2>
      <p className="text-gray-600 text-center mb-4">
        Path: <span className="font-mono">{import.meta.env.VITE_API_URL}/user</span>
      </p>
      <p className="text-gray-700 text-center mb-6">View registered user information</p>
      {Object.keys(userInfo).length > 0 ? (
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-md mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-blue-600">{userInfo.name || 'N/A'}</h3>
          <p className="text-gray-600">
            <strong>Email:</strong> {userInfo.email || 'N/A'}
          </p>
          <p className="text-gray-600">
            <strong>Role:</strong> {userInfo.role || 'N/A'}
          </p>
        </motion.div>
      ) : (
        <p className="text-center text-gray-600">No user information available.</p>
      )}
    </motion.section>
  );
}

export default UserInfo;