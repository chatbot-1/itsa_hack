const express = require('express');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { verifyToken } = require('../middleware/auth')

router.post('/register', async (req, res) => {
  const { name, email, password, specialization, experience, licenceNumber, contactNumber, availability, firebaseUid } = req.body;

  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ error: 'Doctor with this email already exists.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience,
      licenceNumber,
      contactNumber,
      availability,
      firebaseUid,
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    console.error("Error during doctor registration:", error); 
    res.status(500).json({ error: 'An error occurred while registering the doctor.' });
  }
});

router.get('/doctor-profile/:firebaseUid', async (req, res) => {
  const { firebaseUid } = req.params;

  try {
      const doctor = await Doctor.findOne({ firebaseUid });
      
      if (!doctor) {
          return res.status(404).json({ error: "Doctor not found." });
      }

      const { password, ...doctorData } = doctor.toObject(); 

      res.status(200).json(doctorData);
  } catch (error) {
      console.error("Error fetching doctor profile:", error);
      res.status(500).json({ error: error.message });
  }
});

router.get('/all-doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
