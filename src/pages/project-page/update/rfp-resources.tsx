import React, { useEffect, useState } from 'react';
import { GoPencil } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
import MyFileInput from "../../../components/file-uploader";
import axios from 'axios';
import ConfirmationDialog from '../../../components/update-confirm';
import { Alert, Snackbar } from '@mui/material';
import { MdOutlineCancel } from 'react-icons/md';

interface FileType {
  project_id: number;
  description: string;
  file_base64_string: string;
  resource: string;
  type: string;
}

interface JsonFileFormat {
  
  id: number;
  description: string;
  type: string; // Add the 'type' property
}

const RFPResources = ({ projectDetails }: { projectDetails: any }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ file: File; description: string }[]>([]);
  const [currentFiles, setCurrentFiles] = useState<JsonFileFormat[]>([]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenSnackbar = (severity: 'success' | 'error', message: string) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleConfirmationDialogOpen = () => {
    setOpenConfirmationDialog(true);
  };

  const handleConfirmationDialogClose = () => {
    setOpenConfirmationDialog(false);
  };

 

  const handleSaveClick = () => {
    handleConfirmationDialogOpen();
  };

  const handleSelectedFiles = (id: string, files: { file: File; description: string }[]) => {
    setSelectedFiles(files);
  };

  const getFileType = (file: File): string => {
    const fileType = file.type.toLowerCase();
    if (fileType.includes('image')) {
      return 'IMAGE';
    } else if (fileType.includes('pdf')) {
      return 'PDF';
    } else if (fileType.includes('excel') || fileType.includes('csv')) {
      return 'EXCEL';
    }
    return 'UNKNOWN';
  };

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:8000/api/v1/documents/image-upload`;

      const filesData: FileType[] = await Promise.all(
        selectedFiles.map(async ({ file, description }) => {
          const base64String = await fileToBase64(file);
          return {
            project_id: projectDetails.id,
            description: description,
            file_base64_string: base64String,
            resource: 'RFP',
            type: getFileType(file),
          };
        })
      );

      try {
        const resp = await axios.post(url, filesData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (resp.status === 200) {
          setEditMode(false);
          handleOpenSnackbar('success', 'Successfully updated!');
        } else {
          setEditMode(false);
          handleOpenSnackbar('error', 'Failed to update. Please try again.');
        }
      } catch (error) {
        handleOpenSnackbar('error', 'Failed to update. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject('Error converting file to base64');
        }
      };
      reader.onerror = reject;
    });
  };


  
   
   
  
    const handleDownloadClick = async (docId: number, fileName: string, fileType: string) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/documents/get?docId=${docId}&type=RFP`);
  
        if (response.data.code === 200) {
          const base64Data = response.data.data;
  
          // Decode base64 data
          const binaryData = atob(base64Data);
  
          // Create a blob from the binary data
          const blob = new Blob([new Uint8Array(binaryData.split('').map((char) => char.charCodeAt(0)))], {
            type: response.data.contentType,
          });
  
          // Create a link element and trigger a download
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${fileName}.${fileType.toLowerCase()}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error('Error fetching document:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
  
    useEffect(() => {
      if (projectDetails) {
        setCurrentFiles(
          (projectDetails.rfpResource ?? []).map((status: JsonFileFormat) => ({
            id: status.id,
            description: status.description,
            type: status.type,
          }))
        );
      }
    }, [projectDetails]);


  return (
    <div className={editMode ? "px-12 py-8 white" : "px-12 py-8 bg-zinc-100"}>
      <form action="">
        <div className={"flex w-full h-12 mb-4"}>
          <div className={"w-full flex items-center "}><h2 className="font-semibold text-lg ">RFP Resources</h2></div>
          <div className={"w-full flex justify-end mr-12 text-xl "}>
            {!editMode ? (
              <div
                className={' border  rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '}
                onClick={handleEditClick}
              >
                <GoPencil /> <span className={'text-sm mx-2'}>Update</span>
              </div>
            ) : (
              <div className={"flex"}>
                <div
                  className={
                    'border rounded-full bg-gray-100 mr-6 px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28'
                  }
                  onClick={handleSaveClick}
                >
                  <IoSaveOutline /> <span className={'text-sm mx-2'}>Save</span>
                </div>
                <div
                  className={
                    'border rounded-full bg-gray-100  px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28'
                  }
                >
                  <MdOutlineCancel /> <span className={'text-sm mx-2'}>Cancel</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <div className="">
              <MyFileInput id="rfpResources" onSelectFiles={handleSelectedFiles} isDisabled={!editMode} />
            </div>

            <table className="table-auto border w-full mt-10 mb-6">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {currentFiles.map((status, index) => (
              <tr className="border" key={index}>
                <td className="px-4 py-2">{status.description}</td>
                <td className="px-4 py-2">{status.type}</td>
                <td className="px-4 py-2">
                  <div className='flex justify-center'>
                    <div
                      className={`ml-2 text-indigo-500 mr-8 hover:cursor-pointer`}
                      onClick={() => handleDownloadClick(status.id, status.description, status.type)}
                    >
                      Download
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
        <ConfirmationDialog
          open={openConfirmationDialog}
          onClose={handleConfirmationDialogClose}
          onConfirm={handleSubmit}
        />

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default RFPResources;
