import back from "../../assets/back.webp"

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About Us</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-gray-300 h-64 md:h-80 rounded-lg">
                <img src={back} alt="" />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <p className="text-gray-600 mb-4">
                At MediCare, we are committed to providing the highest quality healthcare services. Our team of expert
                doctors and healthcare professionals are here to assist you in every step of your health journey.
              </p>
              <p className="text-gray-600">
                Whether it's regular checkups, specialist consultations, or any other health needs, we make it
                easy to schedule and manage your appointments.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default About