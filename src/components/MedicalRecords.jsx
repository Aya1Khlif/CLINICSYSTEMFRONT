import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getMedicalRecords } from '../services/api';

function MedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await getMedicalRecords();
        console.log('MedicalRecords response:', response);
        if (response.error) throw new Error(response.error);
        const recordsData = Array.isArray(response.data.data) ? response.data.data : Array.isArray(response.data) ? response.data : [];
        setMedicalRecords(recordsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch medical records');
        setLoading(false);
      }
    };
    fetchMedicalRecords();
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
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Medical Records</h2>
      <p className="text-gray-600 text-center mb-4">
        Path: <span className="font-mono">{import.meta.env.VITE_API_URL}/medical-records</span>
      </p>
      <p className="text-gray-700 text-center mb-6">View patient medical records</p>
      {medicalRecords.length === 0 ? (
        <p className="text-center text-gray-600">No medical records available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicalRecords.map((record) => (
            <motion.div
              key={record.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-blue-600">Record #{record.id}</h3>
              <p className="text-gray-600">
                <strong>Patient:</strong> {record.patient_name || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Diagnosis:</strong> {record.diagnosis || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {record.date || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Notes:</strong> {record.notes || 'N/A'}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default MedicalRecords;