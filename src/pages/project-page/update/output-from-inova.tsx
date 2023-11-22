import React, {useEffect, useState} from 'react';

import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
import MyFileInput from "../../../components/file-uploader";

const OutputFromInova = ({projectDetails}: { projectDetails: any }) => {
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
    const handleSelectedFiles = (id: string, files: File[]) => {
        // Handle the selected files for the specified instance
        console.log(`Selected Files for ${id}:`, files);
    };

    useEffect(() => {
        if (projectDetails) {


        }


    }, [projectDetails]);




    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Output From Inova</h2></div>
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

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <MyFileInput
                            id="outputFromInovaFiles"
                            onSelectFiles={handleSelectedFiles}
                            isDisabled={!editMode}
                        />
                    </div>
                </div>


            </form>

        </div>
    );
};

export default OutputFromInova;