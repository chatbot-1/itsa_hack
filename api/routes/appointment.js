const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointments');

router.post('/appointment', async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime, notes } = req.body;
    const newAppointment = new Appointment({ patientId, doctorId, appointmentDate, appointmentTime, notes });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
});

router.get('/appointment/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });

    if (!appointments.length) {
      return res.status(404).json({ message: 'No appointments found for this doctor.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointment details:', error); // Log the error
    res.status(500).json({ message: 'Error fetching appointment details', error: error.message }); // Return the error message
  }
});


module.exports = router;
