import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getPatients } from '../services/api';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        console.log('Patients response:', response);
        if (response.error) throw new Error(response.error);
        const patientsData = Array.isArray(response.data) ? response.data : [];
        setPatients(patientsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch patients');
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

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
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Patients</h2>
      <p className="text-gray-600 text-center mb-4">
        Path: <span className="font-mono">{import.meta.env.VITE_API_URL}/patients</span>
      </p>
      <p className="text-gray-700 text-center mb-6">View the list of patients</p>
      {patients.length === 0 ? (
        <p className="text-center text-gray-600">No patients available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <motion.div
              key={patient.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-blue-600">{patient.name || 'N/A'}</h3>
              <p className="text-gray-600">
                <strong>ID:</strong> {patient.id || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Age:</strong> {patient.age || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {patient.phone || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Health Status:</strong> {patient.health_status || 'N/A'}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default Patients;