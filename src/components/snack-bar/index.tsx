import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

interface PositionedSnackbarProps {
  open: boolean;
  onClose: () => void;
  message:string
}

const PositionedSnackbar: React.FC<PositionedSnackbarProps> = ({ open, onClose,message }) => {
  const { vertical, horizontal }: SnackbarOrigin = { vertical: 'top', horizontal: 'right' };

  return (
   

    <Snackbar anchorOrigin={{ vertical, horizontal }}
    open={open}
    autoHideDuration={1000}
    onClose={onClose}
    
    >
        <Alert >
          {message}
        </Alert>
      </Snackbar>
    
  );
};

export default PositionedSnackbar;
