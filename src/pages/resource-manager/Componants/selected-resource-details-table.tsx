import React, { useEffect, useState } from 'react';
import { fetchResourceDetails  } from '../../../apis/resource-manager-api';
interface ProjectAllocation {
  fromDate: string;
  toDate: string;
  project: string;
  approved: boolean;
}

interface ResourceDetailsPaneProps {
  resourceId: number; 
}

const ResourceDetailsPane: React.FC<ResourceDetailsPaneProps> = ({ resourceId }) => {
  const [resourceDetails, setResourceDetails] = useState<ProjectAllocation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResourceDetails(resourceId);
        setResourceDetails(data);
      } catch (error) {
        console.error('Error fetching resource details:', error);
      }
    };
  
    fetchData();
  }, [resourceId]);

  return (
    <div>
      <div className="mb-6 mt-4">
        <div className="mb-2 text-xs py-1 px-2 bg-green-600 text-white rounded w-56 text-center">
          Existing Project Allocations
        </div>
        <table className="min-w-full table-auto mt-4">
          <thead className="">
            <tr className="text-zinc-400 font-normal text-left">
              <th className="p-2 font-normal text-sm">Project</th>
              <th className="p-2 font-normal text-sm">Allocated Date</th>
              <th className="p-2 font-normal text-sm">Release Date</th>
              <th className="p-2 font-normal text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="border-y border-gray-300 text-sm">
            {resourceDetails.map((detail, projectIndex) => (
              <tr key={projectIndex}>
                <td className="border-b p-2">{detail.project}</td>
                <td className="border-b p-2">{detail.fromDate}</td>
                <td className="border-b p-2">{detail.toDate}</td>
                <td className="border-b p-2">{detail.approved ? 'Approved' : 'Not Approved'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceDetailsPane;