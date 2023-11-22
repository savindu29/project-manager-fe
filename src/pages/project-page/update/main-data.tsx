import React, {useEffect, useState} from 'react';
import DropDown from "../../../components/drop-down";
import axios from "axios";
import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";

const MainData = ({projectDetails}: { projectDetails: any }) => {
    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    const [projectStatusData, setProjectStatusData] = useState([]);
    const [projectPriorityData, setProjectPriorityData] = useState([]);

    useEffect(() => {
        // Fetch project status data
        axios
            .get("http://localhost:8000/api/v1/project-status/list")
            .then((response) => setProjectStatusData(response.data.data))
            .catch((error) =>
                console.error("Error fetching project status data:", error)
            );

        axios
            .get("http://localhost:8000/api/v1/priority/list")
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

        }


    }, [projectDetails]);



    const handleEditClick = () => {
        setEditMode(!editMode);
    };
    const handleSaveClick = () => {
        // Add logic to save the data
        setEditMode(false);
    };
    return (
        <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
            <form action="">
                <div className={"flex w-full h-12 mb-4"}>
                    <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">Project Details</h2></div>
                    <div className={"w-full flex justify-end mr-12 text-xl "}>
                        {!editMode ?
                            <div className={'border rounded-full px-3 flex justify-center items-center text-gray-500 hover:cursor-pointer hover:bg-gray-200 hover:text-gray-700 w-28 '} onClick={handleEditClick}>
                            <GoPencil /> <span className={"text-sm mx-2"}>Update</span>
                        </div>
                        :
                            <div className={'border rounded-full px-3 flex justify-center items-center text-gray-500 hover:cursor-pointer hover:bg-gray-200 hover:text-gray-700 w-28'} onClick={handleEditClick}>
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
                            Project Priority {!editMode ? <span> : {projectDetails?.priority?.name}</span>:<span></span>}
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
                            Project Status {!editMode ? <span> : {projectDetails?.projectStatus?.name}</span>:<span></span>}
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


            </form>

        </div>
    );
};

export default MainData;