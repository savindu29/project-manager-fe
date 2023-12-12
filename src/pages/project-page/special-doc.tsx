import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface JsonFileFormat {
  id: number;
  description: string;
  type: string; // Add the 'type' property
}

const SpecialDocs = ({ projectDetails }: { projectDetails: any }) => {
  const [currentRFPFiles, setCurrentRFPFiles] = useState<JsonFileFormat[]>([]);
  const [currentOFIFiles, setCurrentOFIFiles] = useState<JsonFileFormat[]>([]);
  const [displayedContent, setDisplayedContent] = useState<string | null>(null);

  const handleRFPDownloadClick = async (docId: number, fileName: string, fileType: string) => {
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
  const handleOFIDownloadClick = async (docId: number, fileName: string, fileType: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/documents/get?docId=${docId}&type=OFI`);

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
      setCurrentRFPFiles(
        (projectDetails.rfpResource ?? []).map((status: JsonFileFormat) => ({
          id: status.id,
          description: status.description,
          type: status.type,
        }))
      );

      setCurrentOFIFiles(
        (projectDetails.outputsFromInova ?? []).map((status: JsonFileFormat) => ({
          id: status.id,
          description: status.description,
          type: status.type,
        }))
      );
    }
    
  }, [projectDetails]);

  return (
    <div className=''>
      <div>
        <h1 className='mt-10'>RFP Resources : </h1>
        <table className="table-auto border w-full mt-10 mb-6">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {currentRFPFiles.map((status, index) => (
              <tr className="border" key={index}>
                <td className="px-4 py-2">{status.description}</td>
                <td className="px-4 py-2">{status.type}</td>
                <td className="px-4 py-2">
                  <div className='flex justify-center'>
                    <div
                      className={`ml-2 text-indigo-500 mr-8 hover:cursor-pointer`}
                      onClick={() => handleRFPDownloadClick(status.id, status.description, status.type)}
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
      <div>
        <h1 className='mt-10'>Output From Inova</h1>

        <table className="table-auto border w-full mt-10 mb-6">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {currentOFIFiles.map((status, index) => (
              <tr className="border" key={index}>
                <td className="px-4 py-2">{status.description}</td>
                <td className="px-4 py-2">{status.type}</td>
                <td className="px-4 py-2">
                  <div className='flex justify-center'>
                    <div
                      className={`ml-2 text-indigo-500 mr-8 hover:cursor-pointer`}
                      onClick={() => handleOFIDownloadClick(status.id, status.description, status.type)}
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
  );
};

export default SpecialDocs;
