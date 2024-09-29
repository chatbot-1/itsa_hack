import back from "../../assets/back.webp";

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Us</h2>
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={back}
                alt="About MediCare"
                className="w-full h-64 md:h-72 object-cover transition-transform duration-300 transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-20"></div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              At <span className="font-semibold text-indigo-600">MediCare</span>, we are committed to providing the highest quality healthcare services. Our team of expert doctors and healthcare professionals are here to assist you in every step of your health journey.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Whether it's regular checkups, specialist consultations, or any other health needs, we make it easy to schedule and manage your appointments.
            </p>
            <button className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
