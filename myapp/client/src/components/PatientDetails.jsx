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
