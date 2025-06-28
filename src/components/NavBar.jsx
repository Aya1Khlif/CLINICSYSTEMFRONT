import { motion } from 'framer-motion';

function Navbar() {
  return (
    <motion.nav
      className="bg-blue-900 text-white py-4 shadow-md"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clinic System</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="hover:text-blue-300 transition-colors duration-300">Home</a>
          </li>
          <li>
            <a href="#doctors" className="hover:text-blue-300 transition-colors duration-300">Doctors</a>
          </li>
          <li>
            <a href="#clinics" className="hover:text-blue-300 transition-colors duration-300">Clinics</a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-300 transition-colors duration-300">About</a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}

export default Navbar;