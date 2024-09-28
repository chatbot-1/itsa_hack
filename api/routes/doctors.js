const express = require('express');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, specialization, experience, licenceNumber, contactNumber, availability } = req.body;

  try {
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
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
