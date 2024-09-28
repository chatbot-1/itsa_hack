const Service = () => {
  return (
    <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">General Consultation</h3>
              <p className="text-gray-600">
                Consult with our general practitioners for regular check-ups and health assessments.
              </p>
            </div>
            {/* Service 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Specialist Services</h3>
              <p className="text-gray-600">
                Get expert advice from leading specialists in fields such as cardiology, neurology, and more.
              </p>
            </div>
            {/* Service 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Care</h3>
              <p className="text-gray-600">
                Quick and reliable emergency services available 24/7 for immediate care and support.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Service