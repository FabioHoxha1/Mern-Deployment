import { Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';

const Header = () => {
    const { state } = usePatients();
    return (
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
          </div>
        </nav>
      </header>
    );
  }

export default Header;