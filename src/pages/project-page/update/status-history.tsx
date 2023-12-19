import React, { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
import {
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import AddTodoModal from "../../../components/models/todo-model";
import { APP_API_BASE_URL,  UpdateStatusHistory } from "../../../apis";
import ConfirmationDialog from "../../../components/update-confirm";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

interface StatusHistoryType {
  id: number;
 
  description: string;
  date: string;
  
}

const StatusHistory = ({ projectDetails }: { projectDetails: any }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenSnackbar = (
    severity: "success" | "error",
    message: string
  ) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleConfirmationDialogOpen = () => {
    setOpenConfirmationDialog(true);
  };

  const handleConfirmationDialogClose = () => {
    setOpenConfirmationDialog(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setStatusHistory(
      (projectDetails.statusHistoryList ?? []).map((status: UpdateStatusHistory) => ({
        id: status.id,
        description: status.description,
        date: status.date,
        
      }))
    );

   
  };
  const handleSaveClick = () => {
    handleConfirmationDialogOpen();
  };

  const handleUpdateAndSave = async () => {
    const url = `${APP_API_BASE_URL}/api/v1/statusHistory/update?projectId=${projectDetails.id}`;
    const requestData: StatusHistoryType[] = statusHistory.map((t) => ({
        id: t.id || -1,
        description: t.description || "",
        date: t.date ? new Date(t.date).toISOString() : "",
      }));

    try {
      const resp = await axios.put(url, requestData);
      setEditMode(false);
      handleOpenSnackbar("success", "Successfully updated!");
    } catch (error) {
      handleOpenSnackbar("error", "Failed to update. Please try again.");
    }
  };

  const [statusHistory, setStatusHistory] = useState<StatusHistoryType[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingStatusHistoryIndex, setEditingStatusHistoryIndex] = useState<number | null>(null);
  const [editStatusHistoryDetails, setEditStatusHistoryDetails] = useState<StatusHistoryType>({
    id: -1,
    description: "",
    date: "",
 
  });

  const [openFormDialog, setOpenFormDialog] = useState(false);

  // New state for managing the new StatusHistory details
  const [newStatusHistoryDetails, setNewStatusHistoryDetails] = useState<StatusHistoryType>({
    id: -1,
   
    description: "",
    date: "",
  
  });

  // New state for managing the visibility of the add StatusHistory modal
  const [openAddStatusHistoryDialog, setOpenAddStatusHistoryDialog] = useState(false);

  const handleRemoveClick = (index: number) => {
    handleOpenSnackbar("error", "Currently not avilable");

    // const updatedStatusHistory = [...statusHistory];
    // updatedStatusHistory.splice(index, 1);
    // setStatusHistory(updatedStatusHistory);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleUpdateClick = (index: number) => {
    setEditingStatusHistoryIndex(index);
    setEditStatusHistoryDetails(statusHistory[index]);
    setEditMode(true);
    setOpenFormDialog(true);
  };

  const handleAddStatusHistoryClick = () => {
    setNewStatusHistoryDetails({
      id: -1,
      description: "",
      date: "",

    });
    setOpenAddStatusHistoryDialog(true);
  };

  const handleAddStatusHistorySubmit = () => {
    const updatedStatusHistory = [...statusHistory, newStatusHistoryDetails];
    setStatusHistory(updatedStatusHistory);
    setOpenAddStatusHistoryDialog(false);
  };

  const handleUpdateStatusHistorySubmit = () => {
    const updatedStatusHistory = [...statusHistory];
    updatedStatusHistory[editingStatusHistoryIndex as number] = editStatusHistoryDetails;
    setStatusHistory(updatedStatusHistory);
    // setEditMode(false);
    setOpenFormDialog(false);
    setEditingStatusHistoryIndex(null);
    setEditStatusHistoryDetails({
      id: -1,

      description: "",
      date: "",

    });
  };

  useEffect(() => {
    if (projectDetails) {
      setStatusHistory(
        (projectDetails.statusHistoryList?? []).map((status: StatusHistoryType) => ({
          id: status.id,
          description: status.description,
          date: status.date,
       
        }))
      );

    }
  }, [projectDetails]);

  const handleSave = () => {
    // console.log(todos);
  };

  return (
    <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
      <form>
        <div className={"flex w-full h-12 mb-8"}>
          <div className={"w-full flex items-center "}>
            <h2 className="font-semibold text-lg ">Status History</h2>
          </div>
          <div className={" "}>
            {editMode && (
              <button
                type="button"
                className="bg-sky-400 w-44 text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer"
                // onClick={() => setShowForm(!showForm)}
                onClick={handleAddStatusHistoryClick}
                disabled={!editMode}
              >
                {showForm ? "Hide Form" : "Add latest Status"}
              </button>
            )}
          </div>
          <div className={"w-full flex justify-end mr-12 text-xl "}>
            {!editMode ? (
              <div
                className={
                  " border-2 rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 "
                }
                onClick={handleEditClick}
              >
                <GoPencil /> <span className={"text-sm mx-2"}>Update</span>
              </div>
            ) : (
              <div className={"flex"}>
                <div
                  className={
                    "border-2 rounded-full bg-gray-100 mr-6 px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28"
                  }
                  onClick={handleSaveClick}
                >
                  <IoSaveOutline /> <span className={"text-sm mx-2"}>Save</span>
                </div>
                <div
                  className={
                    "border-2 rounded-full bg-gray-100  px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28"
                  }
                  onClick={handleCancel}
                >
                  <MdOutlineCancel />{" "}
                  <span className={"text-sm mx-2"}>Cancel</span>
                </div>
              </div>
            )}
            {/*<div className={'border rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '} onClick={handleAddStatusHistoryClick}>*/}
            {/*    <GoPencil /> <span className={"text-sm mx-2"}>Add StatusHistory</span>*/}
            {/*</div>*/}
          </div>
        </div>

        {statusHistory.length > 0 && (
          <table className="table-auto mt-2 w-full mb-6">
            <thead>
              <tr>
               
                <th className="px-4 py-2"> Date</th>
                <th className="px-4 py-2">Description</th>
               
                <th className="px-4 py-2">Option</th>
              </tr>
            </thead>
            <tbody>
              {statusHistory.map((status, index) => (
                <tr className="border" key={index}>
                  
                  <td className="px-4 py-2">{status.date}</td>
                  <td className="px-4 py-2">{status.description}</td>
                  
                  <td className="px-4 py-2">
                    <div
                      className={`ml-2 text-indigo-500 ${
                        !editMode && "opacity-50 pointer-events-none"
                      } ${editMode && "hover:cursor-pointer"}`}
                      onClick={() => handleUpdateClick(index)}
                    >
                      Update
                    </div>
                    <div
                      className={`ml-2 text-red-500 ${
                        !editMode && "opacity-50 pointer-events-none"
                      } ${editMode && "hover:cursor-pointer"}`}
                      onClick={() => handleRemoveClick(index)}
                    >
                      Remove
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {editMode && editingStatusHistoryIndex !== null && (
          <Dialog
            open={openFormDialog}
            onClose={() => setOpenFormDialog(false)}
          >
            <DialogTitle>Edit StatusHistory</DialogTitle>
            <DialogContent>
            <TextField
                label=" Date"
                type="date"
                fullWidth
                value={editStatusHistoryDetails.date}
                onChange={(e) =>
                  setEditStatusHistoryDetails({
                    ...editStatusHistoryDetails,
                    date: e.target.value,
                  })
                }
                margin="normal"
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={editStatusHistoryDetails.description}
                onChange={(e) =>
                  setEditStatusHistoryDetails({
                    ...editStatusHistoryDetails,
                    description: e.target.value,
                  })
                }
                margin="normal"
              />
              
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleUpdateStatusHistorySubmit}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                onClick={() => setOpenFormDialog(false)}
                variant="outlined"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}

        <Dialog
          open={openAddStatusHistoryDialog}
          onClose={() => setOpenAddStatusHistoryDialog(false)}
        >
          <DialogTitle>Add StatusHistory</DialogTitle>
          <DialogContent>
          <TextField
              label="Date"
              type="date"
              fullWidth
              value={newStatusHistoryDetails.date}
              onChange={(e) =>
                setNewStatusHistoryDetails({ ...newStatusHistoryDetails, date: e.target.value })
              }
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newStatusHistoryDetails.description}
              onChange={(e) =>
                setNewStatusHistoryDetails({
                  ...newStatusHistoryDetails,
                  description: e.target.value,
                })
              }
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
           
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleAddStatusHistorySubmit}
              color="primary"
              className="bg-sky-400 text-white hover:bg-sky-500 px-4 py-2 text-xs rounded"
            >
              Add StatusHistory
            </button>
            <button
              onClick={() => setOpenAddStatusHistoryDialog(false)}
              // variant="outlined"
              className="border-sky-400  border px-4 py-2 text-xs rounded text-sky-400 hover:border-sky-500 hover:text-sky-500"
            >
              Cancel
            </button>
          </DialogActions>
        </Dialog>
       

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          open={openConfirmationDialog}
          onClose={handleConfirmationDialogClose}
          onConfirm={handleUpdateAndSave}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default StatusHistory;
