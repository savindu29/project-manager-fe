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
  Typography,
  Button,
} from "@mui/material";
import { ResourceSkill } from "../resource-employees-page";
import EmployeeDetailsPopup from './EmployeeDetailsPopup'; // Assuming the popup is in the same directory

interface ResourceSkillSTableProps {
  resourceSkills: ResourceSkill[];
  itemsPerPage?: number;
}

const ResourceSkillSTable: React.FC<ResourceSkillSTableProps> = ({
  resourceSkills,
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

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const handleOpenEmployeeDetails = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
  };

  const handleCloseEmployeeDetails = () => {
    setSelectedEmployeeId(null);
  };

  const isEmployeeDetailsPopupOpen = selectedEmployeeId !== null;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%" }}>
                <Typography fontWeight="bold" fontSize="14px">
                  Reg. Id
                </Typography>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <Typography fontWeight="bold" fontSize="14px">
                  Name
                </Typography>
              </TableCell>
              <TableCell style={{ width: "40%" }}>
                <Typography fontWeight="bold" fontSize="14px">
                  Skills
                </Typography>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <Typography fontWeight="bold" fontSize="14px">
                  Certification
                </Typography>
              </TableCell>
              <TableCell style={{ width: "20%" }}>
                <Typography fontWeight="bold" fontSize="14px">
                  Details
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceSkills.slice(startIndex, endIndex).map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.id}</TableCell>
                <TableCell>{resource.name}</TableCell>
                <TableCell>
                  <div className="flex">
                    {resource.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="rounded text-sm bg-purple-600 text-white text-semibold px-2 py-1 mx-1"
                      >
                        {skill.specification}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{/* Add certification information here */}</TableCell>
                <TableCell>
                  <button
                    className="bg-green-600 text-sm text-white text-medium px-3 py-1 rounded"
                    onClick={() => handleOpenEmployeeDetails(resource.id)}
                  >
                    Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={resourceSkills.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {isEmployeeDetailsPopupOpen && (
        <EmployeeDetailsPopup
          employeeId={selectedEmployeeId!}
          onClose={handleCloseEmployeeDetails}
        />
      )}
    </div>
  );
};

export default ResourceSkillSTable;
