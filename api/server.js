const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointment') 
require('dotenv').config();

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json()); 
const PORT = process.env.PORT || 5000; 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointment', appointmentRoutes); 

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
