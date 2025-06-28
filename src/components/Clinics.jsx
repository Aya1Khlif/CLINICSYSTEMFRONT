import { motion } from 'framer-motion';

function Clinics({ data }) {
  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Our Clinics</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-600">No clinic data available at the moment</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((clinic) => (
            <motion.div
              key={clinic.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-blue-600">{clinic.branch_name}</h3>
              <p className="text-gray-600">Location: {clinic.location}</p>
              <p className="text-gray-600">Working Hours: {clinic.working_hours}</p>
              <p className="text-gray-600">Services: {clinic.services_offered}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default Clinics;