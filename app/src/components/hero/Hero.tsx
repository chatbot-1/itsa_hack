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
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
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
    <section className="pt-20 pb-10 mt-10 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Easy Appointment Scheduling</h1>
            <p className="text-gray-600 mb-6">
              Find the best doctors in your city and book your appointments online with ease.
            </p>
            <button
              onClick={handleBookNowClick}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Book Now
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src={hero} alt="Doctor booking" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
