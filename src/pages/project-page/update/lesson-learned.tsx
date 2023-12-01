import axios from 'axios';
import React, {useEffect, useState} from 'react';

import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
import { updateLessonsLearned } from '../../../apis/project-api';

const LessonLearned = ({projectDetails}: { projectDetails: any }) => {
    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const handleEditClick = () => {
        setEditMode(!editMode);
    };
 // Update lessonsLearned in handleSaveClick function
const handleSaveClick = async () => {
    try {
        await updateLessonsLearned(
            projectDetails?.id, 
            lessonsLearned || '');
        setEditMode(false);

    } catch (error) {
        console.error('Error updating lessonsLearned:', error);

        // Log the response content if available
        if (axios.isAxiosError(error)) {
            console.error('Response:', error.response?.data);
        }
    }
};
    const [lessonsLearned, setLessonsLearned] = useState(projectDetails?.lessonsLearned || '');

    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        if (projectDetails) {

            setLessonsLearned(projectDetails.lessonsLearned || '');


        }


    }, [projectDetails]);




    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Lesson Learned</h2></div>
                    <div className={"w-full flex justify-end mr-12 text-xl "}>
                        {!editMode ?
                            <div className={' border rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '} onClick={handleEditClick}>
                                <GoPencil /> <span className={"text-sm mx-2"}>Update</span>
                            </div>
                            :
                            <div className={'border rounded-full bg-gray-100 px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28'} onClick={handleSaveClick}>
                            <IoSaveOutline /> <span className={"text-sm mx-2"}>Save</span>
                        </div>
                        }




                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-6 mb-6">


                        <div className="mt-2">
                   <textarea
                       name="lessonsLearned"
                       id="lessonsLearned"
                       rows={5}
                       className="appearance-none mt-6 w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                       defaultValue={""}
                       onChange={(e) => setLessonsLearned(e.target.value)}
                       value={lessonsLearned}
                       disabled={!editMode}
                   />
                        </div>
                    </div>
                </div>


            </form>

        </div>
    );
};

export default LessonLearned;