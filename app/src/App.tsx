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
import { auth } from './firebaseConfig'; // Adjust the import path to your firebaseConfig

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
        <Route path="/" element={<><Hero /><About /><Service /><DoctorList /><Contact /></>} />
        <Route path="/signup-as-doctor" element={<SignUpAsDoctor />} />
        <Route path="/signup-as-user" element={<SignUpAsUser />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
