import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';
import axios from 'axios';

import type { Patient, Diagnosis, EntryWithoutId } from '../../types.ts';
import patientService from '../../services/patients.ts';
import EntryDetails from './EntryDetails.tsx';
import AddEntryModal from './AddEntryModal.tsx';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (id) {
      setLoading(true);
      patientService
        .getById(id)
        .then((data) => {
          setPatient(data);
          setLoading(false);
        })
        .catch((e: unknown) => {
          console.error('Error fetching patient', e);
          setLoading(false);
        });
    }
  }, [id]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!id || !patient) return;
    try {
      const newEntry = await patientService.createEntry(id, values);
      setPatient({
        ...patient,
        entries: patient.entries.concat(newEntry),
      });
      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (
          e.response?.data &&
          typeof e.response.data === 'object' &&
          'error' in e.response.data
        ) {
          const errData = e.response.data as {
            error: string | Array<{ message: string }>;
          };
          if (Array.isArray(errData.error)) {
            setError(errData.error.map((issue) => issue.message).join(', '));
          } else {
            setError(String(errData.error));
          }
        } else {
          setError(e.message);
        }
      } else {
        setError('Unknown error');
      }
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <Male color="primary" fontSize="large" />;
      case 'female':
        return <Female color="secondary" fontSize="large" />;
      default:
        return <Transgender color="action" fontSize="large" />;
    }
  };

  if (loading) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!patient) {
    return (
      <Typography variant="h6" color="error" style={{ marginTop: '2em' }}>
        Patient not found.
      </Typography>
    );
  }

  return (
    <Box style={{ marginTop: '1.5em' }}>
      <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '0.5em' }}>
        <Typography variant="h4" component="h2">
          {patient.name}
        </Typography>
        {getGenderIcon(patient.gender)}
      </Box>

      {patient.ssn && (
        <Typography variant="body1">
          <strong>ssh:</strong> {patient.ssn}
        </Typography>
      )}

      {patient.dateOfBirth && (
        <Typography variant="body1">
          <strong>date of birth:</strong> {patient.dateOfBirth}
        </Typography>
      )}

      <Typography variant="body1" style={{ marginBottom: '1.5em' }}>
        <strong>occupation:</strong> {patient.occupation}
      </Typography>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        diagnoses={diagnoses}
        error={error}
      />

      <Button variant="contained" color="primary" onClick={openModal} style={{ marginBottom: '1.5em' }}>
        Add New Entry
      </Button>

      <Typography variant="h5" component="h3" style={{ marginBottom: '0.8em', fontWeight: 'bold' }}>
        entries
      </Typography>

      {patient.entries.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No entries recorded for this patient.
        </Typography>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}
    </Box>
  );
};

export default PatientPage;
