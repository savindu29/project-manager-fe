import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Filter = {
  column: string;
  operator: string;
  value: string;
};

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFilter: (newFilter: Filter) => void;
}

interface Operators {
  [key: string]: string[];
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose, onAddFilter }) => {
  const initialColumns = ['Column1', 'Column2', 'Column3'];

  const operators: Operators = {
    Column1: ['contains', 'equals', 'customOperation1'],
    Column2: ['startsWith', 'endsWith', 'customOperation2'],
    Column3: ['equals', 'notEqual', 'customOperation3'],
  };

  const createFilter = (column: string): Filter => ({
    column,
    operator: operators[column][0],
    value: '',
  });

  const [filters, setFilters] = useState<Filter[]>(initialColumns.map(createFilter));

  const handleAddFilter = () => {
    filters.forEach((filter) => {
      onAddFilter(filter);
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        Add Filters
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {initialColumns.map((column, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="subtitle1" color="textSecondary">
                  {column}
                </Typography>
              </Grid>

              <Grid item>
                <FormControl>
                  <InputLabel>Operator</InputLabel>
                  <Select
                    value={filters[index].operator}
                    onChange={(e) => setFilters((prevFilters) => {
                      const updatedFilters = [...prevFilters];
                      updatedFilters[index].operator = e.target.value as string;
                      return updatedFilters;
                    })}
                  >
                    {operators[column].map((op) => (
                      <MenuItem key={op} value={op}>
                        {op}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <TextField
                  label="Value"
                  value={filters[index].value}
                  onChange={(e) => setFilters((prevFilters) => {
                    const updatedFilters = [...prevFilters];
                    updatedFilters[index].value = e.target.value;
                    return updatedFilters;
                  })}
                />
              </Grid>
            </Grid>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddFilter}>Add Filters</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterPopup;
