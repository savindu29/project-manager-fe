import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PositionedSnackbar from '../snack-bar';

const ProjectCard = ({ cardDetails, onCardClick }: any) => {
 
  const handleCardClick = () => {
    onCardClick(cardDetails);
    setSnackbarOpen(true);
  };
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  let backgroundClass = 'w-80 p-4 mx-5 my-3 rounded-xl';

  if (cardDetails.priority === 'High') {
    backgroundClass += ' bg-rose-200';
  } else if (cardDetails.priority === 'Low') {
    backgroundClass += ' bg-green-200';
  } else if (cardDetails.priority === 'Medium') {
    backgroundClass += ' bg-sky-200';
  }

  return (
    <div className={`text-gray-700 h-auto ${backgroundClass} duration-200 hover:bg-zinc-200 cursor-pointer`} onClick={handleCardClick}>
      <h1 className="text-sm font-medium">
        {cardDetails.projectName} : <span className="text-xs">{cardDetails.code}</span>
      </h1>

      <div className="flex w-full text-xs mt-2">
        <div className="w-full text-left">Priority: {cardDetails.priority}</div>
        <div className="w-full text-right">Stage: {cardDetails.currentStatus}</div>
      </div>
      <p className="text-sm mt-2">{cardDetails.todo}</p>
      <h1 className="mt-2 text-sm">Last Status Date: {cardDetails.latestStatusHistoryDate} </h1>

      <PositionedSnackbar open={snackbarOpen} onClose={handleSnackbarClose} message={"Loading the Project..."} />
    </div>
  );
};

export default ProjectCard;
