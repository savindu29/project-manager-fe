import React, { useState, useEffect } from 'react';

interface EditableDataItem {
  allocateDate: string;
  releaseDate: string;
  percentage: number;
  editable: boolean;
}

interface EditableTableProps {
    headers: string[];
    additionalFormElements?: React.ReactNode;
    editableData: EditableDataItem[];  
    setEditableData: React.Dispatch<React.SetStateAction<EditableDataItem[]>>;  
  }
  
const EditableTable: React.FC<EditableTableProps> = ({ headers, additionalFormElements }) => {
  const [editableData, setEditableData] = useState<EditableDataItem[]>([
    { allocateDate: '', releaseDate: '', percentage: 50, editable: false },
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

      <table className="min-w-full table-auto">
        {/* Table headers */}
        <thead>
          <tr>
            <th>Allocate Date</th>
            <th>Release Date</th>
            <th>Percentage</th>
            <th>Select</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {editableData.map((data, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={data.allocateDate}
                  onChange={(e) => handleInputChange(index, 'allocateDate', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={data.releaseDate}
                  onChange={(e) => handleInputChange(index, 'releaseDate', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={data.percentage}
                  onChange={(e) => handleInputChange(index, 'percentage', Number(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={data.editable}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Additional form elements */}
      {/* Role select */}
      <label htmlFor="role">Role:</label>
      <select id="role">
        <option value="role1">Role 1</option>
        <option value="role2">Role 2</option>
      </select>
      {/* Note textarea */}
      <label htmlFor="note">Note:</label>
      <textarea id="note"></textarea>
      {/* Send Request button */}
      <button onClick={handleSendRequest}>Send Request</button>
    </div>
  );
};

export default EditableTable;
