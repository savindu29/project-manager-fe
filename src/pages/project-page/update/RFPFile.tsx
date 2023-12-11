import React, { useState } from 'react';
import axios from 'axios';
import MyFileInput from '../../../components/file-uploader';

interface FileType {
    project_id: number,
    description: string;
    file_base64_string: string;
    resource: string;
    type: string;
}

const UploadRFPFiles = () => {
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
                        project_id: 2,
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

    return (
        <div className="mt-8">
           
                <div className="">
                    <MyFileInput id="outputFromInovaFiles" onSelectFiles={handleSelectedFiles} isDisabled={false} />
                </div>
                <button onClick={handleSubmit} className=' bg-red-500 text-white mt-4 px-4 py-2 rounded'>Submit</button>
            
        </div>
    );
};

export default UploadRFPFiles;
