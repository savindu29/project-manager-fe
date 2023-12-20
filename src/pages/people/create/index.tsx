import React from 'react';
import MiniDrawer from '../../../layout';
import EmployeeCreateForm from './add-employees';
import { Link } from 'react-router-dom';

const PeoplePage = () => {
  return (
    <div>
      <div className='flex'>
        <MiniDrawer/>
        <div className='px-20 py-12  w-full'>
                    <div className='w-full flex justify-end'>
                    <Link to="/employees">
                    <div className="bg-black  text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer">
                    Go Back
                    </div>
                </Link>
                    </div>
        <EmployeeCreateForm/>
        </div>
        
      </div>
    </div>
  );
};

export default PeoplePage;
