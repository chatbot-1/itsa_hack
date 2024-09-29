const Service = () => {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="bg-gray-300 h-40 rounded-lg mb-4 overflow-hidden">
              {/* Image placeholder can be added here */}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">General Consultation</h3>
            <p className="text-gray-600 leading-relaxed">
              Consult with our general practitioners for regular check-ups and health assessments.
            </p>
          </div>
          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="bg-gray-300 h-40 rounded-lg mb-4 overflow-hidden">
              {/* Image placeholder can be added here */}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Specialist Services</h3>
            <p className="text-gray-600 leading-relaxed">
              Get expert advice from leading specialists in fields such as cardiology, neurology, and more.
            </p>
          </div>
          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="bg-gray-300 h-40 rounded-lg mb-4 overflow-hidden">
              {/* Image placeholder can be added here */}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Emergency Care</h3>
            <p className="text-gray-600 leading-relaxed">
              Quick and reliable emergency services available 24/7 for immediate care and support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
