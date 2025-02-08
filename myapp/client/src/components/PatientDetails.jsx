import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { patientService } from '../services/patientService';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await patientService.getPatient(id);
        setPatient(data);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };
    fetchPatient();
  }, [id]);

<<<<<<< HEAD
  if (!patient) return <div className="container text-center">Loading...</div>;

  return (
    <div className="paper container">
      <h2 className="mb-4">Patient Details</h2>
      <div className="space-y-4">
        <h3>{patient.name}</h3>
        <p className="text-secondary"><strong>Age:</strong> {patient.age}</p>
        <p className="text-secondary"><strong>Symptoms:</strong> {patient.symptoms}</p>
        <div className="space-x-4 mt-4">
          
          <Link to={`/patients/edit/${patient._id}`} className="button button-contained">
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
=======
  if (!patient) return <div>Loading...</div>;

  return (
    <div className="form-container max-w-2xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Details</h2>
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{patient.name}</h3>
      <p className="text-gray-600"><strong>Age:</strong> {patient.age}</p>
      <p className="text-gray-600"><strong>Symptoms:</strong> {patient.symptoms}</p>
      <div className="space-x-4 mt-6">
        <Link to="/patients" className="text-blue-600 hover:text-blue-800">
          Back to List
        </Link>
        <Link to={`/patients/edit/${patient._id}`} className="text-green-600 hover:text-green-800">
          Edit Patient
        </Link>
      </div>
    </div>
  </div>
  );
};

export default PatientDetails;
>>>>>>> b992d276e88d02265485d509695c118537a26739
