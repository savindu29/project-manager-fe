import React, { useState } from "react";
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
import RequestDialog from "./request-dialog";

interface Project {
  id: number;
  name: string;
}

export interface Resource {
  id: number;
  name: string;
  status: string;
  allocatedProjects: Project[];
  pendingProjects: Project[];
}

interface ResourceTableProps {
  resources: Resource[];
  itemsPerPage?: number;
  dateFrom:Date | null;
  dateTo:Date | null;
}

const ResourceTable: React.FC<ResourceTableProps> = ({
  resources,
  dateFrom,
  dateTo,
  itemsPerPage = 10,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
  const [checkedResources, setCheckedResources] = useState<{ [key: number]: boolean }>({});
  const [isRequestDialogOpen, setRequestDialogOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentResources = resources.slice(startIndex, endIndex);

  const isRequestAllDisabled = false;

  const handleCheckboxChange = (resource: Resource) => {
    setCheckedResources((prev) => {
      const isChecked = !!prev[resource.id];
  
      return {
        ...prev,
        [resource.id]: !isChecked,
      };
    });
  };
 
  const handleRequestAll = () => {
    openRequestDialog();
  };

  const openRequestDialog = () => {
    setRequestDialogOpen(true);
  };

  const closeRequestDialog = () => {
    setRequestDialogOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Allocated Projects</TableCell>
              <TableCell>Pending Projects</TableCell>
      
            </TableRow>
          </TableHead>
          <TableBody>
            {currentResources.map((resource, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={!!checkedResources[resource.id]}
                      onChange={() => handleCheckboxChange(resource)}
                    />
                    {resource.name}
                  </div>
                </TableCell>
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
              </TableRow>
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
      <div className="mt-6 flex justify-end">
        <button
          className={`rounded py-2 px-4 text-xs ${
            isRequestAllDisabled
              ? "bg-gray-400 text-gray-700"
              : "bg-violet-500 text-white"
          }`}
          onClick={handleRequestAll}
          disabled={isRequestAllDisabled}
        >
          Request All
        </button>
      </div>
      {isRequestDialogOpen && (
        <RequestDialog
          isOpen={isRequestDialogOpen}
          onClose={closeRequestDialog}
          checkedResources={checkedResources}
          resources={resources}
          dateFrom={dateFrom}
          dateTo={dateTo}

        />
      )}
    </div>
  );
};

export default ResourceTable;
