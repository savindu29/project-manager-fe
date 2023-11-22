import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {EmployeeSearchResult, ProjectRequest} from "../../../apis";
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


    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleOpenConfirmation = () => {
        setConfirmationOpen(true);
    };

    const handleCloseConfirmation = () => {
        setConfirmationOpen(false);
    };


    const checkBox2 = () => {

        setVisible(!visiblity);
    };


    const [showForm, setShowForm] = useState<boolean>(false);

    const [todos, setTodos] = useState<
        { title: string; description: string; date: string; isDone: boolean }[]
    >([]);

    const handleAddTodo = (newTodo: TodoType) => {
        // Add the new todo to the list
        setTodos([...todos, newTodo]);
    };


    const [visiblity, setVisible] = useState(false);


    const [effortEstimators, setEffortEstimators] = useState<EmployeeSearchResult[]>([]);


    const [projectName, setProjectName] = useState(projectDetails?.name || '');
    const [projectinitiationDate, setProjectInitiationDate] = useState(
        projectDetails?.initiationDate ? new Date(projectDetails.initiationDate) : new Date()
    )
    const [projectPriority, setProjectPriority] = useState(projectDetails?.priority?.id || -1);
    const [projectStatus, setProjectStatus] = useState(projectDetails?.projectStatus?.id || -1);
    const [latestProjectStatus, setLatestProjectStatus] = useState(projectDetails?.statusHistoryList[0]?.description || '');
    const [latestProjectStatusDate, setLatestProjectStatusDate] = useState(
        projectDetails?.statusHistoryList[0]?.date ? new Date(projectDetails.statusHistoryList[0].date) : new Date()
    );
    const [projectProposalDueDate, setProposalDueDate] = useState(
        projectDetails?.proposalDueDate ? new Date(projectDetails.proposalDueDate) : null
    );
    const [projectProposalSubDate, setProposalSubDate] = useState(
        projectDetails?.proposalSubmittedDate ? new Date(projectDetails.proposalSubmittedDate) : null
    );
    const [projectProposedImpStartDate, setProposedImpStartDate] = useState(
        projectDetails?.piStartDate ? new Date(projectDetails.piStartDate) : null
    );
    const [projectProposedImpEndDate, setProposedImpEndDate] = useState(
        projectDetails?.piEndDate ? new Date(projectDetails.piEndDate) : null
    );
    const [projectActualImpStartDate, setActualImpStartDate] = useState(
        projectDetails?.acStartDate ? new Date(projectDetails.acStartDate) : null
    );
    const [projectActualImpEndDate, setActualImpEndDate] = useState(
        projectDetails?.acEndDate ? new Date(projectDetails.acEndDate) : null
    );
    const [projectImpDueDate, setImpDueDate] = useState(
        projectDetails?.actualImplementationDueDate ? new Date(projectDetails.actualImplementationDueDate) : null
    );
    const [projectClarificationDiscussDetails, setClarificationDiscussDetails] = useState(
        projectDetails?.cdDetails || ''
    );
    const [lessonsLearned, setLessonsLearned] = useState(projectDetails?.lessonsLearned || '');
    const [selectedProjectLead, setSelectedProjectLead] = useState(
        projectDetails?.projectLead?.id || -1
    );

    const [clientName, setClientName] = useState(projectDetails?.grantClient?.name || '');
    const [clientCountry, setClientCountry] = useState<Country | null>(null);
    const [clientCurrentCountry, setClientCurrentCountry] = useState(projectDetails?.grantClient?.country || '');
    const [clientContactPersonName, setContactPersonName] = useState(projectDetails?.grantClient?.externalContactPerson?.name || '');
    const [clientContactEmail, setClientContactEmail] = useState(projectDetails?.grantClient?.externalContactPerson?.companyEmail || '');
    const [clientContactMobileNumber, setClientContactMobileNumber] = useState(projectDetails?.grantClient?.externalContactPerson?.mobile || '');
    const [clientContactFixTelNumber, setClientContactFixTelNumber] = useState(projectDetails?.grantClient?.externalContactPerson?.fixTel || '');
    const [clientContactDesignation, setClientContactDesignation] = useState(projectDetails?.grantClient?.externalContactPerson?.designation || '');
    const [clientContactDescription, setClientContactDescription] = useState(projectDetails?.grantClient?.externalContactPerson?.description || '');

    const [intermediantClientName, setIntermidiantClientName] = useState(projectDetails?.intermediateClient?.name || '');
    const [intermediantClientCountry, setIntermidiantClientCountry] = useState<Country | null>(null);
    const [intermediantCurrentClientCountry, setIntermidiantCurrentClientCountry] = useState(projectDetails?.intermediateClient?.country || '');
    const [intermediantClientContactName, setIntermidiantClientContactName] = useState(projectDetails?.intermediateClient?.externalContactPerson?.name || '');
    const [intermediantClientContactEmail, setIntermidiantClientContactEmail] = useState(projectDetails?.intermediateClient?.externalContactPerson?.companyEmail || '');
    const [intermediantClientContactMobileNumber, setIntermidiantClientContactMobileNumber] = useState(projectDetails?.intermediateClient?.externalContactPerson?.mobile || '');
    const [intermediantClientContactFixTelNumber, setIntermidiantClientContactFixTelNumber] = useState(projectDetails?.intermediateClient?.externalContactPerson?.fixTel || '');
    const [intermediantClientContactDesignation, setIntermidiantClientContactDesignation] = useState(projectDetails?.intermediateClient?.externalContactPerson?.designation || '');
    const [intermediantClientContactDescription, setIntermidiantClientDescription] = useState(projectDetails?.intermediateClient?.externalContactPerson?.description || '');

    const [note, setNote] = useState('');
    const [costTotalEffort, setTotalEffort] = useState(projectDetails?.cost?.totalEffortMh || 0);
    const [costQuotedValue, setQuotedValue] = useState(projectDetails?.cost?.quotedValue || 0);
    const [costQuotingRate, setQuotingRate] = useState(projectDetails?.cost?.quotedRate || 0);
    const [costAmcValue, setAMCValue] = useState(projectDetails?.cost?.amcValue || 0);


    useEffect(() => {
        if (projectDetails) {
            setProjectName(projectDetails.name || '');
            setProjectInitiationDate(projectDetails.initiationDate ? new Date(projectDetails.initiationDate) : new Date());
            setProjectPriority(projectDetails.priority?.id || -1);

            setProjectStatus(projectDetails.projectStatus?.id || -1);
            setLatestProjectStatus(projectDetails.statusHistoryList[0]?.description || '');
            setLatestProjectStatusDate(
                projectDetails.statusHistoryList[0]?.date
                    ? new Date(projectDetails.statusHistoryList[0].date)
                    : new Date()
            );
            setProposalDueDate(projectDetails.proposalDueDate ? new Date(projectDetails.proposalDueDate) : null);
            setProposalSubDate(projectDetails.proposalSubmittedDate ? new Date(projectDetails.proposalSubmittedDate) : null);
            setProposedImpStartDate(projectDetails.piStartDate ? new Date(projectDetails.piStartDate) : null);
            setProposedImpEndDate(projectDetails.piEndDate ? new Date(projectDetails.piEndDate) : null);
            setActualImpStartDate(projectDetails.acStartDate ? new Date(projectDetails.acStartDate) : null);
            setActualImpEndDate(projectDetails.acEndDate ? new Date(projectDetails.acEndDate) : null);
            setImpDueDate(projectDetails.actualImplementationDueDate ? new Date(projectDetails.actualImplementationDueDate) : null);
            setClarificationDiscussDetails(projectDetails.cdDetails || '');
            setLessonsLearned(projectDetails.lessonsLearned || '');


            setSelectedProjectLead(projectDetails.projectLead?.id || -1);

            const effortEstimatorIds: number[] = projectDetails.effortEstimators.map((estimator: EffortEstimator) => estimator.id);

            // for (const estimator of projectDetails.effortEstimators) {
            //     handleEffortEstimators(estimator.id);
            // }


            // Intermediate Client Details
            setIntermidiantClientName(projectDetails.intermediateClient?.name || '');
            setClientCurrentCountry(projectDetails.intermediateClient?.country || '');
            setIntermidiantClientContactName(projectDetails.intermediateClient?.externalContactPerson?.name || '');
            setIntermidiantClientContactEmail(projectDetails.intermediateClient?.externalContactPerson?.companyEmail || '');
            setIntermidiantClientContactMobileNumber(projectDetails.intermediateClient?.externalContactPerson?.mobile || '');
            setIntermidiantClientContactFixTelNumber(projectDetails.intermediateClient?.externalContactPerson?.fixTel || '');
            setIntermidiantClientContactDesignation(projectDetails.intermediateClient?.externalContactPerson?.designation || '');
            setIntermidiantClientDescription(projectDetails.intermediateClient?.externalContactPerson?.description || '');
            if (projectDetails.intermediateClient !== null) {
                setVisible(true)
            }
            // Grant Client Details
            setClientName(projectDetails.grantClient?.name || '');
            setClientCountry(projectDetails.grantClient?.country || '');
            setContactPersonName(projectDetails.grantClient?.externalContactPerson?.name || '');
            setClientContactEmail(projectDetails.grantClient?.externalContactPerson?.companyEmail || '');
            setClientContactMobileNumber(projectDetails.grantClient?.externalContactPerson?.mobile || '');
            setClientContactFixTelNumber(projectDetails.grantClient?.externalContactPerson?.fixTel || '');
            setClientContactDesignation(projectDetails.grantClient?.externalContactPerson?.designation || '');
            setClientContactDescription(projectDetails.grantClient?.externalContactPerson?.description || '');

            setNote(projectDetails.todo?.notes || '');
            setTotalEffort(projectDetails.cost?.totalEffortMh || 0);
            setQuotedValue(projectDetails.cost?.quotedValue || 0);
            setQuotingRate(projectDetails.cost?.quotedRate || 0);
            setAMCValue(projectDetails.cost?.amcValue || 0);


            // setTodos((prevTodos) => [
            //     ...prevTodos,
            //     ...(projectDetails.todo?.tasks ?? []).map((task: Task) => ({
            //         title: task.taskTitle,
            //         description: task.taskDescription,
            //         date: task.date,
            //         isDone :task.done
            //     })),
            // ]);


        }


    }, [projectDetails]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();


        try {

            if (projectStatus === -1 || projectPriority === -1 || selectedProjectLead === -1) {
                // Show confirmation dialog
                handleOpenConfirmation();
                return; // Exit the function early
            }

            const effortEstimatorIds = effortEstimators.map(estimator => estimator.id);

            const url = "http://localhost:8000/api/v1/project/create";
            const projectData: ProjectRequest = {
                name: projectName,
                priority: projectPriority,
                projectStatus: projectStatus,
                initiationDate: projectinitiationDate,
                proposalDueDate: projectProposalDueDate || null,
                proposalSubmittedDate: projectProposalSubDate || null,
                proposedImplementStartDate: projectProposedImpStartDate || null,
                proposedImplementEndDate: projectProposedImpEndDate || null,
                actualImplementationStartDate: projectActualImpStartDate || null,
                actualImplementationEndDate: projectActualImpEndDate || null,
                actualImplementationDueDate: projectImpDueDate || null,
                lessonsLearned: lessonsLearned || null,
                clarificationDiscussionDetails: projectClarificationDiscussDetails || null,
                intermediateClient: {
                    name: intermediantClientName || '',
                    country: intermediantClientCountry?.label || '',
                    externalContactPerson: {
                        name: intermediantClientContactName || '',
                        mobile: intermediantClientContactMobileNumber || '',
                        fixTel: intermediantClientContactFixTelNumber || '',
                        companyEmail: intermediantClientContactEmail || '',
                        designation: intermediantClientContactDesignation || '',
                        description: intermediantClientContactDescription || '',
                    },
                },
                grantClient: {
                    name: clientName || '',
                    country: clientCountry?.label || '',
                    isForeign: false,
                    externalContactPerson: {
                        name: clientContactPersonName || '',
                        mobile: clientContactMobileNumber || '',
                        fixTel: clientContactFixTelNumber || '',
                        companyEmail: clientContactEmail || '',
                        designation: clientContactDesignation || '',
                        description: clientContactDescription || '',
                    },
                },
                cost: {
                    totalEffortMh: costTotalEffort || 0,
                    quotedValue: costQuotedValue || 0,
                    quotedRate: costQuotingRate || 0,
                    amcValue: costAmcValue || 0,
                },

                todo: {
                    notes: note || '',
                    tasks: todos.map((t) => ({
                        taskTitle: t.title || '',
                        taskDescription: t.description || '',
                        date: t.date ? new Date(t.date) : null,
                        done: t.isDone || false
                    })),
                },
                rfpResources: null,
                outputsFromInova: null,
                projectLead: selectedProjectLead,
                effortEstimators: effortEstimatorIds,
                latestActivity:null
            };


            //   const resp = await axios.post(url, projectData);
            //   console.log(projectData);


            //todo


        } catch (error: any) {

            console.log(error.response);
        }

    };


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
                <form onSubmit={handleSubmit}>

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


                </form>
            </div>
        </div>
    );
};

export default UpdateProjectForm;
