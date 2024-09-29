import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import DoctorList from './components/doctors/DoctorList';
import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Service from './components/services/Service';
import SignUpAsDoctor from './components/auth/SignUpAsDoctor';
import SignUpAsUser from './components/auth/SignUpAsUser';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig';
import UserProfile from './profile/UserProfile';
import DoctorProfile from './profile/DoctorProfile';
import DoctorCarousel from './components/doctors/DoctorCarousel';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<><Hero /><About /><Service /><DoctorCarousel /><Contact /></>} />
        <Route path="/signup-as-doctor" element={<SignUpAsDoctor />} />
        <Route path="/signup-as-user" element={<SignUpAsUser />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/visit-doctor" element={<DoctorList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
