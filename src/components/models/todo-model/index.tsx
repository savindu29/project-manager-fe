import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface TodoType {
  title: string;
  description: string;
  date: string;
  isDone: boolean;
}

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (newTodo: TodoType) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const isDone = false;

  const handleAddTodo = () => {
    if (title && description && date) {
      const newTodo: TodoType = { title, description, date, isDone };
      onAddTodo(newTodo);
      setTitle('');
      setDescription('');
      setDate('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          label="Due Date"
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
          onClick={handleAddTodo}
         
          color="primary"
          className="bg-black  text-white hover:bg-sky-500 px-4 py-2 text-xs rounded"
        >
          Add Task
        </button>

        <button
          onClick={onClose}
          // variant="outlined"
          className="border-sky-400  border px-4 py-2 text-xs rounded text-sky-400 hover:border-sky-500 hover:text-sky-500"
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodoModal;
