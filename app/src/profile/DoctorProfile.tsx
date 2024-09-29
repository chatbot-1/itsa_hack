import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]); 
  const firebaseUid = sessionStorage.getItem("uid");

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctors/doctor-profile/${firebaseUid}`
        );
        setDoctor(response.data);
        const appointmentResponse = await axios.get(
          `http://localhost:5000/api/doctors/appointment-details/${firebaseUid}` 
        );
        
        if (Array.isArray(appointmentResponse.data)) {
          setAppointments(appointmentResponse.data);
        } else {
          setAppointments([]); 
          console.error('Unexpected response format for appointments:', appointmentResponse.data);
        }
      } catch (error) {
        console.error('Error fetching doctor profile or appointments:', error);
      }
    };

    fetchDoctorProfile();
  }, [firebaseUid]);

  if (!doctor) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gray-50 p-8">
      <h2 className="text-4xl font-bold text-indigo-600 mb-8 text-center">Doctor Profile</h2>
      
      <div className="flex w-full max-w-6xl">
        <div className="flex-1 mr-4">
          <div className="flex flex-col space-y-6">
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800">Full Name</h3>
              <p className="text-lg text-gray-700">{doctor.name}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800">Email Address</h3>
              <p className="text-lg text-gray-700">{doctor.email}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800">Specialization</h3>
              <p className="text-lg text-gray-700">{doctor.specialization}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
              <p className="text-lg text-gray-700">{doctor.experience} years</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800">License Number</h3>
              <p className="text-lg text-gray-700">{doctor.licenceNumber}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800">Contact Number</h3>
              <p className="text-lg text-gray-700">{doctor.contactNumber}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold text-gray-800">Availability</h3>
              <p className="text-lg text-gray-700">{doctor.availability.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Appointment Details</h3>
          {appointments.length === 0 ? (
            <p className="text-lg text-gray-600 text-center">No appointments found.</p>
          ) : (
            <div className="flex flex-col space-y-6">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="p-6 bg-gray-200 rounded-md">
                  <p className="text-gray-700 text-lg"><strong>Patient:</strong> {appointment.patientName || "Unknown"}</p>
                  <p className="text-gray-700 text-lg"><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                  {appointment.reason && <p className="text-gray-700 text-lg"><strong>Reason:</strong> {appointment.reason}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
