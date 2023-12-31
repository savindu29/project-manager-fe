import { Box, Chip, Divider, IconButton } from "@mui/material";

import Projects from "./project-details";
import HorizontalLinearAlternativeLabelStepper from "../../components/status-stepper/success";
import HorizontalStepperWithError from "../../components/status-stepper/unccess";
import { useEffect, useState } from "react";
import ContactCard from "../../components/person-contact-card/contact-card";
import { getProject, getStatusHistory } from "../../apis/project-api";
import ControlledAccordions from "../../components/accordian";
import Todo from "./todo-body";
import SpecialDocs from "./special-doc";

import OtherNotes from "./other-notes";
import CenterAlignedTimeline from "../../components/timeline";
import CustomizedTimeline from "../../components/timeline";



const formatDate = (inputDate?: string | null): string => {
  if (!inputDate) return "N/A";

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

interface LatestStatus {
    status: string | null;
    date: Date | null;
}
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formattedDate;
};


const ProjectDetail = ({ projectId }: any) => {
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [statusHistoryData,setStatusHistoryData] = useState<any>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProject(projectId);
        const statusHistoryResponse = await getStatusHistory(projectId);
        setProjectDetails(response.data);
        setStatusHistoryData(statusHistoryResponse.data);
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

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div className="flex h-screen pb-16 ml-4 ">
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
                    Initiation Date :{" "}
                    <span className="text-sky-600 font-medium">
                    {formatDate(projectDetails.initiationDate)}
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
                       {statusHistoryData[0].description}
                      </span>{" "}
                    </p>
                    <p className="text-sm">
                      Date :{" "}
                      <span className="text-sky-600 font-medium">
                        {" "}
                        {formatDate(statusHistoryData[0].date)}
                       
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
                >
                  <div className="flex justify-center">
                    {/* <CustomizedTimeline
                      statusHistoryList={projectDetails.statusHistoryList}
                    /> */}
                    <CustomizedTimeline
                      statusHistoryList={statusHistoryData}
                    />
                  </div>
                </div>
              </div>

              {/* client and responsible person contact cards */}
              <div className="mt-16 mb-2  ">
                <p className="font-medium	 text-xl underline">
                  Resource Details
                </p>
              </div>
              <div className="w-full   flex py-8">
                <div className="flex w-full ">
                  <div>
                    <h1 className="mb-4 font-medium	">Project Lead </h1>
                    <ContactCard personDetails={projectDetails.projectLead} />
                  </div>
                </div>
              </div>

              <div>
                <div className=" pb-16">
                  <h1 className=" mb-2 font-medium  ">
                    Effort Estimators 
                  </h1>
                  <div className="w-full   flex ">
                    {/* Assuming you are using React */}
                    <table className="w-full">
                      <tbody>
                        {projectDetails.effortEstimators.map(
                          (person: any, index: number) =>
                            // Display two ContactCard components per row
                            index % 2 === 0 && (
                              <tr key={index} className="flex mt-4">
                                <td className="w-1/2">
                                  <ContactCard personDetails={person} />
                                </td>
                                {/* Check if the next item exists before rendering */}
                                {projectDetails.effortEstimators[index + 1] && (
                                  <td className="w-1/2">
                                    <ContactCard
                                      personDetails={
                                        projectDetails.effortEstimators[
                                          index + 1
                                        ]
                                      }
                                    />
                                  </td>
                                )}
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-medium	 text-xl underline">Clients</p>
                <div className="flex  items-center  bg-white w-full">
                  {/* Grant Importer */}

                  <div className=" text-sm my-4   rounded-md border mr-4 px-6 py-4 w-1/2 bg-gray-100 ">
                    <h2 className="text-2xl font-bold mb-4">Client Details</h2>

                    <div className="mb-4">
                      <h3 className="font-bold mb-2">Organization Details</h3>
                      <p className="text-gray-700 mb-1">
                        Name: {projectDetails.grantClient.name}
                      </p>
                      <p className="text-gray-700 mb-1">
                        Country: {projectDetails.grantClient.country}
                      </p>
                    </div>

                    {projectDetails.grantClient.externalContactPerson && (
                      <div className="mb-4">
                        <h3 className="font-bold mb-1">
                          Contact Person Details
                        </h3>
                        <p className="text-gray-700 mb-1">
                          Name:{" "}
                          {
                            projectDetails.grantClient.externalContactPerson
                              .name
                          }
                        </p>
                        <p className="text-gray-700 mb-1">
                          Mobile:{" "}
                          {
                            projectDetails.grantClient.externalContactPerson
                              .mobile
                          }
                        </p>
                        <p className="text-gray-700 mb-1">
                          Fixed Tel:{" "}
                          {
                            projectDetails.grantClient.externalContactPerson
                              .fixTel
                          }
                        </p>
                        <p className="text-gray-700 mb-1">
                          Email:{" "}
                          {
                            projectDetails.grantClient.externalContactPerson
                              .companyEmail
                          }
                        </p>
                        <p className="text-gray-700 mb-1">
                          Designation:{" "}
                          {
                            projectDetails.grantClient.externalContactPerson
                              .designation
                          }
                        </p>
                        <p className="text-gray-700 mb-1">
                          Description:{" "}
                          {
                            projectDetails.grantClient.externalContactPerson
                              .description
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Intermediate Importer */}

                  {projectDetails.intermediateClient && (
                    <div className=" text-sm my-4   rounded-md border mr-4 px-6 py-4 w-1/2 bg-white ">
                      <h2 className="text-2xl font-bold mb-4">
                        Intermediate Client Details
                      </h2>

                      <div className="mb-4">
                        <h3 className="font-bold mb-2">Organization Details</h3>
                        <p className="text-gray-700 mb-1">
                          Name: {projectDetails.intermediateClient.name}
                        </p>
                        <p className="text-gray-700 mb-1">
                          Country: {projectDetails.intermediateClient.country}
                        </p>
                      </div>

                      {projectDetails.intermediateClient
                        .externalContactPerson && (
                        <div className="mb-4">
                          <h3 className="font-bold mb-1">
                            Contact Person Details
                          </h3>
                          <p className="text-gray-700 mb-1">
                            Name:{" "}
                            {
                              projectDetails.intermediateClient
                                .externalContactPerson.name
                            }
                          </p>
                          <p className="text-gray-700 mb-1">
                            Mobile:{" "}
                            {
                              projectDetails.intermediateClient
                                .externalContactPerson.mobile
                            }
                          </p>
                          <p className="text-gray-700 mb-1">
                            Fixed Tel:{" "}
                            {
                              projectDetails.intermediateClient
                                .externalContactPerson.fixTel
                            }
                          </p>
                          <p className="text-gray-700 mb-1">
                            Email:{" "}
                            {
                              projectDetails.intermediateClient
                                .externalContactPerson.companyEmail
                            }
                          </p>
                          <p className="text-gray-700 mb-1">
                            Designation:{" "}
                            {
                              projectDetails.intermediateClient
                                .externalContactPerson.designation
                            }
                          </p>
                          <p className="text-gray-700 mb-1">
                            Description:{" "}
                            {
                              projectDetails.intermediateClient
                                .externalContactPerson.description
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Key Milestone Dates */}
              <p className="font-medium	 text-xl underline mt-12">
                Key Milestone Dates
              </p>
              <div className=" w-full  px-8 py-6">
                <div className="flex w-full">
                  <div className="w-full">
                    <p>Proposal Due Date: </p>
                    <p className=" text-sky-500">
                    {formatDate(projectDetails.proposalDueDate)}
                      {/* { || emptyData}{" "} */}
                    </p>
                  </div>
                  <div className="w-full">
                    <p>Proposal Submitted Date: </p>
                    <p className=" text-sky-500">
                    {formatDate(projectDetails.proposalSubmittedDate)}
                      
                    </p>
                  </div>
                </div>
                {/* <div className="my-6"><hr /></div> */}
                <div className="flex w-full mt-12">
                  <div className="w-full">
                    <p>Proposed Implementation Start Date: </p>
                    <p className=" text-sky-500">
                     {formatDate(projectDetails.piStartDate)}
                   
                    </p>
                  </div>
                  <div className="w-full">
                    <p>Actual Implementation Start Date: </p>
                    <p className=" text-sky-500">
                    {formatDate(projectDetails.acStartDate)}
                      
                     
                    </p>
                  </div>
                </div>
                <div className="flex w-full mt-12">
                  <div className="w-full">
                    <p>Proposed Implementation End Date: </p>
                    <p className=" text-sky-500">
                    {formatDate(projectDetails.piEndDate)}
                      {/* {projectDetails.piEndDate || emptyData}{" "} */}
                    </p>
                  </div>

                  <div className="w-full">
                    <p>Implementation Due Date: </p>
                    <p className=" text-sky-500">
                    {formatDate(projectDetails.acImpDueDate)}
                      {/* {projectDetails.acEndDate || emptyData}{" "} */}
                    </p>
                  </div>
                </div>

                <div className="flex w-full mt-12">
                  <div className="w-full"></div>
                  <div className="w-full">
                    <p>Actual Implementation End Date: </p>
                    <p className=" text-sky-500">
                    
                    {formatDate(projectDetails.acEndDate)} 
                    </p>
                  </div>
                </div>
              </div>

              <div className=" w-full  px-8 py-6">
                <p className="font-medium	 text-xl underline mt-12">Cost</p>

                <div className="flex w-full mt-12">
                <div className="w-full">
                    <p>Effort Unit</p>
                    <p className=" text-sky-500">
                      {projectDetails.cost.workUnit =="MH"?"Man Hours":"Man Days" || emptyData}{" "}
                    </p>
                  </div>
                </div>

                
                <div className="flex w-full mt-12">
                
                  

                  <div className="w-full">
                    <p>Total Effort: </p>
                    <p className=" text-sky-500">
                      {projectDetails.cost.currencyUnit} &nbsp; 
                      {projectDetails.cost.totalEffortMh || emptyData}{" "} 
                    </p>
                  </div>
                  <div className="w-full">
                    <p>Quoted Value: </p>
                    <p className=" text-sky-500">
                    {projectDetails.cost.currencyUnit}  &nbsp; 
                      {projectDetails.cost.quotedValue || emptyData}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex w-full mt-12">
                  <div className="w-full">
                    <p>Quoted Rate:</p>
                    <p className=" text-sky-500">
                    {projectDetails.cost.currencyUnit}  &nbsp; 
                      {projectDetails.cost.quotedRate || emptyData}{" "}
                    </p>
                  </div>
                  <div className="w-full">
                    <p>AMC Value:</p>
                    <p className=" text-sky-500">
                    {projectDetails.cost.currencyUnit}  &nbsp; 
                      {projectDetails.cost.amcValue || emptyData}{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <ControlledAccordions
                  title="ToDO"
                  description="Pending Tasks"
                  body={<Todo todo={projectDetails.todo} />}
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                />
                <ControlledAccordions
                  title="Documents"
                  description="Special Documents"
                  body={<SpecialDocs projectDetails={projectDetails} />}
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                />
                <ControlledAccordions
                  title="Others"
                  description="Other notes"
                  body={<OtherNotes details={projectDetails}/>}
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
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
