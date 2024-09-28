const express = require('express');
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { verifyToken } = require('../middleware/auth')

const parseDate = (dateString) => {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
        throw new Error('Invalid date format');
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
};


router.post('/register', async (req, res) => {
    const { name, email, password, phoneNumber, dateOfBirth, medicalHistory, firebaseUid } = req.body;

    if (!firebaseUid) {
        return res.status(400).json({ error: "firebaseUid is required." });
    }

    let parsedDateOfBirth;
    try {
        parsedDateOfBirth = parseDate(dateOfBirth);
    } catch (error) {
        return res.status(400).json({ error: "Invalid date format for dateOfBirth." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newPatient = new Patient({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            dateOfBirth: parsedDateOfBirth,
            medicalHistory: medicalHistory || '',
            firebaseUid,
        });

        await newPatient.save();
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/user-profile/:firebaseUid', async (req, res) => {
    const { firebaseUid } = req.params;
  
    try {
        const patient = await Patient.findOne({ firebaseUid });
  
        if (!patient) {
            return res.status(404).json({ error: "Patient not found." });
        }
  
        const { password, ...patientData } = patient.toObject();
  
        res.status(200).json(patientData);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving patient profile: " + error.message });
    }
});


module.exports = router;
