import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MiniDrawer from "../../../layout";
import { Button, TextField } from "@mui/material";
import { getProject,updateProject } from "../../../apis/project-api";

const UpdateProject = () => {
  const { id } = useParams();
  const projectId = parseInt(id || '', 10);

  const navigate = useNavigate();

  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editedProjectDetails, setEditedProjectDetails] = useState<any>({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProject(projectId);
        setProjectDetails(response);
        setEditedProjectDetails(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const emptyData = 'No Data';

  const handleSave = async () => {
    try {
      await updateProject(editedProjectDetails);
      // Fetch the updated project details after saving
      const updatedResponse = await getProject(projectId);
      setProjectDetails(updatedResponse.data);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };
  
  const handleCancelEdit = () => {
    setEditedProjectDetails({ ...projectDetails });
  };

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    setEditedProjectDetails((prevDetails: any) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

 return (
  <div className="flex h-screen pb-16">
    <MiniDrawer />
    <div className="overflow-y-scroll w-full flex pr-8 my-2 text-gray-700">
      <div className="w-full">
      {loading ? (
            <p>Loading...</p>
        ) : (
          <>
          <div className="w-full">
      {/* heading */}
      <h1 className="font-semibold text-2xl">
                  Update <span className="text-sky-600 font-medium">{projectDetails?.name || emptyData}</span> Here!
                </h1>
      <p className="text-sm mt-2">
      {projectDetails?.grantClient?.name} -{" "}
                  <span>
                    {projectDetails?.grantClient?.country || emptyData}
                  </span>
      </p>
    </div>
            <div className="w-full flex justify-end items-end">
              <p>
                Initiation Date:{" "}
                <span className="text-sky-600 font-medium">
                  {projectDetails?.initiationDate || emptyData}
                </span>{" "}
              </p>
            </div>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              name="priority"
              label="Priority"
              value={editedProjectDetails?.priority || projectDetails?.priority || emptyData}
              onChange={handleChange}
              InputLabelProps={{
                style: { fontSize: '20px' } // Adjust the fontSize value as needed
              }}
            />
 
 <div className="px-8 py-6">
  <p>Status</p>  <br />
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <TextField
      name="date"
      label="Date"
      value={editedProjectDetails?.date || projectDetails?.date || emptyData}
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
    <TextField
      name="currentStatus"
      label="Current Status"
      value={editedProjectDetails?.currentStatus || projectDetails?.currentStatus || emptyData}
      onChange={handleChange}
      fullWidth
    />
  </div>
</div>

                  <div className="px-8 py-6">
        <p>Values</p>
                  <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
          <TextField
            name="totalEffortMh"
            label="Total Effort (MD/MH)"
            value={editedProjectDetails?.totalEffortMh || emptyData}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="quotedValue"
            label="Quoted Value"
            value={editedProjectDetails?.quotedValue || emptyData}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="quotedRate"
            label="Quoted Rate"
            value={editedProjectDetails?.quotedRate || emptyData}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="amcValue"
            label="AMC Value"
            value={editedProjectDetails?.amcValue || emptyData}
            onChange={handleChange}
            fullWidth
          />
        </div>
      </div>
   

      <div>
      <div className="px-8 py-6">
        <p>Special Dates</p>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
  <TextField
    name="piStartDate"
    label="Proposed Implementation Start Date"
    value={editedProjectDetails.piStartDate || emptyData}
    onChange={handleChange}
    fullWidth
  />
  <TextField
    name="acStartDate"
    label="Actual Implementation Start Date"
    value={editedProjectDetails.acStartDate || emptyData}
    onChange={handleChange}
    fullWidth
  />
  <TextField
    name="piEndDate"
    label="Proposed Implementation End Date"
    value={editedProjectDetails.piEndDate || emptyData}
    onChange={handleChange}
    fullWidth
  />
  <TextField
    name="acEndDate"
    label="Implementation Due Date"
    value={editedProjectDetails.acEndDate || emptyData}
    onChange={handleChange}
    fullWidth
  />
</div>      </div>
      </div>
      <div className="px-8 py-6">
              <div className="mt-4">
                <Button variant="contained" size="large" color="primary" onClick={handleSave}>
                  Save
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="outlined" size="large"color="primary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
              </div>
          </>
        )}
      </div>
    </div>
  </div>
);

};

export default UpdateProject;