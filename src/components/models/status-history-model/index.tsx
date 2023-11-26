import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface LastActivityType {
  status: string;
  date: string;
}

interface AddLastActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLastActivity: (newActivity: LastActivityType) => void;
}

const AddLastActivityModal: React.FC<AddLastActivityModalProps> = ({ isOpen, onClose, onAddLastActivity }) => {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  const handleAddLastActivity = () => {
    if (status && date) {
      const newActivity: LastActivityType = { status, date };
      onAddLastActivity(newActivity);
      setStatus('');
      setDate('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Last Activity</DialogTitle>
      <DialogContent>
        <TextField
          label="Latest Project Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
       

        <button
              type="button"
              onClick={handleAddLastActivity}
              className="bg-sky-400 text-white hover:bg-sky-500 px-4 py-2 text-xs rounded"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border-sky-400  border px-4 py-2 text-xs rounded text-sky-400 hover:border-sky-500 hover:text-sky-500"
            >
              Cancel
            </button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLastActivityModal;
