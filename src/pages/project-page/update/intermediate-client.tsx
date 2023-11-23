import React, {useEffect, useMemo, useState} from 'react';
import {GoPencil} from "react-icons/go";
import {IoSaveOutline} from "react-icons/io5";
import Select from "react-select";
import countryList from "react-select-country-list";
import {APP_API_BASE_URL, GrantClient, IntermediateClient} from "../../../apis";
import axios from "axios";
import {MdOutlineCancel} from "react-icons/md";
import ConfirmationDialog from "../../../components/update-confirm";
import {Alert, Snackbar} from "@mui/material";

interface Country {
    label: string;
    value: string;
}

const IntermediateClienet = ({projectDetails}: { projectDetails: any }) => {

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
        const url = `${APP_API_BASE_URL}/api/v1/intermediateClient/update?projectId=${projectDetails.id}`;
        if( intermediantClientName ===null ){

            handleOpenSnackbar('error', 'Please enter Intermediate ClientName.');
            return;
        }

        const requestData: IntermediateClient = {
            name: intermediantClientName, // Provide a client name
            country: intermediantClientCountry?.label, // Provide a client country
            externalContactPerson: {
                name: intermediantClientContactName, // Provide a contact name
                mobile: intermediantClientContactEmail, // Provide a contact mobile
                fixTel: intermediantClientContactFixTelNumber, // Provide a contact fixTel
                companyEmail: intermediantClientContactMobileNumber, // Provide a contact email
                designation: intermediantClientContactDesignation, // Provide a contact designation
                description: intermediantClientContactDescription, // Provide a contact description
            },
        };

        try {
            const resp = await axios.put(url, requestData);
            setEditMode(false);
            handleOpenSnackbar('success', 'Successfully updated!');
            window.location.reload();
        } catch (error) {
            handleOpenSnackbar('error', 'Failed to update. Please try again.');
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        // Restore previous values
        setIntermidiantClientName(projectDetails.intermediateClient?.name || null);
        setIntermidiantCurrentClientCountry(projectDetails.intermediateClient?.country || '');
        setIntermidiantClientCountry(projectDetails.intermediateClient?.country || '');

        setIntermidiantClientContactName(projectDetails.intermediateClient?.externalContactPerson?.name || '');
        setIntermidiantClientContactEmail(projectDetails.intermediateClient?.externalContactPerson?.companyEmail || '');
        setIntermidiantClientContactMobileNumber(projectDetails.intermediateClient?.externalContactPerson?.mobile || '');
        setIntermidiantClientContactFixTelNumber(projectDetails.intermediateClient?.externalContactPerson?.fixTel || '');
        setIntermidiantClientContactDesignation(projectDetails.intermediateClient?.externalContactPerson?.designation || '');
        setIntermidiantClientDescription(projectDetails.intermediateClient?.externalContactPerson?.description || '');

    };
    const handleSaveClick = () => {
        handleConfirmationDialogOpen();
    };

    const options = useMemo(() => countryList().getData(), []);


    const [editMode, setEditMode] = useState(false);
    const [intermediantClientName, setIntermidiantClientName] = useState(projectDetails?.intermediateClient?.name || null);
    const [intermediantClientCountry, setIntermidiantClientCountry] = useState<Country | null>(null);
    const [intermediantCurrentClientCountry, setIntermidiantCurrentClientCountry] = useState(projectDetails?.intermediateClient?.country || '');
    const [intermediantClientContactName, setIntermidiantClientContactName] = useState(projectDetails?.intermediateClient?.externalContactPerson?.name || '');
    const [intermediantClientContactEmail, setIntermidiantClientContactEmail] = useState(projectDetails?.intermediateClient?.externalContactPerson?.companyEmail || '');
    const [intermediantClientContactMobileNumber, setIntermidiantClientContactMobileNumber] = useState(projectDetails?.intermediateClient?.externalContactPerson?.mobile || '');
    const [intermediantClientContactFixTelNumber, setIntermidiantClientContactFixTelNumber] = useState(projectDetails?.intermediateClient?.externalContactPerson?.fixTel || '');
    const [intermediantClientContactDesignation, setIntermidiantClientContactDesignation] = useState(projectDetails?.intermediateClient?.externalContactPerson?.designation || '');
    const [intermediantClientContactDescription, setIntermidiantClientDescription] = useState(projectDetails?.intermediateClient?.externalContactPerson?.description || '');


    useEffect(() => {
        if (projectDetails) {
            setIntermidiantClientName(projectDetails.intermediateClient?.name || null);
            setIntermidiantCurrentClientCountry(projectDetails.intermediateClient?.country || '');
            setIntermidiantClientCountry(projectDetails.intermediateClient?.country || '');

            setIntermidiantClientContactName(projectDetails.intermediateClient?.externalContactPerson?.name || '');
            setIntermidiantClientContactEmail(projectDetails.intermediateClient?.externalContactPerson?.companyEmail || '');
            setIntermidiantClientContactMobileNumber(projectDetails.intermediateClient?.externalContactPerson?.mobile || '');
            setIntermidiantClientContactFixTelNumber(projectDetails.intermediateClient?.externalContactPerson?.fixTel || '');
            setIntermidiantClientContactDesignation(projectDetails.intermediateClient?.externalContactPerson?.designation || '');
            setIntermidiantClientDescription(projectDetails.intermediateClient?.externalContactPerson?.description || '');


        }


    }, [projectDetails]);


    const changeIntermediateCountryHandler = (selectedOption: Country | null) => {
        setIntermidiantClientCountry(selectedOption);
        // setIntermidiantClientCountry(selectedOption?.value || "");
    }



    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Intermediary client Details</h2></div>
                    <div className={"w-full flex justify-end mr-12 text-xl "}>
                        {!editMode ?
                            <div className={' border rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '} onClick={handleEditClick}>
                                <GoPencil /> <span className={"text-sm mx-2"}>Update</span>
                            </div>
                            :
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
                        }




                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">






                        <div className="sm:col-span-3 px-6">
                            <label
                                htmlFor=""
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Intermediary Client Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="intermediaryClientName"
                                    id="intermediaryClientName"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                    onChange={(e) => setIntermidiantClientName(e.target.value)}
                                    value={intermediantClientName}
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 px-6">
                            <p className="-mt-6">Current Selected Country
                                : {intermediantCurrentClientCountry ?? "No country Selected"}
                            </p>
                            <label
                                htmlFor=""
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Update Ciuntry With
                            </label>
                            <div className="mt-2">
                                <Select
                                    options={options}
                                    value={intermediantClientCountry}
                                    onChange={changeIntermediateCountryHandler}
                                    isDisabled={!editMode}

                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 px-6">
                            <label
                                htmlFor=""
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Intermediary Contact Person Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="intermediaryClientContactName"
                                    id="intermediaryClientContactName"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                    onChange={(e) => setIntermidiantClientContactName(e.target.value)}
                                    value={intermediantClientContactName}
                                    disabled={!editMode}
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 px-6">
                            <label
                                htmlFor=""
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Intermediary Person's Email
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="intermediaryClientContactEmail"
                                    id="intermediaryClientContactEmail"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                    onChange={(e) => setIntermidiantClientContactEmail(e.target.value)}
                                    value={intermediantClientContactEmail}
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 px-6">
                            <label
                                htmlFor=""
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Mobile Number
                            </label>
                            <div className="mt-2">
                                <input
                                    name="intermediaryClientContactMobile"
                                    id="intermediaryClientContactMobile"
                                    type="tel"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                    onChange={(e) => setIntermidiantClientContactMobileNumber(e.target.value)}
                                    value={intermediantClientContactMobileNumber}
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 px-6">
                            <label
                                htmlFor=""
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Fix Telephone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="tel"
                                    name="intermediaryClientContactFix"
                                    id="intermediaryClientContactFix"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                    onChange={(e) => setIntermidiantClientContactFixTelNumber(e.target.value)}
                                    value={intermediantClientContactFixTelNumber}
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 px-6">
                            <label
                                htmlFor=""
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Designation
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="intermediaryClientContactDesignation"
                                    id="intermediaryClientContactDesignation"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                    onChange={(e) => setIntermidiantClientContactDesignation(e.target.value)}
                                    value={intermediantClientContactDesignation}
                                    disabled={!editMode}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 px-6">
                            <label
                                htmlFor=""
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="intermediaryClientContactDescription"
                                    id="intermediaryClientContactDescription"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                    onChange={(e) => setIntermidiantClientDescription(e.target.value)}
                                    value={intermediantClientContactDescription}
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

export default IntermediateClienet;