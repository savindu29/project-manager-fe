import React, {useEffect, useState} from 'react';

import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
import SearchForm from "../create/employeesSearchForm";
import {APP_API_BASE_URL, EmployeeSearchResult} from "../../../apis";
import axios from "axios";

const SpecialDates = ({projectDetails}: { projectDetails: any }) => {
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
    const handleProjectLeadsAdd = async (selectedResultId: number) => {

        console.log('Selected Result ID in ParentComponent:', selectedResultId);

        try {
            const response = await axios.get(`${APP_API_BASE_URL}/api/v1/responsible-person/${selectedResultId}`);

            if (response.data && response.data.code === 200 && response.data.data) {
                const responsiblePersonData = response.data.data;
                setProjectLead(responsiblePersonData);
                setSelectedProjectLead(selectedResultId);
                console.log(responsiblePersonData)
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching responsible person data:', error);
        }
    };
    const handleRemoveClick = () => {
        // Ask the user for confirmation (you can use a modal or any other UI pattern)
        const isConfirmed = window.confirm('Are you sure you want to remove the selected project lead?');

        if (isConfirmed) {
            setProjectLead(null); // Clear the selected project lead
            setSelectedProjectLead(-1)
        }
    };
    const [selectedProjectLead, setSelectedProjectLead] = useState(
        projectDetails?.projectLead?.id || -1
    );


    useEffect(() => {
        if (projectDetails) {
            handleProjectLeadsAdd(projectDetails.projectLead?.id);

        }


    }, [projectDetails]);

    const [projectLead, setProjectLead] = useState<EmployeeSearchResult | null>(null);



    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Inova Project Lead</h2></div>
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
                    <div className="sm:col-span-3 px-6 mb-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Project Lead's Name
                        </label>
                        <div className="mt-2">
                            <SearchForm onAddClick={handleProjectLeadsAdd} disabled={!editMode} />

                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6 mb-6">
                        <p

                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Selected Project Lead
                        </p>
                        <div className="bg-gray-100 px-6 py-4 mt-3 border-2 rounded-2xl">
                            {projectLead ? (
                                <div>
                                    <p className="mb-1.5">Name: {projectLead.name}</p>
                                    <p className="mb-1.5">Mobile: {projectLead.mobile}</p>
                                    <p className="mb-1.5">Email: {projectLead.companyEmail}</p>
                                    <p className="mb-1.5">Designation: {projectLead.designation}</p>
                                    <p className="mb-1.5">Specialized Field: {projectLead.specializedField}</p>
                                    <div className="flex w-full justify-end text-sm">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                                            onClick={handleRemoveClick}
                                            disabled={!editMode}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>No Project Lead selected</p>
                            )}
                        </div>

                    </div>
                </div>


            </form>

        </div>
    );
};

export default SpecialDates;