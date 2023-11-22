import React, {useEffect, useState} from 'react';

import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";

const LatestUpdates = ({projectDetails}: { projectDetails: any }) => {
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


    useEffect(() => {
        if (projectDetails) {


        }


    }, [projectDetails]);




    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Latest Project Activities</h2></div>
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


                    {/*<div className="sm:col-span-3 px-6">*/}
                    {/*    <label*/}
                    {/*        htmlFor=""*/}
                    {/*        className="block text-sm font-medium leading-6 text-gray-900"*/}
                    {/*    >*/}
                    {/*        Latest Project Status*/}
                    {/*    </label>*/}
                    {/*    <div className="mt-2">*/}
                    {/*        <input*/}
                    {/*            name="latestStatus"*/}
                    {/*            id="latestStatus"*/}
                    {/*            type="text"*/}
                    {/*            className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"*/}
                    {/*            onChange={(e) => setLatestProjectStatus(e.target.value)}*/}
                    {/*            value={latestProjectStatus}*/}

                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="sm:col-span-3 px-6">*/}
                    {/*    <label*/}
                    {/*        htmlFor=""*/}
                    {/*        className="block text-sm font-medium leading-6 text-gray-900"*/}
                    {/*    >*/}
                    {/*        Status Date*/}
                    {/*    </label>*/}
                    {/*    <div className="mt-2">*/}

                    {/*        <input*/}
                    {/*            name="latestStatusDate"*/}
                    {/*            id="latestStatusDate"*/}
                    {/*            type="date"*/}
                    {/*            className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"*/}
                    {/*            onChange={(e) => setLatestProjectStatusDate(new Date(e.target.value))}*/}
                    {/*            value={latestProjectStatusDate.toISOString().split('T')[0]}*/}
                    {/*            // onChange={(e) => setLatestProjectStatusDate(new Date(e.target.value))}*/}
                    {/*            // value={latestProjectStatusDate ? formatDate(latestProjectStatusDate) : ''}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>


            </form>

        </div>
    );
};


export default LatestUpdates;