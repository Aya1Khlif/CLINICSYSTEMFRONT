import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAppointments } from '../services/api';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointments();
        console.log('Appointments response:', response);
        if (response.error) throw new Error(response.error);
        const appointmentsData = Array.isArray(response.data.data) ? response.data.data : [];
        setAppointments(appointmentsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };
    fetchAppointments();
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
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Appointments</h2>
      <p className="text-gray-600 text-center mb-4">
        Path: <span className="font-mono">{import.meta.env.VITE_API_URL}/appointments</span>
      </p>
      <p className="text-gray-700 text-center mb-6">View available appointments</p>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-blue-600">
                Appointment #{appointment.id}
              </h3>
              <p className="text-gray-600">
                <strong>Date:</strong> {appointment.appointment_date || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Time:</strong> {appointment.appointment_time || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Doctor:</strong> {appointment.doctor?.name || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Patient:</strong> {appointment.patient?.name || 'N/A'}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {appointment.status || 'N/A'}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default Appointments;