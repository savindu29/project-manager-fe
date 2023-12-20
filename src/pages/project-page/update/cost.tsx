import React, { useEffect, useState } from 'react';
import { GoPencil } from 'react-icons/go';
import { IoSaveOutline } from 'react-icons/io5';
import axios from 'axios';
import { APP_API_BASE_URL, Cost } from '../../../apis';
import { Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { MdOutlineCancel } from "react-icons/md";
import ConfirmationDialog from "../../../components/update-confirm";
import DropDown from '../../../components/drop-down';
const SpecialDates = ({ projectDetails }: { projectDetails: any }) => {

    const timeUnitData = [
        
        { id: 1, name: 'Man Hours', additionalProp: 'MH' },
        { id: 2, name: 'Man Days', additionalProp: 'MD' },
      ];

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
        setEditMode(true)
    };

    const handleUpdateAndSave = async () => {
        const url = `${APP_API_BASE_URL}/api/v1/cost/update?projectId=${projectDetails.id}`;
        const requestData: Cost = {
            totalEffortMh: costTotalEffort,
            quotedValue: costQuotedValue,
            quotedRate: costQuotingRate,
            amcValue: costAmcValue,
            workUnit : workUnit || '',
            currencyUnit : currencyUnit || 'MD'
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
        setTotalEffort(projectDetails.cost?.totalEffortMh || 0);
        setQuotedValue(projectDetails.cost?.quotedValue || 0);
        setQuotingRate(projectDetails.cost?.quotedRate || 0);
        setAMCValue(projectDetails.cost?.amcValue || 0);
        setWorkUnit(projectDetails.cost?.workUnit || '');
        setCurrencyUnit(projectDetails.cost?.currencyUnit || '');
    };
    const handleSaveClick = () => {
        handleConfirmationDialogOpen();
    };

    const [editMode, setEditMode] = useState(false);
    const [costTotalEffort, setTotalEffort] = useState(projectDetails?.cost?.totalEffortMh || 0);
    const [costQuotedValue, setQuotedValue] = useState(projectDetails?.cost?.quotedValue || 0);
    const [costQuotingRate, setQuotingRate] = useState(projectDetails?.cost?.quotedRate || 0);
    const [costAmcValue, setAMCValue] = useState(projectDetails?.cost?.amcValue || 0);
    const [workUnit, setWorkUnit] = useState('');
    const [currencyUnit, setCurrencyUnit] = useState('');

    useEffect(() => {
        if (projectDetails) {
            setTotalEffort(projectDetails.cost?.totalEffortMh || 0);
            setQuotedValue(projectDetails.cost?.quotedValue || 0);
            setQuotingRate(projectDetails.cost?.quotedRate || 0);
            setAMCValue(projectDetails.cost?.amcValue || 0);
            setWorkUnit(projectDetails.cost?.workUnit || 'MD');
            setCurrencyUnit(projectDetails.cost?.currencyUnit || '');
        }
    }, [projectDetails]);


    
    const handleWorkUnitSelect = (selectedUnit:any)=>{
        
        setWorkUnit(selectedUnit.additionalProp)
    }

    return (
        <div className={ editMode ? 'px-12 py-8 white duration-500' : 'px-12 py-8 bg-zinc-100 duration-500 '}>
            <form >
                <div className={'flex w-full h-12 mb-4'}>
                    <div className={'w-full flex items-center '}>
                        <h2 className="font-semibold text-lg ">Cost</h2>
                    </div>
                    <div className={'w-full flex justify-end mr-12 text-xl '}>
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
                            Total Effort (MD/MH)
                        </label>
                        <div className="mt-2">
                        <DropDown
                                    data={timeUnitData}
                                    dropdownFor="timeUnite"
                                    onSelect={handleWorkUnitSelect}
                                    disabled={!editMode}
                                    />
                        </div>
                    </div>


                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Total Effort (MD/MH)
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="totalEffort"
                                id="totalEffort"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                onChange={(e) => setCurrencyUnit(e.target.value)}
                                value={currencyUnit}
                                disabled={!editMode}
                            />
                        </div>
                    </div>


                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Total Effort (MD/MH)
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="totalEffort"
                                id="totalEffort"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                onChange={(e) => setTotalEffort(Number(e.target.value))}
                                value={costTotalEffort}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Quoted Value
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="totalEffort"
                                id="totalEffort"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                                onChange={(e) => setQuotedValue(Number(e.target.value))}
                                value={costQuotedValue}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Quoting Rate
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="quotedRate"
                                id="quotedRate"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                onChange={(e) => setQuotingRate(Number(e.target.value))}
                                value={costQuotingRate || 0}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            AMC Value
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="amcValue"
                                id="amcValue"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                onChange={(e) => setAMCValue(Number(e.target.value))}
                                value={costAmcValue || 0}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    {/* Confirmation Dialog */}
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
                </div>
            </form>
        </div>
    );
};

export default SpecialDates;