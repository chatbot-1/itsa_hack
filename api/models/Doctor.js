const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, 
    required: true,
  },
  licenceNumber: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  availability: {
    type: [String], 
    required: true,
  },
  firebaseUid: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
