import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import doctorImage from "../../assets/doctor.jpg";

interface Doctor {
  image: string;
  _id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  contactNumber: string;
}

const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="slick-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-200"
        onClick={onClick}
      >
        &#x2192; {/* Right Arrow */}
      </button>
    );
};

const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="slick-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-200"
        onClick={onClick}
      >
        &#x2190; {/* Left Arrow */}
      </button>
    );
};

const DoctorCarousel: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<Doctor[]>(`http://localhost:5000/api/doctors/all-doctors`);
        setDoctors(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching doctors: {error}</div>;

  const slidesToShow = Math.min(doctors.length, 3);

  const settings = {
    dots: true,
    infinite: doctors.length > 1,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(doctors.length, 2),
          slidesToScroll: 1,
          infinite: doctors.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: doctors.length > 1,
        },
      },
    ],
  };

  const handleBookAppointment = (doctorId: string) => {
    alert(`Booking appointment with doctor ID: ${doctorId}`);
  };

  return (
    <section id="doctors" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Doctors</h2>

        {doctors.length > 0 ? (
          <div className="flex justify-center">
            <div style={{ width: '90%', maxWidth: '1200px' }}>
              <Slider {...settings}>
                {doctors.map((doctor) => (
                  <div key={doctor._id} className="p-4">
                    <div
                      className="bg-white p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105"
                      style={{ width: '300px', height: '400px' }} 
                    >
                      <div
                        className="bg-gray-300 h-40 rounded-lg mb-4"
                        style={{ width: '100%', height: '160px' }} 
                      >
                        <img 
                          src={doctor.image || doctorImage} 
                          alt={doctor.name}
                          className="h-full w-full object-cover rounded-lg" 
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
                      <p className="text-gray-600">{doctor.specialization}</p>
                      <p className="text-gray-600">Experience: {doctor.experience} years</p>
                      <p className="text-gray-600">Contact: {doctor.contactNumber}</p>
                      <button
                        onClick={() => handleBookAppointment(doctor._id)}
                        className="mt-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">No doctors available at the moment.</div>
        )}
      </div>
    </section>
  );
};

export default DoctorCarousel;
