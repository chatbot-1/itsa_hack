const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  patientEmail: { type: String, required: true },
  doctorEmail: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
