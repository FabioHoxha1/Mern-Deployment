import { Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';

const Header = () => {
    const { state } = usePatients();
    return (
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
          </div>
        </nav>
      </header>
    );
  }

export default Header;