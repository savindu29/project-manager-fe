import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions({ title, description, body, expanded, onChange }: any) {
  return (
    <div>
      <Accordion expanded={expanded} onChange={onChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ backgroundColor: 'rgb(226 232 240)' }} 
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
        </AccordionSummary>
        <AccordionDetails
        sx={{ backgroundColor: 'rgb(241 245 249)' }} 
        >
          <Typography>{body}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
