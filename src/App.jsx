import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import AboutUs from './components/AboutUs';
import Doctors from './components/Doctors';
import Clinics from './components/Clinics';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { getDoctors, getClinics, getDoctorRatings } from './services/api';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [doctorsResponse, clinicsResponse] = await Promise.all([
          getDoctors(),
          getClinics(),
        ]);

        if (doctorsResponse.error) throw new Error('Failed to fetch doctors');
        if (clinicsResponse.error) throw new Error('Failed to fetch clinics');

        setDoctors(doctorsResponse.data.data || []);
        setClinics(clinicsResponse.data.data || []);

        // Fetch ratings for each doctor
        const ratingsPromises = doctorsResponse.data.data.map(doctor =>
          getDoctorRatings(doctor.id).then(response => ({
            doctorId: doctor.id,
            ratings: response.error ? [] : response.data.data,
          }))
        );
        const ratingsData = await Promise.all(ratingsPromises);
        const ratingsMap = ratingsData.reduce((acc, { doctorId, ratings }) => ({
          ...acc,
          [doctorId]: ratings,
        }), {});
        setRatings(ratingsMap);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      <Navbar />
      <Banner />
      <main className="container mx-auto py-16 px-6">
        {loading && (
          <motion.div
            className="text-center text-lg text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
        )}
        {error && (
          <motion.div
            className="text-center text-red-500 bg-red-100 p-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        )}
        <motion.section
          id="doctors"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Doctors data={doctors} ratings={ratings} />
        </motion.section>
        <motion.section
          id="clinics"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Clinics data={clinics} />
        </motion.section>
        <motion.section
          id="about"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <AboutUs />
        </motion.section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;