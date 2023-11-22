import React, {useEffect, useState} from 'react';
import DropDown from "../../../components/drop-down";
import axios from "axios";
import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";

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


    const [projectProposalDueDate, setProposalDueDate] = useState(
        projectDetails?.proposalDueDate ? new Date(projectDetails.proposalDueDate) : null
    );
    const [projectProposalSubDate, setProposalSubDate] = useState(
        projectDetails?.proposalSubmittedDate ? new Date(projectDetails.proposalSubmittedDate) : null
    );
    const [projectProposedImpStartDate, setProposedImpStartDate] = useState(
        projectDetails?.piStartDate ? new Date(projectDetails.piStartDate) : null
    );
    const [projectProposedImpEndDate, setProposedImpEndDate] = useState(
        projectDetails?.piEndDate ? new Date(projectDetails.piEndDate) : null
    );
    const [projectActualImpStartDate, setActualImpStartDate] = useState(
        projectDetails?.acStartDate ? new Date(projectDetails.acStartDate) : null
    );
    const [projectActualImpEndDate, setActualImpEndDate] = useState(
        projectDetails?.acEndDate ? new Date(projectDetails.acEndDate) : null
    );
    const [projectImpDueDate, setImpDueDate] = useState(
        projectDetails?.actualImplementationDueDate ? new Date(projectDetails.actualImplementationDueDate) : null
    );
    useEffect(() => {
        if (projectDetails) {
            setProposalDueDate(projectDetails.proposalDueDate ? new Date(projectDetails.proposalDueDate) : null);
            setProposalSubDate(projectDetails.proposalSubmittedDate ? new Date(projectDetails.proposalSubmittedDate) : null);
            setProposedImpStartDate(projectDetails.piStartDate ? new Date(projectDetails.piStartDate) : null);
            setProposedImpEndDate(projectDetails.piEndDate ? new Date(projectDetails.piEndDate) : null);
            setActualImpStartDate(projectDetails.acStartDate ? new Date(projectDetails.acStartDate) : null);
            setActualImpEndDate(projectDetails.acEndDate ? new Date(projectDetails.acEndDate) : null);
            setImpDueDate(projectDetails.actualImplementationDueDate ? new Date(projectDetails.actualImplementationDueDate) : null);

        }


    }, [projectDetails]);




    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Special Dates</h2></div>
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


                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Proposal Due Date Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="proposalDueDate"
                                id="proposalDueDate"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setProposalDueDate(new Date(e.target.value))}
                                value={projectProposalDueDate ? formatDate(projectProposalDueDate) : ''}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Proposal Submitted Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="proposalSubmittedDate"
                                id="proposalSubmittedDate"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setProposalSubDate(new Date(e.target.value))}
                                value={projectProposalSubDate ? formatDate(projectProposalSubDate) : ''}
                                disabled={!editMode}

                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Proposed Implementation Start Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="proposedImplementStartDate"
                                id="proposedImplementStartDate"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setProposedImpStartDate(new Date(e.target.value))}
                                value={projectProposedImpStartDate ? formatDate(projectProposedImpStartDate) : ''}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Proposed Implimentaion End Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="proposedImplementEndDate"
                                id="proposedImplementEndDate"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setProposedImpEndDate(new Date(e.target.value))}
                                value={projectProposedImpStartDate ? formatDate(projectProposedImpStartDate) : ''}
                                disabled={!editMode}

                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Actual Implementaion Start Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="actualImplementationStartDate"
                                id="actualImplementationStartDate"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setActualImpStartDate(new Date(e.target.value))}
                                value={projectActualImpStartDate ? formatDate(projectActualImpStartDate) : ''}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Implimentaion Due Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="actualImplementationDueDate"
                                id="actualImplementationDueDate"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setImpDueDate(new Date(e.target.value))}
                                value={projectImpDueDate ? formatDate(projectImpDueDate) : ''}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Actual Implimentaion End Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="actualImplementationEndDate"
                                id="actualImplementationEndDate"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setActualImpEndDate(new Date(e.target.value))}
                                value={projectActualImpEndDate ? formatDate(projectActualImpEndDate) : ''}
                                disabled={!editMode}
                            />
                        </div>
                    </div>

                </div>


            </form>

        </div>
    );
};

export default SpecialDates;