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
    <div className="main-container">
    <h2 className="text-3xl font-bold mb-8 text-gray-800">Patient List</h2>
    
    <div className="mb-6 space-x-4">
      {['all', 'children', 'adults'].map(filterType => (
        <button
          key={filterType}
          onClick={() => setFilter(filterType)}
          className={`px-4 py-2 rounded-md transition ${
            filter === filterType 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
        </button>
      ))}
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPatients().map(patient => (
        <div key={patient._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{patient.name}</h3>
          <p className="text-gray-600">Age: {patient.age}</p>
          <div className="mt-4 space-x-4">
            <Link to={`/patients/${patient._id}`} className="text-blue-600 hover:text-blue-800">
              View Details
            </Link>
            <Link to={`/patients/edit/${patient._id}`} className="text-green-600 hover:text-green-800">
              Edit
            </Link>
            <button
              onClick={() => handleDelete(patient._id)}
              className="text-red-600 hover:text-red-800"
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