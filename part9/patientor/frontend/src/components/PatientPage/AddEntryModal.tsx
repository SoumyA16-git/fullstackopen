import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from '@mui/material';
import AddEntryForm from './AddEntryForm.tsx';
import type { EntryWithoutId, Diagnosis } from '../../types.ts';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, diagnoses, error }: Props) => (
  <Dialog fullWidth={true} maxWidth="md" open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add New Medical Entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && (
        <Alert severity="error" style={{ marginBottom: '1em' }}>
          {error}
        </Alert>
      )}
      <AddEntryForm diagnoses={diagnoses} onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
