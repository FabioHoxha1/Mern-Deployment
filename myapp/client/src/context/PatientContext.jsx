import { createContext, useContext, useReducer } from 'react';

const PatientContext = createContext();

const initialState = {
  patients: [],
  loading: false,
  error: null
};

function patientReducer(state, action) {
  switch (action.type) {
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload };
    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, action.payload] };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map(patient => 
          patient._id === action.payload._id ? action.payload : patient
        )
      };
    case 'DELETE_PATIENT':
      return {
        ...state,
        patients: state.patients.filter(patient => patient._id !== action.payload)
      };
    default:
      return state;
  }
}

export function PatientProvider({ children }) {
  const [state, dispatch] = useReducer(patientReducer, initialState);
  return (
    <PatientContext.Provider value={{ state, dispatch }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  return useContext(PatientContext);
}
