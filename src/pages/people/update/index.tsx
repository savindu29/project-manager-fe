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
                        <Link to={"/employees"}
                              className='border-2 rounded-lg px-4 py-2 bg-sky-500  hover:bg-sky-600 duration-300 text-white'
                        >
                            Go Back
                        </Link>

                    </div>
                    <EmployeeUpdateForm/>
                </div>

            </div>
        </div>
    );
};

export default UpdatePeoplePage;
