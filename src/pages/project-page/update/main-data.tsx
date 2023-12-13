import React, {useEffect, useState} from 'react';
import DropDown from "../../../components/drop-down";
import axios from "axios";
import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
import { APP_API_BASE_URL, ProjectUpdateType } from '../../../apis';
import { MdOutlineCancel } from 'react-icons/md';
import ConfirmationDialog from '../../../components/update-confirm';
import { Alert, Snackbar } from '@mui/material';

const MainData = ({projectDetails}: { projectDetails: any }) => {

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

    


    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    const [projectStatusData, setProjectStatusData] = useState([]);
    const [projectPriorityData, setProjectPriorityData] = useState([]);
    const [selectedProjectStatus, setSelectedProjectStatus] = useState("");
    const [selectedProjectPriority, setSelectedProjectPriority] = useState("");
    

    useEffect(() => {
        // Fetch project status data
        axios
            .get(`${APP_API_BASE_URL}/api/v1/project-status/list`)
            .then((response) => setProjectStatusData(response.data.data))
            .catch((error) =>
                console.error("Error fetching project status data:", error)
            );

        axios
            .get(`${APP_API_BASE_URL}/api/v1/priority/list`)
            .then((response) => setProjectPriorityData(response.data.data))
            .catch((error) =>
                console.error("Error fetching project proiority data:", error)
            );
    }, []);
    const [projectPriority, setProjectPriority] = useState(projectDetails?.priority?.id || -1);
    const [projectStatus, setProjectStatus] = useState(projectDetails?.projectStatus?.id || -1);

    const [editMode, setEditMode] = useState(false);
    const handleProjectPrioritySelect = (selectedPriority: any) => {
        setProjectPriority(selectedPriority.id);
        console.log(selectedPriority.id)
    };
    const handleProjectStatusSelect = (selectedStatus: any) => {
        setProjectStatus(selectedStatus.id);
    };

    const [projectName, setProjectName] = useState(projectDetails?.name || '');
    const [projectinitiationDate, setProjectInitiationDate] = useState(
        projectDetails?.initiationDate ? new Date(projectDetails.initiationDate) : new Date()
    )


    useEffect(() => {
        if (projectDetails) {
            setProjectName(projectDetails.name || '');
            setProjectInitiationDate(projectDetails.initiationDate ? new Date(projectDetails.initiationDate) : new Date());
            setProjectPriority(projectDetails.priority?.id || -1);

            setProjectStatus(projectDetails.projectStatus?.id || -1);


            setSelectedProjectStatus(projectDetails.projectStatus?.name || "")

        }


    }, [projectDetails]);




    const handleUpdateAndSave = async () => {
        const url = `${APP_API_BASE_URL}/api/v1/project/update?projectId=${projectDetails.id}`;
        const effortEstimatorIds = projectDetails.effortEstimators.map((estimator: { id: number; }) => estimator.id);
        const requestData:ProjectUpdateType  = {
            projectStatus: projectStatus,
            priority:projectPriority,
            initiationDate: projectinitiationDate,
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
            clarificationDiscussionDetails : projectDetails.cdDetails || ''
        };

        try {
            const resp = await axios.put(url, requestData);
            setEditMode(false);
            setSelectedProjectStatus(projectStatus)
            setSelectedProjectPriority(projectPriority)
            handleOpenSnackbar('success', 'Successfully updated!');
        } catch (error) {
            handleOpenSnackbar('error', 'Failed to update. Please try again.');
        }
    };












    const handleCancel = () => {
        setEditMode(false);
        // Restore previous values
        setProjectInitiationDate(projectDetails.initiationDate ? new Date(projectDetails.initiationDate) : new Date());
        setProjectStatus(projectDetails.projectStatus?.id || -1);
        setProjectPriority(projectDetails.priority?.id || -1)

       
    };

    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Project Details</h2></div>
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
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Project Name
                        </label>
                        <div className="mt-2">
                            <input
                                disabled
                                type="text"
                                name="projectName"
                                id="projectName"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setProjectName(e.target.value)}
                                value={projectName}
                                required
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Initiation Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="InitiationDate"
                                id="InitiationDate"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setProjectInitiationDate(new Date(e.target.value))}
                                value={projectinitiationDate ? formatDate(projectinitiationDate) : ''}
                                disabled={!editMode}
                            />

                        </div>
                    </div>


                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Project Priority {!editMode ? <span> : {selectedProjectPriority}</span>:<span></span>}
                        </label>
                        <div className="mt-2">
                            <DropDown
                                data={projectPriorityData}
                                dropdownFor="priority"
                                onSelect={handleProjectPrioritySelect}
                                defaultSelectedId={projectDetails?.priority?.id}
                                disabled={!editMode}

                            />
                        </div>
                    </div>


                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Project Status {!editMode ? <span> : {selectedProjectStatus}</span>:<span></span>}
                        </label>
                        <div className="mt-2">
                            <DropDown
                                data={projectStatusData}
                                dropdownFor="status"
                                onSelect={handleProjectStatusSelect}
                                defaultSelectedId={projectDetails?.projectStatus?.id}
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



                    <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>

            </form>

        </div>
    );
};

export default MainData;