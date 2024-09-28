import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import axios from 'axios';
import { useUser } from '../../UserContext';

interface DoctorFormData {
  name: string;
  email: string;
  password: string;
  specialization: string;
  experience: number;
  licenceNumber: string;
  contactNumber: string;
  availability: string[];
}

const SignUpAsDoctor: React.FC = () => {
  const { setUid } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<DoctorFormData>({
    name: '',
    email: '',
    password: '',
    specialization: '',
    experience: 0,
    licenceNumber: '',
    contactNumber: '',
    availability: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvailabilityChange = (day: string) => {
    setFormData((prevState) => {
      const availability = prevState.availability.includes(day)
        ? prevState.availability.filter((d) => d !== day)
        : [...prevState.availability, day];
      return { ...prevState, availability };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const { user } = userCredential;
        const uid = user.uid;
        setUid(uid);
        sessionStorage.setItem('uid', uid);
        console.log('Signed in doctor:', user);
        const token = await user.getIdToken();
        sessionStorage.setItem('token', token);
        navigate('/');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const { user } = userCredential;
        const uid = user.uid;
        setUid(uid);
        sessionStorage.setItem('uid', uid);
        console.log('Signed up doctor:', user);
        const token = await user.getIdToken();
        sessionStorage.setItem('token', token);

        await axios.post('http://localhost:5000/api/doctors/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          specialization: formData.specialization,
          experience: formData.experience,
          licenceNumber: formData.licenceNumber,
          contactNumber: formData.contactNumber,
          availability: formData.availability,
          firebaseUid: uid,
        });

        console.log('Doctor registered in MongoDB:', user);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg flex">
        <div className="w-full">
          <div className="flex justify-between border-b border-gray-300">
            <button
              className={`flex-1 py-4 text-lg font-semibold transition duration-300 ${isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-4 text-lg font-semibold transition duration-300 ${!isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <div className={`p-6 ${isLogin ? 'block' : 'hidden'}`}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </div>

          <div className={`p-6 ${!isLogin ? 'block' : 'hidden'}`}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Experience (in years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">License Number</label>
                  <input
                    type="text"
                    name="licenceNumber"
                    value={formData.licenceNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Availability (days)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          id={day}
                          checked={formData.availability.includes(day)}
                          onChange={() => handleAvailabilityChange(day)}
                          className="mr-2"
                        />
                        <label htmlFor={day}>{day}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpAsDoctor;
