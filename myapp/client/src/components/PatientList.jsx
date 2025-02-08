import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { patientService } from '../services/patientService';

const PatientList = () => {
  const { state, dispatch } = usePatients();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patients = await patientService.getAllPatients();
        dispatch({ type: 'SET_PATIENTS', payload: patients });
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = () => {
    switch (filter) {
      case 'children':
        return state.patients.filter(patient => patient.age < 18);
      case 'adults':
        return state.patients.filter(patient => patient.age >= 18);
      default:
        return state.patients;
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Patient List</h2>
      
      <div className="mb-4 space-x-2">
        {['all', 'children', 'adults'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`button ${
              filter === filterType 
                ? 'button-contained' 
                : 'button-outlined'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>
    
      <div className="grid">
        {filteredPatients().map(patient => (
          <div key={patient._id} className="paper">
            <h3 className="mb-2">{patient.name}</h3>
            <p className="text-secondary mb-4">Age: {patient.age}</p>
            <div className="space-x-2">
              <Link 
                to={`/patients/${patient._id}`} 
                className="button button-text"
              >
                View Details
              </Link>
              <Link 
                to={`/patients/edit/${patient._id}`} 
                className="button button-outlined"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(patient._id)}
                className="button button-text text-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;