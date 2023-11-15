import { Box, Chip, Divider, IconButton } from "@mui/material";

import Projects from "./project-details";
import HorizontalLinearAlternativeLabelStepper from "../../components/status-stepper/success";
import HorizontalStepperWithError from "../../components/status-stepper/unccess";
import { useEffect, useState } from "react";
import ContactCard from "../../components/person-contact-card/contact-card";
import { getProject } from "../../apis/project-api";
import ControlledAccordions from "../../components/accordian";
import Todo from "./todo-body";
import SpecialDocs from "./special-doc";
import LeftAlignedTimeline from "../../components/timeline";


const ProjectDetail = ({ projectId }: any) => {
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProject(projectId);
        setProjectDetails(response.data);
        setLoading(false); // Data is loaded, set loading to false
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false); // Loading should be set to false even in case of an error
      }
    };
    fetchProjects();
  }, [projectId]);

  const [statusHistory, setStatusHistory] = useState(false);
  const handleStatusHistory = () => {
    setStatusHistory(!statusHistory);
  };
  const emptyData = "Not set the Data";
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="flex h-screen pb-16">
      <div className="overflow-y-scroll w-full flex pr-8 my-2 text-gray-700 ">
        <div className="w-full">
          {loading ? ( // Show a loading indicator or message while loading
            <p>Loading...</p>
          ) : (
            <>
              <div className="flex w-full ">
                
                <div className="w-full  ">
              
                
                  {/* heading */}
                  <h1 className="font-semibold text-2xl">
                    {projectDetails.name || emptyData}
                  </h1>
                  <p className="text-sm mt-2">
                    {projectDetails.grantClient.name} -{" "}
                    <span>
                      {" "}
                      {projectDetails.grantClient.country || emptyData}
                    </span>
                  </p>
                </div>
                
                
                <div className="w-full flex justify-end items-end">
                  <p>
                    Initiation Date:{" "}
                    <span className="text-sky-600 font-medium">
                      {projectDetails.initiationDate || emptyData}
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="text-sm mt-1 mb-3">
                <p>
                  Priority :{" "}
                  <span className="text-sky-600 font-medium">
                    {projectDetails.priority.name || emptyData}{" "}
                  </span>
                </p>
                <div className="my-12">
                  {projectDetails.projectStatus.stageCode < 90 ? (
                    <HorizontalLinearAlternativeLabelStepper
                      stage={projectDetails.projectStatus.stageCode}
                    />
                  ) : (
                    <HorizontalStepperWithError />
                  )}
                </div>
              </div>

              {/* latest status */}
              <div className=" mt-1 mb-3 w-full">
                <div className="flex w-full">
                  <div className="w-full">
                    <p className="font-medium text-lg mt-4">
                      Latest Project Status
                    </p>
                    <p className="text-sm mt-2">
                      Status :{" "}
                      <span className="text-sky-600 font-medium">
                        Proposal sent to VS One
                      </span>{" "}
                    </p>
                    <p className="text-sm">
                      Date :{" "}
                      <span className="text-sky-600 font-medium">
                        {" "}
                        19-Oct-2023
                      </span>
                    </p>
                  </div>
                  <div className="w-full flex items-end justify-center">
                    <div>
                      <Chip
                        className="hover:cursor-pointer"
                        label={` ${
                          !statusHistory
                            ? "View Recent Status History"
                            : "Hide Recent Status History"
                        }`}
                        onClick={handleStatusHistory}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full  py-6  mt-6 duration-300 rounded-xl ${
                    statusHistory ? "block" : "hidden"
                  }`}
                ><div className="">
  <LeftAlignedTimeline statusHistoryList={projectDetails.statusHistoryList}/>
                </div>

                
                </div>
              </div>

              {/* client and responsible person contact cards */}
              <div className="w-full   flex py-8">
                <div className="flex w-full ">
                  <div>
                    <h1 className="text-center mb-4 font-medium">
                      Assigned Person
                    </h1>
                    <ContactCard personDetails={projectDetails.projectLead} />
                  </div>
                </div>
                <div className="flex w-full ">
                  <div>
                    <h1 className="text-center mb-4 font-medium">Client</h1>
                    <ContactCard
                      personDetails={
                        projectDetails.grantClient.externalContactPerson
                      }
                    />
                  </div>
                </div>
              </div>
              <div className=" w-full  px-8 py-6">
                <div className="flex w-full">
                  <div className="w-full">
                    <p>Proposal Due Date: </p>
                    <p className=" text-sky-500">
                      {projectDetails.proposalDueDate || emptyData}{" "}
                    </p>
                  </div>
                  <div className="w-full">
                    <p>Proposal Submitted Date: </p>
                    <p className=" text-sky-500">
                      {projectDetails.proposalSubmittedDate || emptyData}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex w-full mt-12">
                  <div className="w-full">
                    <p>Total Effort (MD/MH): </p>
                    <p className=" text-sky-500">
                      {projectDetails.cost.totalEffortMh || emptyData}{" "}
                    </p>
                  </div>
                  <div className="w-full">
                    <p>Quoted Value: </p>
                    <p className=" text-sky-500">
                      {projectDetails.cost.quotedValue || emptyData}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex w-full mt-12">
                  <div className="w-full">
                    <p>Quoted Rate:</p>
                    <p className=" text-sky-500">
                      {projectDetails.cost.quotedRate || emptyData}{" "}
                    </p>
                  </div>
                  <div className="w-full">
                    <p>AMC Value:</p>
                    <p className=" text-sky-500">
                      {projectDetails.cost.amcValue || emptyData}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {/* client and responsible person contact cards */}
                <div className="py-16">
                  <h1 className=" mb-4 font-medium  mb-6">
                    Effort Estimators:
                  </h1>
                  <div className="w-full   flex ">
                    <div className="w-full flex ">
                      {projectDetails.effortEstimators.map((person: any) => (
                        <div className="w-full flex  ">
                          <ContactCard key={person.id} personDetails={person} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Dates */}

              <div className=" w-full  px-8 py-6">
                <div className="flex w-full">
                  <div className="w-full">
                    <p>Proposed Implementation Start Date: </p>
                    <p className=" text-sky-500">
                      {projectDetails.piStartDate || emptyData}{" "}
                    </p>
                  </div>
                  <div className="w-full">
                    <p>Actual Implementation Start Date: </p>
                    <p className=" text-sky-500">
                      {projectDetails.acStartDate || emptyData}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex w-full mt-12">
                  <div className="w-full">
                    <p>Proposed Implementation End Date: </p>
                    <p className=" text-sky-500">
                      {projectDetails.piEndDate || emptyData}{" "}
                    </p>
                  </div>

                  <div className="w-full">
                    <p>Implementation Due Date: </p>
                    <p className=" text-sky-500">
                      {projectDetails.acEndDate || emptyData}{" "}
                    </p>
                  </div>
                </div>

                <div className="flex w-full mt-12">
                  <div className="w-full"></div>
                  <div className="w-full">
                    <p>Actual Implementation End Date: </p>
                    <p className=" text-sky-500">
                      {projectDetails.acEndDate || emptyData}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div>
      <ControlledAccordions
        title="ToDO"
        description="Pending Tasks"
        body={<Todo todo={projectDetails.todo }/>}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      />
      <ControlledAccordions
        title="Documents"
        description="Special Documents"
        body={<SpecialDocs/>}
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      />
    </div>
    <div className="h-20"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;