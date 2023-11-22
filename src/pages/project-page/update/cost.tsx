import React, {useEffect, useState} from 'react';

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
    const [costTotalEffort, setTotalEffort] = useState(projectDetails?.cost?.totalEffortMh || 0);
    const [costQuotedValue, setQuotedValue] = useState(projectDetails?.cost?.quotedValue || 0);
    const [costQuotingRate, setQuotingRate] = useState(projectDetails?.cost?.quotedRate || 0);
    const [costAmcValue, setAMCValue] = useState(projectDetails?.cost?.amcValue || 0);


    useEffect(() => {
        if (projectDetails) {
            setTotalEffort(projectDetails.cost?.totalEffortMh || 0);
            setQuotedValue(projectDetails.cost?.quotedValue || 0);
            setQuotingRate(projectDetails.cost?.quotedRate || 0);
            setAMCValue(projectDetails.cost?.amcValue || 0);

        }


    }, [projectDetails]);




    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Cost</h2></div>
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




                </div>


            </form>

        </div>
    );
};

export default SpecialDates;