import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerPatient = async (patientData: any) => {
    return await axios.post(`${API_URL}/patients/register`, patientData);
};

export const registerDoctor = async (doctorData: any) => {
    return await axios.post(`${API_URL}/doctors/register`, doctorData);
};
