

import axios from 'axios';
import React, {useEffect, useState} from 'react';

import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
<<<<<<< HEAD
import { updateClarificationDiscussionDetails } from '../../../apis/project-api';
=======
import { APP_API_BASE_URL, EmployeeSearchResult, ProjectUpdateType } from '../../../apis';
import { MdOutlineCancel } from 'react-icons/md';
import ConfirmationDialog from '../../../components/update-confirm';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
>>>>>>> origin/main

const ClarificationDiscussionDetails = ({projectDetails}: { projectDetails: any }) => {
    
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
<<<<<<< HEAD
    const handleSaveClick = async () => {
        try {
            await updateClarificationDiscussionDetails(
                projectDetails?.id,
                projectClarificationDiscussDetails || ''
            );
            setEditMode(false);
    
        } catch (error) {
            console.error('Error updating clarificationDiscussionDetails:', error);
    
            // Log the response content if available
            if (axios.isAxiosError(error)) {
                console.error('Response:', error.response?.data);
            }
        }
=======
    const handleSaveClick = () => {
        handleConfirmationDialogOpen();
>>>>>>> origin/main
    };
    
    const [editMode, setEditMode] = useState(false);
    const [projectClarificationDiscussDetails, setClarificationDiscussDetails] = useState(
        projectDetails?.cdDetails || ''
    );
    // const [effortEstimators, setEffortEstimators] = useState<EmployeeSearchResult[]>([]);

    const handleUpdateAndSave = async () => {
        const url = `${APP_API_BASE_URL}/api/v1/project/update?projectId=${projectDetails.id}`;
        const effortEstimatorIds = projectDetails.effortEstimators.map((estimator: { id: number; }) => estimator.id);

        const requestData:ProjectUpdateType  = {
            projectStatus: projectDetails?.projectStatus?.id || -1,
            initiationDate: new Date(projectDetails.initiationDate),
            proposalDueDate: projectDetails.proposalDueDate ? new Date(projectDetails.proposalDueDate) : null,
            proposalSubmittedDate: projectDetails.proposalSubmittedDate ? new Date(projectDetails.proposalSubmittedDate) : null,
            proposedImplementStartDate: projectDetails.piStartDate ? new Date(projectDetails.piStartDate) : null,
            proposedImplementEndDate: projectDetails.piEndDate ? new Date(projectDetails.piEndDate) : null,
            actualImplementationStartDate: projectDetails.acStartDate ? new Date(projectDetails.acStartDate) : null,
            actualImplementationEndDate: projectDetails.acEndDate ? new Date(projectDetails.acEndDate) : null,
            actualImplementationDueDate: projectDetails.actualImplementationDueDate ? new Date(projectDetails.actualImplementationDueDate) : null,
            lessonsLearned: projectDetails.lessonsLearned || '',
            
            effortEstimators: effortEstimatorIds,
            projectLead: projectDetails.projectLead?.id,
            clarificationDiscussionDetails : projectClarificationDiscussDetails
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
        setClarificationDiscussDetails(projectDetails.cdDetails || '');
       
    };
    useEffect(() => {
        if (projectDetails) {
            setClarificationDiscussDetails(projectDetails.cdDetails || '');
            // console.log(projectDetails.effortEstimators)

        }


    }, [projectDetails]);




    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Clarification Discussion Details</h2></div>
                    <div className={"w-full flex justify-end mr-12 text-xl "}>
                    {!editMode ? (
                            <div
                                className={' border  rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '}
                                onClick={handleEditClick}
                            >
                                <GoPencil /> <span className={'text-sm mx-2'}>Update</span>
                            </div>
<<<<<<< HEAD
                            :
                            <div className={'border rounded-full bg-gray-100 px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28'} onClick={handleSaveClick}>
                            <IoSaveOutline /> <span className={"text-sm mx-2"}>Save</span>
                        </div>
                        
                        }
=======
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
>>>>>>> origin/main




                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-6 mb-6">


                        <div className="mt-2">
                  <textarea
                      name="clarificationDiscussionDetails"
                      id="clarificationDiscussionDetails"
                      rows={5}
                      className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                      defaultValue={""}
                      onChange={(e) => setClarificationDiscussDetails(e.target.value)}
                      value={projectClarificationDiscussDetails}
                      disabled={!editMode}
                  />
                        </div>
                    </div>
                </div>
                <ConfirmationDialog
                        open={openConfirmationDialog}
                        onClose={handleConfirmationDialogClose}
                        onConfirm={handleUpdateAndSave}
                    />



                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

            </form>

        </div>
    );
};

export default ClarificationDiscussionDetails;