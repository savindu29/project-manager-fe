import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface PositionedSnackbarProps {
  open: boolean;
  onClose: () => void;
  message:string
}

const PositionedSnackbar: React.FC<PositionedSnackbarProps> = ({ open, onClose,message }) => {
  const { vertical, horizontal }: SnackbarOrigin = { vertical: 'top', horizontal: 'right' };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={1000}
      onClose={onClose}
      message={message}
    />
    
  );
};

export default PositionedSnackbar;
