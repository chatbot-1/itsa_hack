import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import axios from 'axios';
import { useUser } from '../../UserContext';

interface FormData {
  name?: string;
  email: string;
  phoneNumber?: string;
  password: string;
  dateOfBirth?: string;
  medicalHistory?: string;
}

const SignUpAsUser: React.FC = () => {
  const { setUid } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isLogin) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const { user } = userCredential;
        const uid = user.uid;
        setUid(uid);
        sessionStorage.setItem('uid', uid);
        console.log('Signed in user:', userCredential.user);
        console.log('uid', uid);
        const token = await user.getIdToken();
        sessionStorage.setItem('token', token);
        navigate('/');
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const { user } = userCredential;
        const uid = user.uid;
        setUid(uid);
        sessionStorage.setItem('uid', uid);
        console.log('Signed up user:', userCredential.user);
        const token = await user.getIdToken();
        sessionStorage.setItem('token', token);

        await axios.post('http://localhost:5000/api/patients/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
          medicalHistory: formData.medicalHistory,
          firebaseUid: uid,
        });

        console.log('User registered in MongoDB:', user);
        navigate('/');
      } catch (err: any) {
        setError(err.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex">
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
                  className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
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
                  className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
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
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                />
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Medical History</label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                  rows={3}
                />
              </div>
              <div className="mb-6 md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 md:col-span-2"
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

export default SignUpAsUser;
