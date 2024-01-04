import React, { useState } from "react";
import WorkPerecentageCurrent from "./work-perecentage-current";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";

interface Employee {
  name: string;
  status: string;
  allocated_date: string;
  released_date: string;
  percentage: number;
}

interface EmployeeTableProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  toggleEmployeeDetails: (employee: Employee) => void;
  itemsPerPage?: number;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  selectedEmployee,
  toggleEmployeeDetails,
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
  const currentEmployees = employees.slice(startIndex, endIndex);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Allocated date</TableCell>
            <TableCell>Release Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentEmployees.map((employee, index) => (
            <React.Fragment key={index}>
              <TableRow >
                <TableCell>
                  <button
                    className="hover:underline"
                    onClick={() => toggleEmployeeDetails(employee)}
                  >
                    {employee.name}
                  </button>
                </TableCell>
                <TableCell>
                  <div className="bg-green-700 flex text-white rounded py-1 w-28 pl-4 items-center text-xs">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    {employee.status}
                  </div>
                </TableCell>
                <TableCell>{employee.allocated_date}</TableCell>
                <TableCell>{employee.released_date}</TableCell>
              </TableRow>
              {selectedEmployee && selectedEmployee.name === employee.name && (
                <TableRow>
                  <TableCell colSpan={4} className="p-2 duration-300 pl-12">
                    <WorkPerecentageCurrent />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default EmployeeTable;
