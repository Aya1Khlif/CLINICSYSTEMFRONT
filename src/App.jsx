import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import AboutUs from './components/AboutUs';
import Doctors from './components/Doctors';
import Clinics from './components/Clinics';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import UserInfo from './components/UserInfo';
import Footer from './components/Footer';
import { getDoctors, getClinics, getDoctorRatings, getAppointments, getPatients, getUserInfo } from './services/api';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [doctorsResponse, clinicsResponse, appointmentsResponse, patientsResponse, userInfoResponse] =
          await Promise.all([
            getDoctors(),
            getClinics(),
            getAppointments(),
            getPatients(),
            getUserInfo(),
          ]);

        if (doctorsResponse.error) throw new Error('Failed to fetch doctors');
        if (clinicsResponse.error) throw new Error('Failed to fetch clinics');
        if (appointmentsResponse.error) throw new Error('Failed to fetch appointments');
        if (patientsResponse.error) throw new Error('Failed to fetch patients');
        if (userInfoResponse.error) throw new Error('Failed to fetch user info');

        setDoctors(Array.isArray(doctorsResponse.data.data) ? doctorsResponse.data.data : doctorsResponse.data || []);
        setClinics(Array.isArray(clinicsResponse.data.data) ? clinicsResponse.data.data : clinicsResponse.data || []);
        setAppointments(Array.isArray(appointmentsResponse.data.data) ? appointmentsResponse.data.data : appointmentsResponse.data || []);
        setPatients(Array.isArray(patientsResponse.data) ? patientsResponse.data : []);
        setUserInfo(userInfoResponse.data || {});

        // Fetch ratings for each doctor
        const ratingsPromises = (doctorsResponse.data.data || doctorsResponse.data || []).map(doctor =>
          getDoctorRatings(doctor.id).then(response => ({
            doctorId: doctor.id,
            ratings: response.error ? [] : (Array.isArray(response.data.data) ? response.data.data : response.data || []),
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
          id="appointments"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <Appointments data={appointments} />
        </motion.section>
        <motion.section
          id="patients"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <Patients data={patients} />
        </motion.section>
        <motion.section
          id="user-info"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <UserInfo data={userInfo} />
        </motion.section>
        <motion.section
          id="about"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <AboutUs />
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}

export default App;