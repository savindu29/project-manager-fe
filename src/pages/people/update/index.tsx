import React from 'react';
import MiniDrawer from '../../../layout';
import { Link } from 'react-router-dom';
import EmployeeUpdateForm from "./update-employee";

const UpdatePeoplePage = () => {
    return (
        <div>
            <div className='flex'>
                <MiniDrawer/>
                <div className='px-20 py-12  w-full'>
                    <div className='w-full flex justify-end'>
                    <Link to="/projects/add-new">
                    <div className="bg-sky-400 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer">
                    Add new Employee
                    </div>
                </Link>
                    </div>
                    <EmployeeUpdateForm/>
                </div>

            </div>
        </div>
    );
};

export default UpdatePeoplePage;
