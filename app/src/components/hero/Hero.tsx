import { Link } from "react-router-dom"
import hero from "../../assets/hero.webp"

const Hero = () => {
  return (
    <section className="pt-20 pb-10 mt-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Easy Appointment Scheduling</h1>
              <p className="text-gray-600 mb-6">
                Find the best doctors in your city and book your appointments online with ease.
              </p>
              <Link to="/visit-doctor"><a href="#book" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Book Now</a></Link>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
            <img src={hero} alt="" />
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero