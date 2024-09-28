const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    experience: "10 years",
    image: "", // Placeholder for an image URL
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Dermatologist",
    experience: "8 years",
    image: "", // Placeholder for an image URL
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    specialty: "Pediatrician",
    experience: "12 years",
    image: "", // Placeholder for an image URL
  },
];

const DoctorList = () => {
  return (
    <section id="doctors" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-gray-300 h-40 rounded-lg mb-4">
                {/* Replace with image later */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-600">Experience: {doctor.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorList;
