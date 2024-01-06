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
  Typography,
} from "@mui/material";

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
}

const ResourceTable: React.FC<ResourceTableProps> = ({
  resources,
  itemsPerPage = 5,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

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

  const [checkedResources, setCheckedResources] = useState<Resource[]>([]);

  const handleCheckboxChange = (resource: Resource) => {
    const isChecked = checkedResources.some((r) => r.id === resource.id);

    if (isChecked) {
      setCheckedResources((prev) => prev.filter((r) => r.id !== resource.id));
    } else {
      setCheckedResources((prev) => [...prev, resource]);
    }
  };

  const isRequestAllDisabled = false;

  const handleRequestAll = () => {
    console.log(checkedResources)
    openRequestDialog();
  };

  const openRequestDialog = () => {
    setRequestDialogOpen(true);
  };

  const closeRequestDialog = () => {
    setRequestDialogOpen(false);
  };

  const [isRequestDialogOpen, setRequestDialogOpen] = useState(false);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
           
              <TableCell><Typography  fontWeight="bold" fontSize="14px">Name </Typography></TableCell>
              <TableCell><Typography fontWeight="bold" fontSize="14px">Skills</Typography></TableCell>
              <TableCell><Typography  fontWeight="bold" fontSize="14px">Certification</Typography></TableCell>
              <TableCell><Typography  fontWeight="bold" fontSize="14px">Allocated Projects</Typography></TableCell>
              <TableCell><Typography  fontWeight="bold" fontSize="14px">Pending Projects</Typography></TableCell>
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
    </div>
  );
};

export default ResourceTable;