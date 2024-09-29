import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  contactNumber: string;
  availability: string[];
}

interface Appointment {
  appointmentTime: string;
  appointmentDate: string;
}

const BookAppointment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId, patientId } = location.state || {};
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const timeSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = 10 + i;
    const startHour = hour % 12 === 0 ? 12 : hour % 12;
    const startPeriod = hour < 12 ? "AM" : "PM";
    const endHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;
    const endPeriod = hour + 1 < 12 ? "AM" : "PM";

    return `${startHour} ${startPeriod} - ${endHour} ${endPeriod}`;
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get<Doctor>(
          `http://localhost:5000/api/doctors/doctor-profile/${doctorId}`
        );
        setDoctor(response.data);
      } catch (err) {
        setError("Error fetching doctor details");
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  
    const fetchDoctor = async () => {
      try {
        const response = await axios.get<Doctor>(
          `http://localhost:5000/api/doctors/doctor-profile/${doctorId}`
        );
        setDoctor(response.data);
      } catch (err) {
        setError("Error fetching doctor details");
      }
    };
  
    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);
  

  const fetchAvailableTimes = async (selectedDate: string) => {
    try {
      const response = await axios.get<Appointment[]>(
        `http://localhost:5000/api/appointment/appointment/${doctorId}`
      );

      const normalizedSelectedDate = new Date(selectedDate).toLocaleDateString(
        "en-CA",
        {
          timeZone: "Asia/Kolkata",
        }
      );

      const appointmentsForDate = response.data.filter((appointment) => {
        const appointmentDate = new Date(
          appointment.appointmentDate
        ).toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        });
        return appointmentDate === normalizedSelectedDate;
      });

      console.log("Appointments for selected date:", appointmentsForDate);

      const bookedTimesForDate = appointmentsForDate.map(
        (appointment) => appointment.appointmentTime
      );

      setBookedTimes(bookedTimesForDate);
    } catch (err) {
      console.log("All slots are available");
    }
  };

  const handleDaySelect = (day: string, formattedDate: string) => {
    setSelectedDay(day);
    setDate(formattedDate);
    fetchAvailableTimes(formattedDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!doctorId || !date || !time || !selectedDay) {
      setError("Please fill in all fields and select an available day");
      return;
    }

    const selectedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      timeZone: "Asia/Kolkata",
    };
    const dayOfWeek = new Intl.DateTimeFormat("en-US", options).format(
      selectedDate
    );

    if (dayOfWeek !== selectedDay) {
      setError(
        "The selected date is not available. Please select an available day."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointment/appointment",
        {
          patientId: patientId,
          doctorId: doctorId,
          appointmentDate: date,
          appointmentTime: time,
        }
      );

      const data = response.data;
      console.log("Appointment data:", data);
      setSuccess("Appointment booked successfully!");
      setDate("");
      setTime("");
      setSelectedDay(null);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Error booking appointment");
    }
  };

  const renderCalendar = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return (
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => {
          const isAvailable = doctor?.availability.includes(day);
          const dateOfWeek = new Date(currentDate);
          dateOfWeek.setDate(
            currentDate.getDate() +
              (daysOfWeek.indexOf(day) - currentDate.getDay())
          );

          const formattedDate = dateOfWeek.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
          });

          return (
            <div
              key={day}
              onClick={() => {
                if (isAvailable) {
                  handleDaySelect(day, formattedDate);
                }
              }}
              className={`p-4 text-center border rounded cursor-pointer 
                          ${
                            isAvailable
                              ? selectedDay === day
                                ? "bg-blue-500 text-white"
                                : "bg-green-200 hover:bg-green-300"
                              : "bg-gray-200 cursor-not-allowed"
                          }
                          ${
                            selectedDay === day
                              ? "border-blue-500"
                              : "border-gray-300"
                          }`}
            >
              <div>{day}</div>
              <div className={`text-sm ${isAvailable ? "" : "text-gray-500"}`}>
                {isAvailable ? dateOfWeek.toLocaleDateString() : "Unavailable"}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderAvailableTimes = () => {
    return (
      <div className="grid grid-cols-3 gap-2 mt-4">
        {timeSlots.map((slot, index) => {
          const hour = 10 + index;
          const storedTime = `${hour}:00`;
          const isBooked = bookedTimes.includes(storedTime);

          return (
            <div
              key={slot}
              onClick={() => !isBooked && setTime(storedTime)}
              className={`p-4 text-center border rounded cursor-pointer 
                          ${
                            isBooked
                              ? "bg-gray-300 cursor-not-allowed"
                              : time === storedTime
                              ? "bg-blue-500 text-white"
                              : "bg-green-200 hover:bg-green-300"
                          }`}
            >
              {isBooked ? `${slot} Already Booked` : slot}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      {doctor && (
        <div className="mb-6 p-8 mt-10 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg">
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex-shrink-0 bg-blue-500 h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {doctor.name[0]}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <h4 className="text-gray-700 font-medium">Experience</h4>
              <p className="text-lg font-semibold text-blue-600">
                {doctor.experience} years
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <h4 className="text-gray-700 font-medium">Contact</h4>
              <p className="text-lg font-semibold text-blue-600">
                {doctor.contactNumber}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <h4 className="text-gray-700 font-medium">Availability</h4>
              <p className="text-lg font-semibold text-blue-600">
                {doctor.availability.join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Select Available Days</h4>
        {renderCalendar()}
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Select Time Slot</h4>
        {renderAvailableTimes()}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Selected Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Selected Time</label>
          <input
            type="text"
            value={time}
            readOnly
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
