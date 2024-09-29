import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const firebaseUid = sessionStorage.getItem("uid");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patients/user-profile/${firebaseUid}`
        );
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [firebaseUid]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">User Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Full Name</label>
          <p className="text-gray-600">{user.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email Address</label>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Contact Number</label>
          <p className="text-gray-600">{user.phoneNumber}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Medical History</label>
          <p className="text-gray-600">{user.medicalHistory}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
