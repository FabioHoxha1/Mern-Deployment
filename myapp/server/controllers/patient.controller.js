const Patient = require('../models/patient.model');

const normalizeError = (err) => ({
  type: err.name,
  code: err.name === 'ValidationError' ? 400 : 500,
  message: err.message,
  errors: err.errors ? Object.values(err.errors).map(e => ({
    field: e.path,
    message: e.message
  })) : null
});

module.exports = {
  getAllPatients: async (req, res) => {
    try {
      const patients = await Patient.find();
      res.json(patients);
    } catch (err) {
      const error = normalizeError(err);
      res.status(error.code).json(error);
    }
  },

  getPatient: async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      res.json(patient);
    } catch (err) {
      const error = normalizeError(err);
      res.status(error.code).json(error);
    }
  },

  createPatient: async (req, res) => {
    try {
      const patient = await Patient.create(req.body);
      res.status(201).json(patient);
    } catch (err) {
      const error = normalizeError(err);
      res.status(error.code).json(error);
    }
  },

  updatePatient: async (req, res) => {
    try {
      const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      res.json(patient);
    } catch (err) {
      const error = normalizeError(err);
      res.status(error.code).json(error);
    }
  },

  deletePatient: async (req, res) => {
    try {
      const patient = await Patient.findByIdAndDelete(req.params.id);
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
      const error = normalizeError(err);
      res.status(error.code).json(error);
    }
  }
};