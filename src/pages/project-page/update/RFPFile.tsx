import React, { useState } from 'react';
import axios from 'axios';
import MyFileInput from '../../../components/file-uploader';
import ConfirmationDialog from '../../../components/update-confirm';
import { Alert, Snackbar } from '@mui/material';
import { GoPencil } from 'react-icons/go';
import { IoSaveOutline } from 'react-icons/io5';
import { MdOutlineCancel } from 'react-icons/md';

interface FileType {
  project_id: number;
  description: string;
  file_base64_string: string;
  resource: string;
  type: string;
}

const UploadRFPFiles = ({ projectDetails }: { projectDetails: any }) => {
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenSnackbar = (severity: 'success' | 'error', message: string) => {
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

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Restore previous values
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleConfirmationDialogOpen();
  };

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSelectedFiles = (id: string, files: File[]) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = `http://localhost:8000/api/v1/documents/image-upload`;

      const filesData: FileType[] = await Promise.all(
        selectedFiles.map(async (file) => {
          const base64String = await fileToBase64(file);
          return {
            project_id: projectDetails.id,
            description: 'Some description', // Add your own description logic
            file_base64_string: base64String,
            resource: 'RFP', // Add your own resource logic
            type: getFileType(file),
          };
        })
      );

      // Make your API call with filesData
      const resp = await axios.post(url, { filesData });

      console.log(resp.data);
      setEditMode(false);
      handleOpenSnackbar('success', 'Successfully updated!');
    } catch (error) {
      console.error(error);
      handleOpenSnackbar('error', 'Failed to update. Please try again.');
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

  return (
    <div className={editMode ? 'px-12 py-8 white duration-500' : 'px-12 py-8 bg-zinc-100 duration-500 '}>
      <form action="">
        <div className={'flex w-full h-12 mb-4'}>
          <div className={'w-full flex items-center '}>
            <h2 className="font-semibold text-lg ">RFP Resources</h2>
          </div>
          <div className={'w-full flex justify-end mr-12 text-xl '}>
            {!editMode ? (
              <div
                className={
                  ' border  rounded-full px-3 flex justify-center items-center text-gray-700 hover:cursor-pointer hover:bg-gray-200 w-28 '
                }
                onClick={handleEditClick}
              >
                <GoPencil /> <span className={'text-sm mx-2'}>Update</span>
              </div>
            ) : (
              <div className={'flex'}>
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
                  onClick={handleCancel}
                >
                  <MdOutlineCancel /> <span className={'text-sm mx-2'}>Cancel</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-3 px-6">
            <div className="mt-2">
              <MyFileInput id="outputFromInovaFiles" onSelectFiles={handleSelectedFiles} isDisabled={!editMode} />
            </div>
          </div>

          {/* Confirmation Dialog */}
          <ConfirmationDialog open={openConfirmationDialog} onClose={handleConfirmationDialogClose} onConfirm={handleSubmit} />

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </form>
    </div>
  );
};

export default UploadRFPFiles;
