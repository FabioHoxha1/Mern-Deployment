import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

export const patientService = {
  getAllPatients: () => api.get('/patients').then(res => res.data),
  getPatient: (id) => api.get(`/patients/${id}`).then(res => res.data),
  createPatient: (data) => api.post('/patients', data).then(res => res.data),
  updatePatient: (id, data) => api.put(`/patients/${id}`, data).then(res => res.data),
  deletePatient: (id) => api.delete(`/patients/${id}`).then(res => res.data)
};
