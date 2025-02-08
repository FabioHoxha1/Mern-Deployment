import { Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';

const Header = () => {
    const { state } = usePatients();
    return (
<<<<<<< HEAD
      <header className="paper mt-2 mb-4">
        <nav className="header-nav container py-3">
          <div className="header-buttons">
            <Link to="/" className="button button-contained">
              Home
            </Link>
            <Link to="/patients" className="button button-contained">
              View Patients
            </Link>
          </div>
          <div className="patient-count">
            <p className="text-secondary">Total Patients: {state.patients.length}</p>
=======
      <header className="bg-white shadow-md mb-8">
        <nav className="main-container flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
          
            <Link to="/" className="home-link">
              Home
            </Link>
          </div>
          <p className="text-gray-600">Total Patients: {state.patients.length}</p>
          <div className="space-x-6">
            <Link to="/" className="nav-link">Add Patient</Link>
            <Link to="/patients" className="nav-link">View Patients</Link>
>>>>>>> b992d276e88d02265485d509695c118537a26739
          </div>
        </nav>
      </header>
    );
  }

export default Header;