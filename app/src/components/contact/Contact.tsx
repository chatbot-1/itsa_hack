const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Get In Touch</h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-1/2">
              <p className="text-gray-600 mb-4">
                Have any questions? Need assistance with your appointments? Feel free to reach out to us anytime.
              </p>
              <p className="text-gray-600 mb-4">Call us at: <span className="font-semibold">+1 234 567 890</span></p>
              <p className="text-gray-600">Email: <span className="font-semibold">support@medicare.com</span></p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              {/* Placeholder for Contact Image */}
              <div className="bg-gray-300 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Contact