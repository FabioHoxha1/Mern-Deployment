import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PatientProvider } from './context/PatientContext';
import Header from './components/Header';
import AddPatient from './components/AddPatient';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import EditPatient from './components/EditPatient';

function App() {
  return (
    <PatientProvider>
      <BrowserRouter>
<<<<<<< HEAD
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<AddPatient />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/patients/:id" element={<PatientDetails />} />
              <Route path="/patients/edit/:id" element={<EditPatient />} />
            </Routes>
          </main>
=======
        <div className="container mx-auto px-4 py-8">
          <Header />
          <Routes>
            <Route path="/" element={<AddPatient />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            <Route path="/patients/edit/:id" element={<EditPatient />} />
          </Routes>
>>>>>>> b992d276e88d02265485d509695c118537a26739
        </div>
      </BrowserRouter>
    </PatientProvider>
  );
}

export default App;