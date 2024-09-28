import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { User } from 'firebase/auth';

const Navbar: React.FC<{ user: User | null }> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigate('/'); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-indigo-600">MediCare</div>
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
          <nav className={`hidden md:flex items-center space-x-6`}>
            <Link to="/" className="text-gray-700 hover:text-indigo-600">About</Link>
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Services</Link>
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Contact</Link>
            {user ? (
              <>
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup-as-user" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Book Appointment</Link>
                <Link to="/signup-as-doctor" className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300">Sign Up as a Doctor</Link>
              </>
            )}
          </nav>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-2 py-4 px-4">
            <Link to="#about" className="text-gray-700 hover:text-indigo-600 transition duration-300">About</Link>
            <Link to="#services" className="text-gray-700 hover:text-indigo-600 transition duration-300">Services</Link>
            <Link to="#contact" className="text-gray-700 hover:text-indigo-600 transition duration-300">Contact</Link>
            {user ? (
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="#book" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">Book Appointment</Link>
                <Link to="/signup-as-doctor" className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300">Sign Up as a Doctor</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
