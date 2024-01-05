import React, { useState } from "react";
import { StopCircleIcon } from "@heroicons/react/20/solid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";


interface Project {
  id: number;
  name: string;
}

interface Resource {
  id: number;
  name: string;
  status: string;
  allocatedProjects: Project[];
  pendingProjects: Project[];
}

interface ResourceTableProps {
  resources: Resource[];
  onCheckboxChange: (id: number, name: string) => void;
  onRequestButtonClick: () => void;
  checkedResourcesIds:number[];
  itemsPerPage?: number;
}

const ResourceTable: React.FC<ResourceTableProps> = ({
  resources,
  onCheckboxChange,
  onRequestButtonClick,
  checkedResourcesIds,
  itemsPerPage = 5,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentResources = resources.slice(startIndex, endIndex);

  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {/* <TableCell>Status</TableCell> */}
            <TableCell>Allocated Projects</TableCell>
            <TableCell>Pending Projects</TableCell>
            <TableCell>Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentResources.map((resource, index) => (
            <tr key={index}>
              <TableCell>
                <div className="flex items-center">
                <input
          type="checkbox"
          
          onChange={() => onCheckboxChange(resource.id, resource.name)}
        />
                  {resource.name}
                </div>
              </TableCell>
              {/* <TableCell>
                <div
                  className={
                    "bg-violet-600 flex text-white rounded py-1 w-28 pl-4 items-center text-xs"
                  }
                >
                  <StopCircleIcon className="h-4 w-4 mr-2" />
                  {resource.status}
                </div>
              </TableCell> */}
              <TableCell>
                <div className="flex">
                  {resource.allocatedProjects.map((project, projectIndex) => (
                    <div
                      key={projectIndex}
                      className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-violet-300 -mr-2 border-2 border-white"
                    >
                      {project.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex">
                  {resource.pendingProjects.map((project, projectIndex) => (
                    <div
                      key={projectIndex}
                      className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-violet-300 -mr-2 border-2 border-white"
                    >
                      {project.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                </div>
              </TableCell>
              {/* <TableCell>
                <button
                  className="bg-violet-500 flex text-white rounded py-1 px-3  justify-center items-center text-xs"
                  onClick={onRequestButtonClick}
                >
                  Request
                </button>
              </TableCell> */}
            </tr>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={resources.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ResourceTable;