import { motion } from 'framer-motion';

function AboutUs() {
  return (
    <div className="py-12 bg-blue-100 rounded-lg">
      <motion.h2
        className="text-3xl font-bold text-center text-blue-900 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        About Clinic System
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Clinic System is a comprehensive medical management platform designed to streamline clinic operations. It provides an intuitive interface for administrators to manage doctors, patients, and appointments, and a user-friendly interface for patients to view medical information and rate doctors. We are committed to delivering a seamless and secure user experience.
      </motion.p>
    </div>
  );
}

export default AboutUs;