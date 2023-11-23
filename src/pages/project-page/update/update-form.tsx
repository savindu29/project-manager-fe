import React, {useState} from "react";
import {Link} from "react-router-dom";
import MainData from "./main-data";
import SpecialDates from "./special-dates";
import ClarificationDiscussionDetails from "./clarification-discussion-details";
import GrantClient from "./grant-client";
import IntermediateClienet from "./intermediate-client";
import ProjectLead from "./project-lead";
import EffortEstimators from "./effort-estimators";
import Cost from "./cost";
import RFPResources from "./rfp-resources";
import OutputFromInova from "./output-from-inova";
import Todo from "./todo";
import LessonLearned from "./lesson-learned";

interface Country {
    label: string;
    value: string;
}

interface TodoType {
    title: string;
    description: string;
    date: string;
    isDone: boolean;
}

interface EffortEstimator {
    id: number;
    name: string;
    mobile: string;
    companyEmail: string;
    privateEmail: string;
    designation: string;
    specializedField: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const UpdateProjectForm = ({projectDetails}: { projectDetails: any }) => {


    const checkBox2 = () => {

        setVisible(!visiblity);
    };


    const [visiblity, setVisible] = useState(false);


    // setTodos((prevTodos) => [
    //     ...prevTodos,
    //     ...(projectDetails.todo?.tasks ?? []).map((task: Task) => ({
    //         title: task.taskTitle,
    //         description: task.taskDescription,
    //         date: task.date,
    //         isDone :task.done
    //     })),
    // ]);


    // const projectData: ProjectRequest = {
    //     name: projectName,
    //     priority: projectPriority,
    //     projectStatus: projectStatus,
    //     initiationDate: projectinitiationDate,
    //     proposalDueDate: projectProposalDueDate || null,
    //     proposalSubmittedDate: projectProposalSubDate || null,
    //     proposedImplementStartDate: projectProposedImpStartDate || null,
    //     proposedImplementEndDate: projectProposedImpEndDate || null,
    //     actualImplementationStartDate: projectActualImpStartDate || null,
    //     actualImplementationEndDate: projectActualImpEndDate || null,
    //     actualImplementationDueDate: projectImpDueDate || null,
    //     lessonsLearned: lessonsLearned || null,
    //     clarificationDiscussionDetails: projectClarificationDiscussDetails || null,
    //     intermediateClient: {
    //         name: intermediantClientName || '',
    //         country: intermediantClientCountry?.label || '',
    //         externalContactPerson: {
    //             name: intermediantClientContactName || '',
    //             mobile: intermediantClientContactMobileNumber || '',
    //             fixTel: intermediantClientContactFixTelNumber || '',
    //             companyEmail: intermediantClientContactEmail || '',
    //             designation: intermediantClientContactDesignation || '',
    //             description: intermediantClientContactDescription || '',
    //         },
    //     },
    //     grantClient: {
    //         name: clientName || '',
    //         country: clientCountry?.label || '',
    //         isForeign: false,
    //         externalContactPerson: {
    //             name: clientContactPersonName || '',
    //             mobile: clientContactMobileNumber || '',
    //             fixTel: clientContactFixTelNumber || '',
    //             companyEmail: clientContactEmail || '',
    //             designation: clientContactDesignation || '',
    //             description: clientContactDescription || '',
    //         },
    //     },
    //     cost: {
    //         totalEffortMh: costTotalEffort || 0,
    //         quotedValue: costQuotedValue || 0,
    //         quotedRate: costQuotingRate || 0,
    //         amcValue: costAmcValue || 0,
    //     },
    //
    //     todo: {
    //         notes: note || '',
    //         tasks: todos.map((t) => ({
    //             taskTitle: t.title || '',
    //             taskDescription: t.description || '',
    //             date: t.date ? new Date(t.date) : null,
    //             done: t.isDone || false
    //         })),
    //     },
    //     rfpResources: null,
    //     outputsFromInova: null,
    //     projectLead: selectedProjectLead,
    //     effortEstimators: effortEstimatorIds,
    //     latestActivity:null
    // };


    //   const resp = await axios.post(url, projectData);
    //   console.log(projectData);


    //todo


    return (
        <div className="">
            <div>
                <div className={"px-12 bg-zinc-100 pt-8"}>
                    <div className="text text-3xl font-semibold text-zinc-600">
                        Update Project
                    </div>
                    <div className="pb-12  text-zinc-600">
                        <Link to="/projects">Projects</Link> /{" "}
                        <Link to="#">Update Project</Link>
                    </div>
                </div>


                <div className="">
                    <MainData projectDetails={projectDetails}/>
                    <SpecialDates projectDetails={projectDetails}/>
                    <ClarificationDiscussionDetails projectDetails={projectDetails}/>
                    <GrantClient projectDetails={projectDetails}/>


                    <div className="sm:col-span-4 flex items-center pt-6 px-12 bg-zinc-100">
                        <label
                            htmlFor=""
                            className="block text-sm font-medium leading-6 text-gray-900 mr-2 "
                        >
                            Is this a Third Party Project
                        </label>

                        <input
                            type="checkbox"
                            value="1"
                            checked={visiblity}
                            onChange={checkBox2}
                        />
                    </div>
                    {visiblity && (
                        <div>
                            <IntermediateClienet projectDetails={projectDetails}/>
                        </div>
                    )}
                    <ProjectLead projectDetails={projectDetails}/>
                    <EffortEstimators projectDetails={projectDetails}/>
                    <Cost projectDetails={projectDetails}/>
                    <RFPResources projectDetails={projectDetails}/>
                    <OutputFromInova projectDetails={projectDetails}/>
                    <Todo projectDetails={projectDetails}/>
                    <LessonLearned projectDetails={projectDetails}/>


                </div>


            </div>
        </div>
    );
};

export default UpdateProjectForm;
