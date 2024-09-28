const express = require('express');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const router = express.Router();

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

module.exports = router;
