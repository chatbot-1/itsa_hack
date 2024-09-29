import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import hero from "../../assets/hero.webp";

const Hero = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleBookNowClick = () => {
    if (!isAuthenticated) {
      navigate("/signup-as-user");
    } else {
      navigate("/visit-doctor");
    }
  };

  return (
    <section className="bg-white py-32 mt-10"> {/* Increased vertical padding */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
              Easy Appointment Scheduling
            </h1>
            <p className="text-lg text-gray-600">
              Find the best doctors in your city and book your appointments
              online with ease. Your health is our priority.
            </p>
            <button
              onClick={handleBookNowClick}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0"> {/* Adjusted image width */}
            <img
              src={hero}
              alt="Doctor booking"
              className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
