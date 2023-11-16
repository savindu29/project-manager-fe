import React, { useEffect, useState, useMemo } from "react";
import MiniDrawer from "../../../layout";
import { styled } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import  { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CreateSearch from "../../../components/search/createSearch";
import { Link } from "react-router-dom";
import DropDown from "../../../components/drop-down";
import MyFileInput from "../../../components/file-uploader";
import axios from "axios";
import CountrySelector from "../../../components/drop-down/countries";
import SearchForm from "../create/employeesSearchForm";
import { EmployeeSearchResult, ProjectRequest } from "../../../apis";
import countryList from 'react-select-country-list';
import Select from 'react-select';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
interface Country {
  label: string;
  value: string;
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

const UpdateProjectForm = () => {

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleOpenConfirmation = () => {
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };



  const [visible, SetChecked] = useState(false);

  const checkBox = () => {
    SetChecked(!visible);
  };

  const checkBox2 = () => {
    setVisible(!visiblity);
  };

  const checkbox3 = () => {
    setVisi(!a);
  };

  const checkbox4 = () => {
    setv(!b);
  };

  const [age, setAge] = React.useState("");

  const [showForm, setShowForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [todos, setTodos] = useState<
    { title: string; description: string; date: string }[]
  >([]);

  const handleAddTodo = () => {
    if (title && description && date) {
      setTodos([...todos, { title, description, date }]);
      // Clear the form after adding a todo
      setTitle("");
      setDescription("");
      setDate("");
      setShowForm(false);
    }
  };

  const [b, setv] = useState(false);

  const [visiblity, setVisible] = useState(false);

  const [a, setVisi] = useState(false);

  const [personName, setPersonName] = React.useState<string[]>([]);

  const [personNames, setPersonNames] = React.useState<string[]>([]);

  const handleChanges = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChanges2 = (event: SelectChangeEvent<typeof personNames>) => {
    const {
      target: { value },
    } = event;
    setPersonNames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
  };
  const handleSelectedFiles = (id: string, files: File[]) => {
    // Handle the selected files for the specified instance
    console.log(`Selected Files for ${id}:`, files);
  };

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

  const handleProjectPrioritySelect = (selectedPriority: any) => {
    setProjectPriority(selectedPriority.id);
  };
  const [projectLead, setProjectLead] = useState<EmployeeSearchResult | null>(null);

  const handleProjectLeadsAdd = async (selectedResultId: number) => {
    
    console.log('Selected Result ID in ParentComponent:', selectedResultId);

    try {
      const response = await axios.get(`http://localhost:8000/api/v1/responsible-person/${selectedResultId}`);

      if (response.data && response.data.code === 200 && response.data.data) {
        const responsiblePersonData = response.data.data;
        setProjectLead(responsiblePersonData);
        setSelectedProjectLead(selectedResultId);
        console.log(responsiblePersonData)
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching responsible person data:', error);
    }
  };

 



  const handleRemoveClick = () => {
    // Ask the user for confirmation (you can use a modal or any other UI pattern)
    const isConfirmed = window.confirm('Are you sure you want to remove the selected project lead?');

    if (isConfirmed) {
      setProjectLead(null); // Clear the selected project lead
      setSelectedProjectLead(-1)
    }
  };




  const [effortEstimators, setEffortEstimators] = useState<EmployeeSearchResult[]>([]);

  const handleEffortEstimators = (selectedResultId: number) => {
    console.log('Selected Result ID for Effort Estimator:', selectedResultId);

    // Check if the selected employee is already in the list
    const isAlreadySelected = effortEstimators.some((estimator) => estimator.id === selectedResultId);

    if (!isAlreadySelected) {
      try {
        // Fetch details for the selected employee
        axios.get(`http://localhost:8000/api/v1/responsible-person/${selectedResultId}`)
          .then((response) => {
            if (response.data && response.data.code === 200 && response.data.data) {
              const estimatorData = response.data.data;
              setEffortEstimators((prevEstimators) => [...prevEstimators, estimatorData]);
            } else {
              console.error('Invalid response format:', response);
            }
          })
          .catch((error) => {
            console.error('Error fetching responsible person data:', error);
          });
      } catch (error) {
        console.error('Error fetching responsible person data:', error);
      }
    } else {
      console.log('Employee is already in the list.');
    }
  };

  const handleRemoveEffortEstimator = (estimatorId: number) => {
    // Remove the selected effort estimator from the list
    setEffortEstimators((prevEstimators) => prevEstimators.filter((estimator) => estimator.id !== estimatorId));
  };
  const [value, setValue] = useState<Country | null>(null);

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOption: Country | null) => {
    setValue(selectedOption);
    setClientCountry(selectedOption?.value || "Sri Lanka");
  }




  const [projectName, setProjectName] = useState('');
  const [projectinitiationDate, setProjectInitiationDate] = useState(new Date());
  const [projectPriority, setProjectPriority] = useState(-1);
  const [projectStatus, setProjectStatus]= useState(-1);
  const [latestProjectStatus, setLatestProjectStatus]= useState("");
  const [latestProjectStatusDate, setLatestProjectStatusDate]=  useState(new Date());
  const [projectProposalDueDate, setProposalDueDate]= useState<Date | null>(null);
  const [projectProposalSubDate,setProposalSubDate]= useState<Date | null>(null);
  const [projectProposedImpStartDate, setProposedImpStartDate]= useState<Date | null>(null);
  const [projectProposedImpEndDate, setProposedImpEndDate]= useState<Date | null>(null);
  const [projectActualImpStartDate, setActualImpStartDate]= useState<Date | null>(null);
  const [projectActualImpEndDate, setActualImpEndDate]= useState<Date | null>(null);
  const [projectImpDueDate, setImpDueDate]= useState<Date | null>(null);
  const [projectClarificationDiscussDetails, setClarificationDiscussDetails]= useState('');
  const [lessonsLearned, setLessonsLearned]= useState('');
  const [selectedProjectLead, setSelectedProjectLead]= useState(-1);

  const [clientName, setClientName]= useState('');
  const [clientCountry, setClientCountry] = useState('');
  const [clientContactPersonName, setContactPersonName]= useState('');
  const [clientContactEmai, setClientContactEmail]= useState('');
  const [clientContactMobileNumber, setClientContactMobileNumber]= useState('');
  const [clientContactFixTelNumber, setClientContactFixTelNumber]= useState('');
  const [clientContactDesignation, setClientContactDesignation]= useState('');
  const [clientContactDescription, setClientContactDescription]= useState('');
  const [intermediantClientName, setIntermidiantClientName]= useState('');
  const [intermediantClientCountry, setIntermidiantClientCountry]= useState('');
  const [intermediantClientContactName, setIntermidiantClientContactName]= useState('');
  const [intermediantClientContactEmail, setIntermidiantClientContactEmail]= useState('');
  const [intermediantClientContactMobileNumber, setIntermidiantClientContactMobileNumber]= useState('');
  const [intermediantClientContactFixTelNumber, setIntermidiantClientContactFixTelNumber]= useState('');
  const [intermediantClientContactDesignation, setIntermidiantClientContactDesignation]= useState('');
  const [intermediantClientContactDescription, setIntermidiantClientDescription]= useState('');
  const [note, setNote] = useState('');
  const [costTotalEffort, setTotalEffort]= useState(0);
  const [costQuotedValue, setQuotedValue]= useState(0);
  const [costQuotingRate, setQuotingRate]= useState(0);
  const [costAmcValue, setAMCValue]= useState(0);
 
  const handleProjectStatusSelect = (selectedStatus: any) => {
    setProjectStatus(selectedStatus.id);
  };
 


 
  
  const handleSubmit = async (e:any) => {
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
        proposalDueDate: projectProposalDueDate  ||  null,
        proposalSubmittedDate : projectProposalSubDate ||  null,
        proposedImplementStartDate : projectProposedImpStartDate || null,
        proposedImplementEndDate: projectProposedImpEndDate || null,
        actualImplementationStartDate: projectActualImpStartDate || null,
        actualImplementationEndDate : projectActualImpEndDate || null,
        actualImplementationDueDate : projectImpDueDate || null,
        lessonsLearned : lessonsLearned || null,
        clarificationDiscussionDetails: projectClarificationDiscussDetails ||  null,
        intermediateClient: {
          name: intermediantClientName || '',
          country: intermediantClientCountry || '',
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
          country: clientCountry || '', 
          isForeign: false,
          externalContactPerson: {
            name: clientContactPersonName || '',
            mobile: clientContactMobileNumber || '',
            fixTel: clientContactFixTelNumber || '',
            companyEmail: clientContactEmai || '',
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
          })),
        },
        rfpResources : null,
        outputsFromInova : null,
        projectLead : selectedProjectLead,
        effortEstimators :  effortEstimatorIds
      };
     
      
    //   const resp = await axios.post(url, projectData);
    //   console.log(projectData);


    //todo








    

    }catch (error:any ) {

      console.log(error.response);
    }

  };




  return (
    <div className="mt-8">
      <div>
        <div className="text text-3xl font-semibold text-zinc-600">
          Update Project
        </div>
        <div className="mb-12 text-zinc-600">
          <Link to="/projects">Projects</Link> /{" "}
          <Link to="#">Update Project</Link>
        </div>
        <form onSubmit={handleSubmit} >
          <h2 className="font-semibold text-lg mb-4 ">Project Details</h2>
          <div className="">
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
                    required
                 />
                  
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Priority
                </label>
                <div className="mt-2">
                  <DropDown
                   
                   data={projectPriorityData}
                    dropdownFor="priority"
                    onSelect={handleProjectPrioritySelect}
                  />
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Status
                </label>
                <div className="mt-2">
                  <DropDown
                    data={projectStatusData}
                    dropdownFor="status"
                    onSelect={handleProjectStatusSelect}
                    
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <h2 className="font-semibold text-lg mt-8 mb-2 ">
                  Latest Project Activities
                </h2>
              </div>

              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Latest Project Status
                </label>
                <div className="mt-2">
                  <input
                   name="latestStatus"
                   id="latestStatus"
                    type="text"
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    onChange={(e) => setLatestProjectStatus(e.target.value)}
                    value={latestProjectStatus}
                    
                  />
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Status Date
                </label>
                <div className="mt-2">
                 
                  <input
                   name="latestStatusDate"
                   id="latestStatusDate"
                    type="date"
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    onChange={(e) => setLatestProjectStatusDate(new Date(e.target.value))}
                    value={latestProjectStatusDate.toISOString().split('T')[0]}
                    // onChange={(e) => setLatestProjectStatusDate(new Date(e.target.value))}
                    // value={latestProjectStatusDate ? formatDate(latestProjectStatusDate) : ''}
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <h2 className="font-semibold text-lg mt-8 mb-2 ">
                  Special Dates
                </h2>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Proposal Due Date Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="proposalDueDate"
                    id="proposalDueDate"
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    onChange={(e) => setProposalDueDate(new Date(e.target.value))}
                    value={projectProposalDueDate ? formatDate(projectProposalDueDate) : ''}
                  />
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Proposal Submitted Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="proposalSubmittedDate"
                    id="proposalSubmittedDate"
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    onChange={(e) => setProposalSubDate(new Date(e.target.value))}
                    value={projectProposalSubDate ? formatDate(projectProposalSubDate) : ''}
                    
                  />
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Proposed Implementation Start Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="proposedImplementStartDate"
                    id="proposedImplementStartDate"
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    onChange={(e) => setProposedImpStartDate(new Date(e.target.value))}
                    value={projectProposedImpStartDate ? formatDate(projectProposedImpStartDate) : ''}
                  />
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Proposed Implimentaion End Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="proposedImplementEndDate"
                    id="proposedImplementEndDate"
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    onChange={(e) => setProposedImpEndDate(new Date(e.target.value))}
                    value={projectProposedImpStartDate ? formatDate(projectProposedImpStartDate) : ''}
                    
                  />
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Actual Implementaion Start Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="actualImplementationStartDate"
                    id="actualImplementationStartDate"
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    onChange={(e) => setActualImpStartDate(new Date(e.target.value))}
                    value={projectActualImpStartDate ? formatDate(projectActualImpStartDate) : ''}
                  />
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Implimentaion Due Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="actualImplementationDueDate"
                    id="actualImplementationDueDate"
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    onChange={(e) => setImpDueDate(new Date(e.target.value))}
                    value={projectImpDueDate ? formatDate(projectImpDueDate) : ''}
                  />
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Actual Implimentaion End Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="actualImplementationEndDate"
                    id="actualImplementationEndDate"
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    onChange={(e) => setActualImpEndDate(new Date(e.target.value))}
                    value={projectActualImpEndDate ? formatDate(projectActualImpEndDate) : ''}
                  />
                </div>
              </div>
              <div className="sm:col-span-6 mb-6">
                <h2 className=" mt-8 mb-6 ">
                  Clarification Discussion Details
                </h2>

                <div className="mt-2">
                  <textarea
                    name="clarificationDiscussionDetails"
                    id="clarificationDiscussionDetails"
                    rows={5}
                    className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
                    defaultValue={""}
                    onChange={(e) => setClarificationDiscussDetails(e.target.value)}
                    value={projectClarificationDiscussDetails}
                  />
                </div>
              </div>
            </div>
            <h2 className="font-semibold text-lg mt-6">Client Details</h2>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
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
                  />
                </div>
              </div>
              <div className="sm:col-span-3 px-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Client Country
                </label>
                <div className="mt-2">
                <Select
      options={options}
      value={value}
      onChange={changeHandler}
      required
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
                    value={clientContactEmai}
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
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 flex items-center mt-6">
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
                <h2 className="font-semibold text-lg mt-8">
                  Intermediary client Details
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
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
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3 px-6">
                    <label
                      htmlFor=""
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Intermediary Client Country
                    </label>
                    <div className="mt-2">
                      <CountrySelector />
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <h2 className="font-semibold text-lg mt-8">Inova Project Lead</h2>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-3 px-6 mb-6">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Lead's Name
                </label>
                <div className="mt-2">
                <SearchForm onAddClick={handleProjectLeadsAdd} />
                </div>
              </div>
              <div className="sm:col-span-3 px-6 mb-6">
                <p
                 
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 Selected Project Lead
                </p>
                <div className="bg-gray-200 px-6 py-4 mt-3">
            {projectLead ? (
              <div>
                <p className="mb-1.5">Name: {projectLead.name}</p>
                <p className="mb-1.5">Mobile: {projectLead.mobile}</p>
                <p className="mb-1.5">Email: {projectLead.companyEmail}</p>
                <p className="mb-1.5">Designation: {projectLead.designation}</p>
                <p className="mb-1.5">Specialized Field: {projectLead.specializedField}</p>
                <div className="flex w-full justify-end text-sm">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                  onClick={handleRemoveClick}
                >
                  Remove
                </button>
                </div>
              </div>
            ) : (
              <p>No Project Lead selected</p>
            )}
          </div>
                
              </div>
            </div>
            <h2 className="font-semibold text-lg mt-8">Project Estimators</h2>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <div className="sm:col-span-3 px-6 mb-6">
          <label
            htmlFor=""
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Project Estimator's Name
          </label>
          <div className="mt-2">
            <SearchForm onAddClick={handleEffortEstimators} />
          </div>
        </div>
        <div className="sm:col-span-3 px-6 mb-6">
          <p
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Project Estimators
          </p>
          <div className="bg-gray-200 px-6 py-4 mt-3">
            {effortEstimators.length > 0 ? (
              <ul>
                {effortEstimators.map((estimator) => (
                  <li key={estimator.id}>
                    {estimator.name} - {estimator.designation}
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => handleRemoveEffortEstimator(estimator.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Project Estimators selected</p>
            )}
          </div>
        </div>
      </div>

            <h2 className="font-semibold text-lg mt-8">Cost</h2>
            <div className=" ">
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
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
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <h2 className="font-semibold text-lg mt-8 mb-4">
                    RFP Resources
                  </h2>
                  <MyFileInput
                    id="rfpFiles"
                    onSelectFiles={handleSelectedFiles}
                  />
                </div>
                <div className="sm:col-span-6">
                  <h2 className="font-semibold text-lg mt-8 mb-4">
                    Outout From Inova
                  </h2>
                  <div className="">
                    <MyFileInput
                      id="outputFromInovaFiles"
                      onSelectFiles={handleSelectedFiles}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-8">
              <h2 className="font-semibold text-lg sm:col-span-3 px-6">
                To Do
              </h2>
              <div className=" flex sm:col-span-3 justify-end">
                <button
                  type="button"
                  className="bg-sky-400 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? "Hide Form" : "Add Task"}
                </button>
              </div>
            </div>
            {showForm && (
              <div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-3 px-6">
                    <label
                      htmlFor=""
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="sm:col-span-3 px-6">
                    <label>Description </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="sm:col-span-3 px-6">
                    <label>Date </label>
                    <input
                      type="date"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="bg-sky-400 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer"
                    type="button"
                    onClick={handleAddTodo}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            {todos.length > 0 && (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
                <thead className="text-xs text-black uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-gray">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo, index) => (
                    <tr
                      className="bg-white border-b  dark:border-gray-700"
                      key={index}
                    >
                      <td className="px-6 py-4">{todo.title}</td>
                      <td className="px-6 py-4">{todo.description}</td>
                      <td className="px-6 py-4">{todo.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <label>Notes: </label>
          <textarea
          name="todoNotes"
          id="todoNotes"
            rows={5}
            className="appearance-none w-full px-4 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-300"
            defaultValue={""}
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
          {/*  */}

          <Dialog
        open={confirmationOpen}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select status and priority and Project Lead before submitting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

          <button
            type="submit"
            className="bg-sky-400 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer mt-12"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectForm;
