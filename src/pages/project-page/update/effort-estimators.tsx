import React, {useEffect, useState} from 'react';

import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
import SearchForm from "../create/employeesSearchForm";
import {APP_API_BASE_URL, EmployeeSearchResult, ProjectUpdateType} from "../../../apis";
import axios from "axios";
import ConfirmationDialog from '../../../components/update-confirm';
import { Alert, Snackbar } from '@mui/material';
import { MdOutlineCancel } from 'react-icons/md';
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleOpenSnackbar = (severity: 'success' | 'error', message: string) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    const handleConfirmationDialogOpen = () => {
        setOpenConfirmationDialog(true);
    };

    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false);
    };


    const handleEditClick = () => {
        setEditMode(!editMode);
    };
    const handleSaveClick = () => {
        handleConfirmationDialogOpen();
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
                axios.get(`${APP_API_BASE_URL}/api/v1/responsible-person/${selectedResultId}`)
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
            
            handleOpenSnackbar('error', 'Employee is already in the list.');
        }
    };
    const handleRemoveEffortEstimator = (estimatorId: number) => {
        // Remove the selected effort estimator from the list
        setEffortEstimators((prevEstimators) => prevEstimators.filter((estimator) => estimator.id !== estimatorId));
        handleOpenSnackbar('success', 'Employee removed');
    };
    useEffect(() => {
        if (projectDetails) {
            
            for (const estimator of projectDetails.effortEstimators) {
                handleEffortEstimators(estimator.id);
            }
        }


    }, [projectDetails]);



    const handleUpdateAndSave = async () => {
        const url = `${APP_API_BASE_URL}/api/v1/project/update?projectId=${projectDetails.id}`;
        
        const requestData:ProjectUpdateType  = {
            projectStatus: projectDetails?.projectStatus?.id || -1,
            priority: projectDetails?.priority?.id || -1,
            initiationDate: new Date(projectDetails.initiationDate),
            proposalDueDate: projectDetails.proposalDueDate ? new Date(projectDetails.proposalDueDate) : null,
            proposalSubmittedDate: projectDetails.proposalSubmittedDate ? new Date(projectDetails.proposalSubmittedDate) : null,
            proposedImplementStartDate: projectDetails.piStartDate ? new Date(projectDetails.piStartDate) : null,
            proposedImplementEndDate: projectDetails.piEndDate ? new Date(projectDetails.piEndDate) : null,
            actualImplementationStartDate: projectDetails.acStartDate ? new Date(projectDetails.acStartDate) : null,
            actualImplementationEndDate: projectDetails.acEndDate ? new Date(projectDetails.acEndDate) : null,
            actualImplementationDueDate: projectDetails.actualImplementationDueDate ? new Date(projectDetails.actualImplementationDueDate) : null,
            lessonsLearned: projectDetails.lessonsLearned || '',
            
            effortEstimators: effortEstimators.map((estimator) => estimator.id),
            projectLead: projectDetails.projectLead?.id,
            clarificationDiscussionDetails : projectDetails.cdDetails || '',
        };

        try {
            const resp = await axios.put(url, requestData);
            setEditMode(false);
            handleOpenSnackbar('success', 'Successfully updated!');
        } catch (error) {
            handleOpenSnackbar('error', 'Failed to update. Please try again.');
        }
    };




    const handleCancel = () => {
        setEditMode(false);
        
        // Restore previous values
        if (projectDetails) {
            setEffortEstimators(projectDetails.effortEstimators.map((estimator: EffortEstimator) => ({ ...estimator })));
          }
       
    };

    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Project Estimators</h2></div>
                    <div className={"w-full flex justify-end mr-12 text-xl "}>
                    {!editMode ? (
                            <div
                                className={' border  rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '}
                                onClick={handleEditClick}
                            >
                                <GoPencil /> <span className={'text-sm mx-2'}>Update</span>
                            </div>
                        ) : (
                        <div className={"flex"}>
                            <div
                                className={
                                    'border rounded-full bg-gray-100 mr-6 px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28'
                                }
                                onClick={handleSaveClick}
                            >
                                <IoSaveOutline /> <span className={'text-sm mx-2'}>Save</span>
                            </div>
                            <div
                                className={
                                    'border rounded-full bg-gray-100  px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28'
                                }
                                onClick={handleCancel}
                            >
                                <MdOutlineCancel /> <span className={'text-sm mx-2'}>Cancel</span>
                            </div>
                        </div>

                        )}



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

                <ConfirmationDialog
                        open={openConfirmationDialog}
                        onClose={handleConfirmationDialogClose}
                        onConfirm={handleUpdateAndSave}
                    />



                    <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
            </form>

        </div>
    );
};

export default EffortEstimators;