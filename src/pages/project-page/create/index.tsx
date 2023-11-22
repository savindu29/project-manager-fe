import React from 'react';
import MiniDrawer from '../../../layout';
import CreateProject from './create-project';
import { Link } from 'react-router-dom';

const AddProject = () => {
  return (
    <div>
      <div className='flex'>
        <MiniDrawer/>
        <div className='px-12 py-2  w-full '>
                    <div className=' justify-end fixed z-10 shadow right-8'>
                    <Link to="/projects">

                    <div className="bg-sky-400 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer">


                    Go Back
                    </div>
                </Link>
                    </div>
        <CreateProject/>
        </div>
        
      </div>
    </div>
  );
};

export default AddProject;
