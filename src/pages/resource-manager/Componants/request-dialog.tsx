// RequestDialog.tsx
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

interface RequestDialogProps {
  onClose: () => void;
}


interface Project {
  name: string;
  status: string;
  allocatedDate: string;
  releaseDate: string;
  percentage: number;
}

const resourcesAllocated: Project[] = [
  {
    name: "Project 1",
    status: "Approved",
    allocatedDate: "2023-02-15",
    releaseDate: "2023-12-31",
    percentage: 40,
  },
  {
    name: "Project 2",
    status: "Pending",
    allocatedDate: "2023-05-15",
    releaseDate: "2023-10-31",
    percentage: 60,
  },

];
const RequestDialog: React.FC<RequestDialogProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-end items-center  py-10 pl-20 pr-4 z-50 ">
      <div className="bg-white p-6 rounded-md h-full w-5/6 relative">
        <button
          onClick={onClose}
          className="rounded py-1 px-3 absolute right-4 top-4"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="w-full h-full flex ">
          <div className="w-2/3 border-r border-zinc-300 px-4">
            <h2 className="text-lg font-semibold mb-4">Resource Name</h2>
            <table className="min-w-full  table-auto">
              <thead className="">
                <tr className="text-zinc-400 font-normal text-left">
                  <th className="p-2 font-normal text-sm">Project Name</th>
                  <th className="p-2 font-normal text-sm">Status</th>
                  <th className="p-2 font-normal text-sm">Allocated date</th>
                <th className="p-2 font-normal text-sm">Relese Date</th>
                <th className="p-2 font-normal text-sm">Perecentage</th>
                </tr>
              </thead>
              <tbody className="border-y border-gray-300 text-sm">
                {resourcesAllocated.map((project, index) => (
                  <tr key={index}>
                    <td className="border-b p-2 ">{project.name}</td>
                    <td className="border-b p-2  ">
                      <div
                        className={
                          " bg-green-700 flex text-white rounded py-1  w-28 pl-4 items-center text-xs"
                        }
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-2" />{" "}
                        {project.status}
                      </div>
                    </td>
                    <td className="border-b p-2">{project.allocatedDate}</td>
                    <td className="border-b p-2">{project.releaseDate}</td>
                    <td className="border-b p-2">{project.percentage}%</td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/3"></div>
        </div>
        {/* Add your content for the dialog here */}
      </div>
    </div>
  );
};

export default RequestDialog;
