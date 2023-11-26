import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions({ title, description, body, expanded, onChange }: any) {
  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={onChange}
        sx={{
          backgroundColor: '#f5f5f5', // Set background color
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
          borderRadius: '8px', // Add border radius for a rounded appearance
          marginBottom: '8px', // Add some spacing at the bottom
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            backgroundColor: 'rgb(244 244 245)', // Set a slightly different background color for the header
            borderBottom: '1px solid #bdbdbd', // Add a bottom border
            borderRadius: '8px 8px 8px 8px', // Add rounded corners to the top
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold', color: '#333' }}>
            {title}
          </Typography>
          <Typography sx={{ color: '#666' }}>{description}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#fafafa' }}> {/* Set background color for the details */}
          <Typography>{body}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
