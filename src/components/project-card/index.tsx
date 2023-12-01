import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PositionedSnackbar from '../snack-bar';
import { GoProjectRoadmap } from 'react-icons/go';


const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options as any);
};

const ProjectCard = ({ cardDetails, onCardClick }: any) => {
 
  const handleCardClick = () => {
    onCardClick(cardDetails);
    
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
    <div className={`text-gray-700 h-auto mb-5 shadow-lg ${backgroundClass} duration-200  cursor-pointer transition duration-300 ease-in-out transform hover:scale-105`} onClick={handleCardClick}>
      <div className='flex items-center'>
      
      <h1 className="text-sm  font-semibold">
        {cardDetails.projectName} 
      </h1>
      
      </div>
      
      <span className="text-xs">{cardDetails.code}</span>
      

      <div className="flex w-full text-xs mt-2">
        <div className="w-full text-left">Priority: {cardDetails.priority}</div>
        <div className="w-full text-right">Stage: {cardDetails.currentStatus}</div>
      </div>
      <p className="text-sm mt-2">{cardDetails.todo}</p>
      <h1 className="mt-2 text-sm">Last Status Date:  {formatDate(cardDetails.latestStatusHistoryDate)} </h1>

      {/* <PositionedSnackbar open={snackbarOpen} onClose={handleSnackbarClose} message={"Loading the Project"} /> */}
    </div>
  );
};

export default ProjectCard;
