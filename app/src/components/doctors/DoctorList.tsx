import React, { useEffect, useState } from "react";
import axios from "axios";
import doctorImage from "../../assets/doctor.jpg";
import { useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  contactNumber: string;
  firebaseUid: string;
  image?: string;
}

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    string[]
  >([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<Doctor[]>(
          `http://localhost:5000/api/doctors/all-doctors`
        );
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

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchInput.toLowerCase()) ||
      doctor.experience.toString().includes(searchInput);

    const matchesSpecialization = selectedSpecializations.length === 0 || selectedSpecializations.includes(doctor.specialization);
    const matchesExperience = selectedExperience.length === 0 || selectedExperience.some(exp => {
      const [min, max] = exp.split('-').map(Number);
      return doctor.experience >= min && (max ? doctor.experience <= max : true);
    });

    return matchesSearch && matchesSpecialization && matchesExperience;
  });

  const uniqueSpecializations = Array.from(new Set(doctors.map(doctor => doctor.specialization)));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching doctors: {error}</div>;

  const handleSpecializationChange = (specialization: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(specialization)
        ? prev.filter((s) => s !== specialization)
        : [...prev, specialization]
    );
  };

  const handleExperienceChange = (experience: string) => {
    setSelectedExperience((prev) =>
      prev.includes(experience)
        ? prev.filter((e) => e !== experience)
        : [...prev, experience]
    );
  };

  const pataientId = sessionStorage.getItem("uid");

  const handleBookAppointment = (doctorId: string) => {
    navigate("/book-appointment", {
      state: {
        doctorId: doctorId,
        patientId: pataientId,
      },
    });
  };

  return (
    <section id="doctors" className="py-16 bg-gray-50 mt-20 relative">
      <div className="container mx-auto px-6 flex">
        <div className="w-1/4 mr-4 mt-36 sticky top-36">
          <h3 className="font-semibold mb-2 bg-indigo-600 text-white width-20 p-2 rounded-lg text-xl">
            Filters
          </h3>
          <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2">Specialization</h4>
            <div className="flex flex-col mb-4">
              {uniqueSpecializations.map((specialization) => (
                <label key={specialization} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={selectedSpecializations.includes(specialization)}
                    onChange={() => handleSpecializationChange(specialization)}
                    className="mr-2"
                  />
                  {specialization}
                </label>
              ))}
            </div>

            <h4 className="font-semibold mb-2">Experience</h4>
            <div className="flex flex-col">
              {["0-5", "6-10", "11-15", "16+"].map((expRange) => (
                <label key={expRange} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    checked={selectedExperience.includes(expRange)}
                    onChange={() => handleExperienceChange(expRange)}
                    className="mr-2"
                  />
                  {expRange} years
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Doctors
          </h2>

          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search by name, specialization, or experience"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-1/2 mr-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="bg-gray-300 h-40 rounded-lg mb-4 flex justify-center items-center">
                    <img
                      src={doctor.image || doctorImage}
                      alt={doctor.name}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p className="text-gray-600">
                    Experience: {doctor.experience} years
                  </p>
                  <p className="text-gray-600">
                    Contact Number: {doctor.contactNumber}
                  </p>
                  <button
                    onClick={() => handleBookAppointment(doctor.firebaseUid)}
                    className="mt-4 bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-600">
                No doctors found.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorList;
