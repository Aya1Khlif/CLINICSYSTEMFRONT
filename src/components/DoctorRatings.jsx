import { useState } from 'react';
import { getDoctorRatings } from '../services/api';
import { motion } from 'framer-motion';

export default function DoctorRatings() {
  const [doctorId, setDoctorId] = useState('');
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchRatings = async () => {
    if (!doctorId || isNaN(doctorId)) {
      setError('Please enter a valid Doctor ID (numeric).');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await getDoctorRatings(doctorId);
      console.log('DoctorRatings response:', response);
      if (response.error) throw new Error(response.error);
      const ratingsData = Array.isArray(response.data) ? response.data : [];
      setRatings(ratingsData);
    } catch (err) {
      setError('Failed to fetch ratings. Please check the Doctor ID or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Doctor Ratings</h2>
      <p className="text-gray-600 text-center mb-4">
        Path: <span className="font-mono">{`${import.meta.env.VITE_API_URL}/doctors/${doctorId || '{doctorId}'}/ratings`}</span>
      </p>
      <p className="text-gray-700 text-center mb-6">View ratings for a specific doctor</p>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          placeholder="Enter Doctor ID"
          className="border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetchRatings}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Ratings'}
        </button>
      </div>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      {ratings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ratings.map((rating) => (
            <motion.div
              key={rating.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600">
                <strong>Rating:</strong> {rating.score || 'N/A'} stars
              </p>
              <p className="text-gray-600">
                <strong>Comment:</strong> {rating.comment || 'N/A'}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-600">No ratings available.</p>
      )}
    </motion.section>
  );
}