import { useState, type SyntheticEvent } from 'react';
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  FormControl,
  OutlinedInput,
  Chip,
  Box,
  type SelectChangeEvent,
} from '@mui/material';
import {
  type EntryWithoutId,
  type Diagnosis,
  HealthCheckRating,
} from '../../types.ts';

interface Props {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck specific
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  // Hospital specific
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // OccupationalHealthcare specific
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    switch (entryType) {
      case 'HealthCheck':
        onSubmit({
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating,
        });
        break;
      case 'Hospital':
        onSubmit({
          ...baseEntry,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                }
              : undefined,
        });
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1em' }}>
      <FormControl fullWidth style={{ marginBottom: '1em' }}>
        <InputLabel id="entry-type-label">Entry Type</InputLabel>
        <Select
          labelId="entry-type-label"
          label="Entry Type"
          value={entryType}
          onChange={({ target }) => setEntryType(target.value as EntryType)}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Description"
        fullWidth
        required
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        style={{ marginBottom: '1em' }}
      />

      <TextField
        label="Date"
        type="date"
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
        style={{ marginBottom: '1em' }}
      />

      <TextField
        label="Specialist"
        fullWidth
        required
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        style={{ marginBottom: '1em' }}
      />

      <FormControl fullWidth style={{ marginBottom: '1em' }}>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} — {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {entryType === 'HealthCheck' && (
        <FormControl fullWidth style={{ marginBottom: '1em' }}>
          <InputLabel id="health-rating-label">Health Check Rating</InputLabel>
          <Select
            labelId="health-rating-label"
            label="Health Check Rating"
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value) as HealthCheckRating)
            }
          >
            <MenuItem value={HealthCheckRating.Healthy}>0 — Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>1 — Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>2 — High Risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>3 — Critical Risk</MenuItem>
          </Select>
        </FormControl>
      )}

      {entryType === 'Hospital' && (
        <Box style={{ marginBottom: '1em' }}>
          <TextField
            label="Discharge Date"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            style={{ marginBottom: '1em' }}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            required
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </Box>
      )}

      {entryType === 'OccupationalHealthcare' && (
        <Box style={{ marginBottom: '1em' }}>
          <TextField
            label="Employer Name"
            fullWidth
            required
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            style={{ marginBottom: '1em' }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Sick Leave Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Sick Leave End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      <Grid container spacing={2} style={{ marginTop: '0.5em' }}>
        <Grid item xs={6}>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            style={{ float: 'right' }}
            type="submit"
            variant="contained"
          >
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
