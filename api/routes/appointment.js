const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointments');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/appointment', async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime, notes } = req.body;

    const doctor = await Doctor.findOne({ firebaseUid: doctorId });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const doctorName = doctor.name;
    const doctorEmail = doctor.email;

    const patient = await Patient.findOne({ firebaseUid: patientId });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const patientName = patient.name;
    const patientEmail = patient.email;

    const newAppointment = new Appointment({
      patientId,
      patientName,
      patientEmail,
      doctorId,
      doctorName,
      doctorEmail,
      appointmentDate,
      appointmentTime,
      notes,
    });

    await newAppointment.save();

    const doctorMessage = {
      to: doctorEmail,
      from: 'atulsingh.cap@gmail.com',
      subject: 'New Appointment Scheduled',
      text: `You have a new appointment scheduled with ${patientName} on ${appointmentDate} at ${appointmentTime}. Notes: ${notes}`,
      html: `<strong>You have a new appointment scheduled with ${patientName} on ${appointmentDate} at ${appointmentTime}.</strong><br>Notes: ${notes}`,
    };

    const patientMessage = {
      to: patientEmail,
      from: 'atulsingh.cap@gmail.com',
      subject: 'Appointment Confirmation',
      text: `Your appointment with Dr. ${doctorName} is confirmed for ${appointmentDate} at ${appointmentTime}. Notes: ${notes}`,
      html: `<strong>Your appointment with Dr. ${doctorName} is confirmed for ${appointmentDate} at ${appointmentTime}.</strong><br>Notes: ${notes}`,
    };

    // Send emails
    await sgMail.send(doctorMessage);
    await sgMail.send(patientMessage);

    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
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
    console.error('Error fetching appointment details:', error);
    res.status(500).json({ message: 'Error fetching appointment details', error: error.message });
  }
});


module.exports = router;
