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
            <Link to={"/employees/update"}
            className='border-2 rounded-lg px-4 py-2 bg-sky-500  hover:bg-sky-600 duration-300 text-white'
             >
                Update Employee
            </Link>

            </div>
        <EmployeeCreateForm/>
        </div>
        
      </div>
    </div>
  );
};

export default PeoplePage;
