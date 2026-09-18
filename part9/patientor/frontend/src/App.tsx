import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import type { Patient, Diagnosis } from './types.ts';
import patientService from './services/patients.ts';
import diagnosisService from './services/diagnoses.ts';
import PatientListPage from './components/PatientListPage/index.tsx';
import PatientPage from './components/PatientPage/index.tsx';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>('http://localhost:3001/api/ping');

    const fetchPatientList = async () => {
      const patientList = await patientService.getAll();
      setPatients(patientList);
    };
    void fetchPatientList();

    const fetchDiagnoses = async () => {
      const diagnosisList = await diagnosisService.getAll();
      setDiagnoses(diagnosisList);
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '0.5em', marginTop: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden style={{ margin: '1em 0' }} />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={<PatientPage diagnoses={diagnoses} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
