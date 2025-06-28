import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getDoctors } from '../services/api';

function Doctors({ ratings = {} }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        // التأكد من إن البيانات مصفوفة
        const doctorsData = Array.isArray(response.data.data) 
          ? response.data.data 
          : Array.isArray(response.data) 
            ? response.data 
            : [];
        setDoctors(doctorsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch doctors');
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg text-blue-600 py-12">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg my-12">
        {error}
      </div>
    );
  }

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Our Doctors</h2>
      {doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-blue-800">{doctor.name || 'N/A'}</h3>
              <p className="text-gray-600">
                <strong>Specialization:</strong> {doctor.specialization || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Experience:</strong> {doctor.experience_years || 'N/A'} years
              </p>
              <p className="text-gray-600">
                <strong>Qualifications:</strong> {doctor.qualifications || 'N/A'}
              </p>
              {ratings[doctor.id] && ratings[doctor.id].length > 0 ? (
                <div className="mt-4">
                  <p className="text-gray-600">
                    <strong>Ratings:</strong>
                  </p>
                  <ul className="list-disc pl-5">
                    {ratings[doctor.id].map((rating) => (
                      <li key={rating.id} className="text-yellow-500">
                        {rating.score || rating.rating || 'N/A'} stars - {rating.comment || 'No comment'}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 mt-4">No ratings available</p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Doctors;