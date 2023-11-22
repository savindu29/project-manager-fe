import React, {useEffect, useState} from 'react';

import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
import SearchForm from "../create/employeesSearchForm";
import {EmployeeSearchResult} from "../../../apis";
import axios from "axios";
interface EffortEstimator {
    id: number;
    name: string;
    mobile: string;
    companyEmail: string;
    privateEmail: string;
    designation: string;
    specializedField: string;
}
const EffortEstimators = ({projectDetails}: { projectDetails: any }) => {
    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const handleEditClick = () => {
        setEditMode(!editMode);
    };
    const handleSaveClick = () => {
        // Add logic to save the data
        setEditMode(false);
    };


    const [editMode, setEditMode] = useState(false);

    const [effortEstimators, setEffortEstimators] = useState<EmployeeSearchResult[]>([]);
    const handleEffortEstimators = (selectedResultId: number) => {
        console.log('Selected Result ID for Effort Estimator:', selectedResultId);

        // Check if the selected employee is already in the list
        const isAlreadySelected = effortEstimators.some((estimator) => estimator.id === selectedResultId);

        if (!isAlreadySelected) {
            try {
                // Fetch details for the selected employee
                axios.get(`http://localhost:8000/api/v1/responsible-person/${selectedResultId}`)
                    .then((response) => {
                        if (response.data && response.data.code === 200 && response.data.data) {
                            const estimatorData = response.data.data;
                            setEffortEstimators((prevEstimators) => [...prevEstimators, estimatorData]);
                        } else {
                            console.error('Invalid response format:', response);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching responsible person data:', error);
                    });
            } catch (error) {
                console.error('Error fetching responsible person data:', error);
            }
        } else {
            console.log('Employee is already in the list.');
        }
    };
    const handleRemoveEffortEstimator = (estimatorId: number) => {
        // Remove the selected effort estimator from the list
        setEffortEstimators((prevEstimators) => prevEstimators.filter((estimator) => estimator.id !== estimatorId));
    };
    useEffect(() => {
        if (projectDetails) {

            for (const estimator of projectDetails.effortEstimators) {
                handleEffortEstimators(estimator.id);
            }
        }


    }, [projectDetails]);




    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Project Estimators</h2></div>
                    <div className={"w-full flex justify-end mr-12 text-xl "}>
                        {!editMode ?
                            <div className={' border rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '} onClick={handleEditClick}>
                                <GoPencil /> <span className={"text-sm mx-2"}>Update</span>
                            </div>
                            :
                            <div className={'border rounded-full bg-gray-100  px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28'} onClick={handleEditClick}>
                                <IoSaveOutline /> <span className={"text-sm mx-2"}>Save</span>
                            </div>
                        }




                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-3 px-6 mb-6 ">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Project Estimator's Name
                        </label>
                        <div className="mt-2">
                            <SearchForm onAddClick={handleEffortEstimators} disabled={!editMode}/>
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6 mb-6">
                        <p
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Project Estimators
                        </p>
                        <div className="bg-gray-100 px-6 py-4 mt-3 border-2 rounded-2xl">
                            {effortEstimators.length > 0 ? (
                                <ul>
                                    {effortEstimators.map((estimator) => (
                                        <li key={estimator.id}>
                                            {estimator.name} - {estimator.designation}
                                            <button
                                                className="ml-2 text-red-500"
                                                onClick={() => handleRemoveEffortEstimator(estimator.id)}
                                                disabled={!editMode}
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No Project Estimators selected</p>
                            )}
                        </div>
                    </div>
                </div>


            </form>

        </div>
    );
};

export default EffortEstimators;