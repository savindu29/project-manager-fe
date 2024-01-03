// RequestDialog.tsx
import { XMarkIcon, StopCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";


interface RequestDialogProps {
  onClose: () => void;
  isOpen: boolean;
  checkedResourceNames: string[];
}

interface Project {
  id: number;
  name: string;
}

interface Resource {
  name: string;
  status: string;
  allocatedProjects: Project[];
  pendingProjects: Project[];
}

const resourcesAllocated: Resource[] = [
  {
    name: "Resource1",
    status: "Active",
    allocatedProjects: [
      { id: 1, name: "A Project " },
      { id: 2, name: "B Project " },
      { id: 3, name: "C Project " },
    ],
    pendingProjects: [
      { id: 3, name: "Project C" },
      { id: 4, name: "Project D" },
      { id: 5, name: "Project B" },
    ],
  },
  {
    name: "Resource2",
    status: "Inactive",
    allocatedProjects: [
      { id: 5, name: "Project E" },
      { id: 6, name: "Project F" },
    ],
    pendingProjects: [
      { id: 7, name: "Project G" },
      { id: 8, name: "Project H" },
    ],
  },
];

const RequestDialog: React.FC<RequestDialogProps> = ({ isOpen,onClose, checkedResourceNames }) => {
  const [addedData, setAddedData] = useState<{
    dateFrom: string;
    dateTo: string;
    percentage: string[];
  }[]>([]);
  
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    percentage: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddData = () => {
    setAddedData((prevData) => [...prevData, formData]);
    setFormData({
      dateFrom: "",
      dateTo: "",
      percentage: [] as string[],
    });
  };
  const handleClearData = () => {
    setAddedData([]);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-end items-center py-10 pl-20 pr-4 z-50 ">
      <div className="bg-white p-6 rounded-md h-full w-5/6 relative">
        <button
          onClick={onClose}
          className="rounded py-1 px-3 absolute right-4 top-4"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="w-full h-full flex ">
          <div className="w-2/3 border-r border-zinc-300 px-4">
            <h2 className="text-lg font-semibold mb-4"> {checkedResourceNames.length > 0
                ? ` ${checkedResourceNames.join(', ')}`
                : 'Resource Name'}
            </h2>
            <table className="min-w-full  table-auto">
              <thead className="">
                <tr className="text-zinc-400 font-normal text-left">
                  <th className="p-2 font-normal text-sm">Name</th>
                  <th className="p-2 font-normal text-sm">Status</th>
                  <th className="p-2 font-normal text-sm">
                    Allocated Projects
                  </th>
                  <th className="p-2 font-normal text-sm">Pending Projects</th>
                  <th className="p-2 font-normal text-sm">Request</th>
                </tr>
              </thead>
              <tbody className="border-y border-gray-300 text-sm">
                {resourcesAllocated.map((resource, index) => (
                  <tr key={index}>
                    <td className="border-b p-2 ">{resource.name}</td>
                    <td className="border-b p-2  ">
                      <div
                        className={
                          "bg-violet-600 flex text-white rounded py-1 w-28 pl-4 items-center text-xs"
                        }
                      >
                        <StopCircleIcon className="h-4 w-4 mr-2" />{" "}
                        {resource.status}
                      </div>
                    </td>
                    <td className="border-b p-2 ">
                      <div className="flex">
                        {resource.allocatedProjects.map(
                          (project, projectIndex) => (
                            <div
                              key={projectIndex}
                              className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-violet-300 -mr-2 border-2 border-white"
                            >
                              {project.name.charAt(0).toUpperCase()}
                            </div>
                          )
                        )}
                      </div>
                    </td>
                    <td className="border-b p-2 ">
                      <div className="flex">
                        {resource.pendingProjects.map(
                          (project, projectIndex) => (
                            <div
                              key={projectIndex}
                              className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-violet-300 -mr-2 border-2 border-white"
                            >
                              {project.name.charAt(0).toUpperCase()}
                            </div>
                          )
                        )}
                      </div>
                    </td>
                    <td className="border-b p-2 ">
                      <button className="bg-violet-500 flex text-white rounded py-1 px-3  justify-center items-center text-xs">
                        Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/3">
  <div className="container mx-auto p-4">
    <div className="flex flex-col space-y-4">
      <div className="flex">
        <div className="flex flex-col mr-4">
          <label className="p-2 font-normal text-sm">Date From:</label>
          <input
            type="date"
            name="dateFrom"
            value={formData.dateFrom}
            onChange={handleInputChange}
            className="p-2 border rounded w-40"
          />
        </div>

        <div className="flex flex-col">
          <label className="p-2 font-normal text-sm">Date To:</label>
          <input
            type="date"
            name="dateTo"
            value={formData.dateTo}
            onChange={handleInputChange}
            className="p-2 border rounded w-40"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="p-2 font-normal text-sm">Percentage:</label>
        <input
          type="number"
          name="percentage"
          value={formData.percentage}
          onChange={handleInputChange}
          placeholder="Percentage"
          className="p-2 border rounded"
        />
      </div>

      <div className="flex space-x-4 mt-4">
      <button onClick={handleAddData} className="bg-green-500 flex text-white rounded py-1 px-3 justify-center items-center text-xs">
  Add Data
</button>
<button onClick={handleClearData} className="bg-red-500 flex text-white rounded py-1 px-3 justify-center items-center text-xs">
  Clear Data
</button>

      </div>
    </div>

    <div className="mt-4 overflow-y-auto max-h-48">
  <h3 className="text-lg font-semibold mb-4">Added Requests:</h3>
  <ul className="list-disc list-inside">
    {addedData.map((data, index) => (
      <li key={index} className="mb-2 text-sm text-zinc-500">
        {`Date From: ${data.dateFrom}, Date To: ${data.dateTo}, Percentage: ${data.percentage}%`}
      </li>
    ))}
  </ul>
</div>


  </div>
</div>

        </div>

      
      </div>
    </div>
  );
};

export default RequestDialog;