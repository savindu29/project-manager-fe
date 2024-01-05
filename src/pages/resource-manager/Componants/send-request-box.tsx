import React, { useState, useEffect } from 'react';

interface EditableDataItem {
  allocateDate: string;
  releaseDate: string;
  percentage: number;
  editable: boolean;
}

interface EditableTableProps {
  allocateDate: string;
  releaseDate: string;
  employeeId: number;
  editable: boolean;
    
  }
  
const EditableTable: React.FC<EditableTableProps> = () => {
  const [editableData, setEditableData] = useState<EditableDataItem[]>([
    { allocateDate: '', releaseDate: '', percentage: 50, editable: true },
  ]);

  const handleInputChange = (index: number, field: keyof EditableDataItem, value: string | number) => {
    const newData = [...editableData];
    newData[index] = {
      ...newData[index],
      [field]: value,
    };
    setEditableData(newData);
  };
  
  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newData = [...editableData];
    newData[index].editable = checked;
    setEditableData(newData);
  };

  const handleSendRequest = () => {
    // Handle sending the request with the editable data to the API
    console.log('Sending request with data:', editableData);
  };

  

  return (
    <div>
    {/*  Editable Table */}
    <div className="  mb-2 text-xs py-1 px-2 bg-purple-600 text-white rounded w-56 text-center">
    Request To Current Project 
    </div>
    <table className="min-w-full table-auto">
      <thead className="">
        <tr className="text-zinc-400 font-normal text-left my-0 py-1">
          <th className="p-2 font-normal text-sm">Allocate Date</th>
          <th className="p-2 font-normal text-sm">Date From</th>
          <th className="p-2 font-normal text-sm">Date To</th>
          <th className="p-2 font-normal text-sm">Select</th>
        </tr>
      </thead>
      <tbody className="border-y border-gray-300 text-sm">
        {/* Render editable rows */}
        {editableData.map((data, index) => (
          <tr key={index}>
            <td className="border-b p-0.5 ">
              <input
                className="px-4 py-2 border rounded-md   focus:outline-none  focus:border-zinc-300 "
                type="date"
                style={{ width: "176px" }}
                value={data.allocateDate}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "allocateDate",
                    e.target.value
                  )
                }
              />
            </td>
            <td className="border-b p-2 ">
              <input
                className="px-4 py-2 border rounded-md   focus:outline-none  focus:border-zinc-300 "
                type="date"
                style={{ width: "176px" }}
                value={data.releaseDate}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "releaseDate",
                    e.target.value
                  )
                }
              />
            </td>
            <td className="border-b p-2 ">
              <input
                className="px-4 py-2 border rounded-md   focus:outline-none  focus:border-zinc-300"
                type="number"
                placeholder="Request %"
                style={{ width: "130px" }}
                value={Math.min(100, Math.max(0, data.percentage))}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "percentage",
                    Math.min(
                      100,
                      Math.max(0, Number(e.target.value))
                    )
                  )
                }
              />
            </td>
            <td className="border-b p-2  ">
              <input
                className="ml-6"
                type="checkbox"
                checked={data.editable}
                onChange={(e) =>
                  handleCheckboxChange(index, e.target.checked)
                }
                style={{ transform: "scale(1.5)" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-4 flex flex-col">
      <label
        htmlFor="role"
        className="block text-sm font-normal text-zinc-400"
      >
        Role:
      </label>
      <select
        id="role"
        className="px-4 py-2 border rounded-md   focus:outline-none  focus:border-zinc-300 w-1/2"
      >
        {/* Add options for roles */}
        <option value="role1">Role 1</option>
        <option value="role2">Role 2</option>
      </select>

      <label
        htmlFor="note"
        className="block mt-4 text-sm font-normal text-zinc-400"
      >
        Note:
      </label>
      <div className="flex items-end">
        <div className="flex-grow pr-2">
          <textarea
            id="note"
            className="w-full p-2 border border-gray-300 rounded-md"
            // Add onChange or value props
          />
        </div>

        <div className="flex-none ml-4 mb-2">
          <button
            className="p-2 text-xs px-3 bg-purple-600 text-white rounded-md "
            //   onClick={handleSendRequest} // Add the function to handle the button click
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  
    </div>
  );
};

export default EditableTable;
