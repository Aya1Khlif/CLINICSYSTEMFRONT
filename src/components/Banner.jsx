import { motion } from 'framer-motion';

function Banner() {
  return (
    <motion.div
      className="bg-blue-800 text-white py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Clinic System</h1>
      <p className="text-lg max-w-2xl mx-auto">
        Book your appointments and track your health with ease.
      </p>
      <motion.a
        href="#doctors"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Discover Our Doctors
      </motion.a>
    </motion.div>
  );
}

export default Banner;