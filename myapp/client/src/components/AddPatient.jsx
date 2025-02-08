import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { patientService } from '../services/patientService';

const AddPatient = () => {
  const navigate = useNavigate();
  const { dispatch } = usePatients();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    symptoms: ''
  });
  const [errors, setErrors] = useState({});

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
      const newPatient = await patientService.createPatient(formData);
      dispatch({ type: 'ADD_PATIENT', payload: newPatient });
      navigate('/patients');
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
<<<<<<< HEAD
    <div className="paper container">
      <h2 className="mb-4">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
=======
    <div className="form-container max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
>>>>>>> b992d276e88d02265485d509695c118537a26739
          <label className="input-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
<<<<<<< HEAD
            className={`input-field ${errors.name ? 'border-error' : ''}`}
          />
          {errors.name && <p className="text-error mt-1">{errors.name}</p>}
        </div>

        <div className="form-control">
=======
            className={`input-field ${errors.name ? 'input-error' : ''}`}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div>
>>>>>>> b992d276e88d02265485d509695c118537a26739
          <label className="input-label">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
<<<<<<< HEAD
            className={`input-field ${errors.age ? 'border-error' : ''}`}
          />
          {errors.age && <p className="text-error mt-1">{errors.age}</p>}
        </div>

        <div className="form-control">
=======
            className={`input-field ${errors.age ? 'input-error' : ''}`}
          />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>

        <div>
>>>>>>> b992d276e88d02265485d509695c118537a26739
          <label className="input-label">Symptoms:</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
<<<<<<< HEAD
            className={`input-field min-h-[100px] ${errors.symptoms ? 'border-error' : ''}`}
          />
          {errors.symptoms && <p className="text-error mt-1">{errors.symptoms}</p>}
=======
            className={`input-field min-h-[100px] ${errors.symptoms ? 'input-error' : ''}`}
          />
          {errors.symptoms && <p className="error-text">{errors.symptoms}</p>}
>>>>>>> b992d276e88d02265485d509695c118537a26739
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
<<<<<<< HEAD
          className="button button-contained w-full mt-4"
=======
          className="btn-primary w-full"
>>>>>>> b992d276e88d02265485d509695c118537a26739
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default AddPatient;
=======
export default AddPatient;
>>>>>>> b992d276e88d02265485d509695c118537a26739
