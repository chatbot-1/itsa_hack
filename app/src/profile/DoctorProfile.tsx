import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<any>(null);
  const firebaseUid = sessionStorage.getItem("uid");

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctors/doctor-profile/${firebaseUid}`
        );
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    fetchDoctorProfile();
  }, [firebaseUid]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Doctor Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Full Name</label>
          <p className="text-gray-600">{doctor.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email Address</label>
          <p className="text-gray-600">{doctor.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Specialization</label>
          <p className="text-gray-600">{doctor.specialization}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Experience</label>
          <p className="text-gray-600">{doctor.experience} years</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">License Number</label>
          <p className="text-gray-600">{doctor.licenceNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Contact Number</label>
          <p className="text-gray-600">{doctor.contactNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Availability</label>
          <p className="text-gray-600">{doctor.availability.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
