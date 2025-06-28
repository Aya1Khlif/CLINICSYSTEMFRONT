import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer
      className="bg-blue-900 text-white py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Clinic System. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}

export default Footer;