import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface JsonFileFormat {
  id: number;
  description: string;
}

const SpecialDocs = ({ projectDetails }: { projectDetails: any }) => {
  const [currentFiles, setCurrentFiles] = useState<JsonFileFormat[]>([]);
  const [displayedContent, setDisplayedContent] = useState<string | null>(null);

  const handleViewClick = async (docId: number) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/documents/get?docId=${docId}&type=RFP`);

      if (response.data.code === 200) {
        

        // Set the decoded data to be displayed
        setDisplayedContent(response.data.data);
        console.log(response.data.data)
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
              <th className="px-4 py-2">Option</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {currentFiles.map((status, index) => (
              <tr className="border" key={index}>
                <td className="px-4 py-2">{status.description}</td>
                <td className="px-4 py-2">type</td>
                <td className="px-4 py-2">
                  <div className='flex justify-center'>
                    <div
                      className={`ml-2 text-indigo-500 mr-8 hover:cursor-pointer`}
                      onClick={() => handleViewClick(status.id)}
                    >
                      View
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
        {/* Display the content below the table */}
        {displayedContent && (
          <div dangerouslySetInnerHTML={{ __html: displayedContent }} />
        )}
      </div>
    </div>
  );
};

export default SpecialDocs;
