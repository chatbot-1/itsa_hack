import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  contactNumber: string;
}

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<Doctor[]>(`http://localhost:5000/api/doctors/all-doctors`);
        setDoctors(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchInput.toLowerCase()) ||
      doctor.experience.toString().includes(searchInput)
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching doctors: {error}</div>;

  return (
    <section id="doctors" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Doctors</h2>
        
        {/* Search Input */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Search by name, specialization, or experience"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-1/2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-gray-300 h-40 rounded-lg mb-4">
                  {/* Placeholder for doctor image */}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-gray-600">Experience: {doctor.experience} years</p>
                <p className="text-gray-600">Contact Number: {doctor.contactNumber}</p>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-600">No doctors found.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorList;
