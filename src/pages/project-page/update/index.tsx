import React from 'react';
import MiniDrawer from '../../../layout';

import { Link } from 'react-router-dom';
import UpdateProjectForm from './update-form';

const UpdateProject = () => {
  return (
    <div>
      <div className='flex'>
        <MiniDrawer/>
        <div className='px-12 py-2  w-full '>
                    <div className=' justify-end fixed z-10 shadow right-8'>
                    <Link to="/employees">
                    <div className="bg-sky-400 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer">
                    Go Back
                    </div>
                </Link>
                    </div>
        <UpdateProjectForm/>
        </div>
        
      </div>
    </div>
  );
};

export default UpdateProject;
