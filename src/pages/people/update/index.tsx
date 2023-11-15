import React from 'react';
import MiniDrawer from '../../../layout';
import { Link } from 'react-router-dom';
import EmployeeUpdateForm from "./update-employee";

const UpdatePeoplePage = () => {
    return (
        <div>
            <div className='flex'>
                <MiniDrawer/>
                <div className='py-12 pt-4  w-full h-screen overflow-hidden'>
                    <div className='justify-end fixed z-10 shadow right-8'>
                    <Link to="/employees/new">
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
