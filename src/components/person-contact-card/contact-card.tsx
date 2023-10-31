import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ContactCard( personDetails : any) {
  const [expanded, setExpanded] = useState(false);
  const firstLetter = personDetails.personDetails.name.charAt(0);
  const emptyData ="Not set the Data";
 

  return (
    <Card sx={{ maxWidth: 350,minWidth:300 ,bgcolor: "#f5f5f5" } } elevation={0} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#ef5350" }} aria-label="recipe">
             {firstLetter}
          </Avatar>
        }
       
        title={`${personDetails.personDetails.name || emptyData} `}
        subheader={`${personDetails.personDetails.designation || emptyData} `}
      />
     
      <div>
        <Typography variant="body2" color="text.secondary" >
          <div>
            <p className='ml-16 text-black mb-2'>Contact Details :</p>
          </div>
          <div className='ml-16 mb-4'>
          Mobile: {personDetails.personDetails.mobile || emptyData} <br />
        email: {personDetails.personDetails.companyEmail || emptyData} 
          </div>
        
        </Typography>
      
      </div>

    
    </Card>
  );
}








