const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Get In Touch</h2>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-1/2 md:pr-10 mb-8 md:mb-0">
            <p className="text-gray-600 mb-4">
              Have any questions? Need assistance with your appointments? Feel free to reach out to us anytime.
            </p>
            <p className="text-gray-600 mb-4">
              Call us at: <span className="font-semibold text-indigo-600">+1 234 567 890</span>
            </p>
            <p className="text-gray-600 mb-4">
              Email: <span className="font-semibold text-indigo-600">support@medicare.com</span>
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  <i className="fab fa-facebook-f"></i> {/* Use Font Awesome or any icon library */}
                </a>
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.108658167664!2d-122.41872228468154!3d37.77492927975944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808cf3f184b3%3A0xa2b39ec3a2bfc839!2sYour%20Location%20Name!5e0!3m2!1sen!2sus!4v1631814746918!5m2!1sen!2sus"
              width="100%"
              height="300"  
              className="rounded-lg" 
              style={{ border: 0 }}
              loading="lazy"
              title="Google Map Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
