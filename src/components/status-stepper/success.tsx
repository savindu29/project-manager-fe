import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Proposal In progress',
  'Proposal Won',
  'Implement Inprogress',
  'Implement Success',
];

interface HorizontalLinearAlternativeLabelStepperProps {
  stage: number;
}

const HorizontalLinearAlternativeLabelStepper: React.FC<HorizontalLinearAlternativeLabelStepperProps> = ({ stage }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={stage} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default HorizontalLinearAlternativeLabelStepper;
