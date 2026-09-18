import { Box, Typography } from '@mui/material';
import {
  LocalHospital,
  Work,
  MedicalServices,
  Favorite,
} from '@mui/icons-material';
import {
  type Entry,
  type Diagnosis,
  HealthCheckRating,
} from '../../types.ts';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const getHeartColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return '#2e7d32'; // green
    case HealthCheckRating.LowRisk:
      return '#fbc02d'; // yellow
    case HealthCheckRating.HighRisk:
      return '#f57c00'; // orange
    case HealthCheckRating.CriticalRisk:
      return '#d32f2f'; // red
    default:
      return 'grey';
  }
};

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : '';
  };

  const renderSpecificDetails = () => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <Box style={{ marginTop: '0.5em' }}>
            <Typography variant="body2">
              <strong>Discharge:</strong> {entry.discharge.date} — {entry.discharge.criteria}
            </Typography>
          </Box>
        );
      case 'OccupationalHealthcare':
        return (
          <Box style={{ marginTop: '0.5em' }}>
            <Typography variant="body2">
              <strong>Employer:</strong> {entry.employerName}
            </Typography>
            {entry.sickLeave && (
              <Typography variant="body2">
                <strong>Sick leave:</strong> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
              </Typography>
            )}
          </Box>
        );
      case 'HealthCheck':
        return (
          <Box style={{ marginTop: '0.5em', display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            <Favorite style={{ color: getHeartColor(entry.healthCheckRating) }} />
            <Typography variant="body2">Rating: {HealthCheckRating[entry.healthCheckRating]}</Typography>
          </Box>
        );
      default:
        return assertNever(entry);
    }
  };

  const renderIcon = () => {
    switch (entry.type) {
      case 'Hospital':
        return <LocalHospital color="primary" />;
      case 'OccupationalHealthcare':
        return <Work color="action" />;
      case 'HealthCheck':
        return <MedicalServices color="secondary" />;
      default:
        return null;
    }
  };

  return (
    <Box
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1em',
        marginBottom: '1em',
        backgroundColor: '#fafafa',
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginBottom: '0.3em' }}>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
          {entry.date}
        </Typography>
        {renderIcon()}
      </Box>

      <Typography variant="body1" style={{ fontStyle: 'italic', marginBottom: '0.5em' }}>
        {entry.description}
      </Typography>

      {renderSpecificDetails()}

      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <Box style={{ marginTop: '0.5em' }}>
          <Typography variant="body2" style={{ fontWeight: 'bold' }}>
            Diagnoses:
          </Typography>
          <ul style={{ margin: '0.3em 0', paddingLeft: '1.5em' }}>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                <Typography variant="body2">
                  <strong>{code}</strong> {getDiagnosisName(code)}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginTop: '0.5em' }}>
        diagnose by {entry.specialist}
      </Typography>
    </Box>
  );
};

export default EntryDetails;
