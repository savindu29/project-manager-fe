import React, {useEffect, useMemo, useState} from 'react';
import {GoPencil} from "react-icons/go";
import {IoSaveOutline} from "react-icons/io5";
import Select from "react-select";
import countryList from "react-select-country-list";
import { updateIntermediateClient } from '../../../apis/project-api';

interface Country {
    label: string;
    value: string;
}

const GrantClient = ({projectDetails}: { projectDetails: any }) => {
    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const handleEditClick = () => {
    
        const updatedData = {
          name: clientName,
          country: clientCountry?.value || null,
          externalContactPerson: {
            name: clientContactPersonName,
            mobile: clientContactMobileNumber,
            fixTel: clientContactFixTelNumber,
            companyEmail: clientContactEmail,
            designation: clientContactDesignation,
            description: clientContactDescription,
          },
        };
    
        // Make the API call
        updateIntermediateClient(1, updatedData)
          .then((data: any) => {
            console.log('Update successful:', data);
            setEditMode(!editMode); 
          })
          .catch(error => {
            console.error('Error updating data:', error);
          });
      };
  
    const options = useMemo(() => countryList().getData(), []);


    const [editMode, setEditMode] = useState(false);
    const [clientName, setClientName] = useState(projectDetails?.grantClient?.name || '');
    const [clientCountry, setClientCountry] = useState<Country | null>(null);
    const [clientCurrentCountry, setClientCurrentCountry] = useState(projectDetails?.grantClient?.country || '');
    const [clientContactPersonName, setContactPersonName] = useState(projectDetails?.grantClient?.externalContactPerson?.name || '');
    const [clientContactEmail, setClientContactEmail] = useState(projectDetails?.grantClient?.externalContactPerson?.companyEmail || '');
    const [clientContactMobileNumber, setClientContactMobileNumber] = useState(projectDetails?.grantClient?.externalContactPerson?.mobile || '');
    const [clientContactFixTelNumber, setClientContactFixTelNumber] = useState(projectDetails?.grantClient?.externalContactPerson?.fixTel || '');
    const [clientContactDesignation, setClientContactDesignation] = useState(projectDetails?.grantClient?.externalContactPerson?.designation || '');
    const [clientContactDescription, setClientContactDescription] = useState(projectDetails?.grantClient?.externalContactPerson?.description || '');


    useEffect(() => {
        if (projectDetails) {
            // Grant Client Details
            setClientName(projectDetails.grantClient?.name || '');
            setClientCurrentCountry(projectDetails.grantClient?.country || '');
            setClientCountry(projectDetails.grantClient?.country || '');
            setContactPersonName(projectDetails.grantClient?.externalContactPerson?.name || '');
            setClientContactEmail(projectDetails.grantClient?.externalContactPerson?.companyEmail || '');
            setClientContactMobileNumber(projectDetails.grantClient?.externalContactPerson?.mobile || '');
            setClientContactFixTelNumber(projectDetails.grantClient?.externalContactPerson?.fixTel || '');
            setClientContactDesignation(projectDetails.grantClient?.externalContactPerson?.designation || '');
            setClientContactDescription(projectDetails.grantClient?.externalContactPerson?.description || '');

        }


    }, [projectDetails]);

    const changeClientCountryHandler = (selectedOption: Country | null) => {
        setClientCountry(selectedOption);

        // setClientCountry(selectedOption?.value || null);
    }


    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Client Details</h2></div>
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
                            Client Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="grantClientName"
                                id="grantClientName"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setClientName(e.target.value)}
                                value={clientName}
                                required
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <p className="-mt-6">Current Selected Country : {clientCurrentCountry} </p>
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Update Country With
                        </label>

                        <div className="mt-2">
                            <Select
                                options={options}
                                value={clientCountry}
                                onChange={changeClientCountryHandler}

                                isDisabled={!editMode}

                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Contact Person Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="grantClientContactName"
                                id="grantClientContactName"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setContactPersonName(e.target.value)}
                                value={clientContactPersonName}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 px-6">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="grantClientContactEmail"
                                id="grantClientContactEmail"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setClientContactEmail(e.target.value)}
                                value={clientContactEmail}
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
                                type="tel"
                                name="grantClientContactMobile"
                                id="grantClientContactMobile"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setClientContactMobileNumber(e.target.value)}
                                value={clientContactMobileNumber}
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
                                name="grantClientContactFix"
                                id="grantClientContactFix"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setClientContactFixTelNumber(e.target.value)}
                                value={clientContactFixTelNumber}
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
                                name="grantClientContactMobile"
                                id="grantClientContactMobile"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setClientContactDesignation(e.target.value)}
                                value={clientContactDesignation}
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
                                name="grantClientContactDescription"
                                id="grantClientContactDescription"
                                className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                                onChange={(e) => setClientContactDescription(e.target.value)}
                                value={clientContactDescription}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

};

export default GrantClient;