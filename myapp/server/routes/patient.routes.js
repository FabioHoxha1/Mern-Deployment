const router = require('express').Router();
const PatientController = require('../controllers/patient.controller');

router.get('/', PatientController.getAllPatients);
router.get('/:id', PatientController.getPatient);
router.post('/', PatientController.createPatient);
router.put('/:id', PatientController.updatePatient);
router.delete('/:id', PatientController.deletePatient);

module.exports = router;