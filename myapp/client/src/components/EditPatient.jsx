import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { patientService } from '../services/patientService';

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = usePatients();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    symptoms: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getPatient(id);
        setFormData(patient);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };
    fetchPatient();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.length < 1 || formData.name.length > 40) 
      newErrors.name = 'Name must be between 1 and 40 characters';

    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 1 || formData.age > 140)
      newErrors.age = 'Age must be between 1 and 140';

    if (!formData.symptoms) newErrors.symptoms = 'Symptoms are required';
    else if (formData.symptoms.length < 4)
      newErrors.symptoms = 'Symptoms must be at least 4 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const updatedPatient = await patientService.updatePatient(id, formData);
      dispatch({ type: 'UPDATE_PATIENT', payload: updatedPatient });
      navigate(`/patients/${id}`);
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateForm();
  };

  return (
    <div className="paper container">
      <h2 className="mb-4">Edit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="input-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-error' : ''}`}
          />
          {errors.name && <p className="text-error mt-1">{errors.name}</p>}
        </div>

        <div className="form-control">
          <label className="input-label">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`input-field ${errors.age ? 'border-error' : ''}`}
          />
          {errors.age && <p className="text-error mt-1">{errors.age}</p>}
        </div>

        <div className="form-control">
          <label className="input-label">Symptoms:</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            className={`input-field min-h-[100px] ${errors.symptoms ? 'border-error' : ''}`}
          />
          {errors.symptoms && <p className="text-error mt-1">{errors.symptoms}</p>}
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="button button-contained w-full mt-4"
        >
          Update Patient
        </button>
      </form>
    </div>
  );
};

export default EditPatient;