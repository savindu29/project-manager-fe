import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Pagination,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { getEmployeesOptions } from "../../../apis";
import { getAllEmployees } from "../../../apis/emplyee";


type Person = {
  id:number,
  name: string,
  mobile: string,
  companyEmail: string,
  privateEmail: string,
  designation: string,
  specializedField: string
};
export default function EmployeeUpdateForm() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get<{ data: Person[] }>(
  //       "http://localhost:8000/api/v1/responsible-person/list"
  //     );
  //     const data = response.data.data;
  //     setPersons(data);

  //     if (data.length > 0) {
  //       setSelectedPerson(data[0]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const [page, setPage] = useState(1); // Initialize the active page
  const pageSize = 8; // Specify the fixed page size
  const [dataCount, setDatacount] = useState<number>(0);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const params: getEmployeesOptions = {
          searchtext: searchText,
          page,
          size: pageSize,
        };

        const response = await getAllEmployees(params);
        setPersons(response.data.data);
        setDatacount(response.data.count);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchPersons();
  }, [searchText, page, pageSize]);

  const handleSearchChange = (event:any) => {
    setSearchText(event.target.value);
  };
  const handleFormSubmit = (event:any) => {
    event.preventDefault();
    // You can perform additional actions on form submission if needed
  };


  const handleUpdateDetails = async () => {
    try {
      if (selectedPerson) {
        setConfirmationOpen(true);
      } else {
        console.error("No person selected.");
      }
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      const { id, ...dataWithoutId } = selectedPerson as Person;

      const response = await axios.put(
        `http://localhost:8000/api/v1/responsible-person/update/${selectedPerson?.id}`,
        dataWithoutId
      );

      console.log("Details updated:", response.data);

      setConfirmationOpen(false);
      setSnackbarOpen(true);
     // fetchPersons();
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage); // Update the active page when the page changes
  };
  return (
    <div className="flex  w-full h-screen">
      <div className="w-1/3 h-full bg-gray-100  p-4 overflow-y-auto rounded-md  mr-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg mb-5 text-center">
          All Employees
        </h2>
        <div className="flex w-full justify-center">
          <form className="flex items-center w-full px-4">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
  className="w-4 h-4 text-gray-500"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <circle cx="12" cy="7" r="4" />
  <path d="M2 20s1-3 6-3h8c5 0 6 3 6 3" />
</svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-white border  text-gray-900 text-sm rounded-lg   block w-full pl-10 py-2.5 placeholder-gray-400 focus:outline-none  focus:border-blue-300"
                placeholder="Search Employee ..."
                required
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg border  hover:bg-blue-600  focus:outline-none "
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>

        <ul className="mt-5 px-4 space-y-2">
          {persons.map((person) => (
            <li
              key={person.id}
              onClick={() => setSelectedPerson(person)}
              className={`cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
                selectedPerson?.id === person.id
                  ? "text-blue-500 font-semibold"
                  : "text-gray-700"
              } bg-white rounded-lg py-4 px-6 text-sm shadow-md hover:shadow-lg`}
            >
              {person.name} - <span className="text-xs">{person.designation}</span> 
            </li>
          ))}
        </ul>
        <div className="h-16 flex items-center justify-center absolute bottom-2 w-96">
        <Pagination
                  count={Math.ceil(dataCount / pageSize)}
                  page={page}
                  color="primary"
                  onChange={handlePageChange}
                />
        </div>
      </div>

      <div className="w-2/3 p-4 flex flex-col gap-8">
        <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg">
          Details
        </h2>
        {selectedPerson && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col w-full sm:w-1/2 px-4 mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="block w-full mt-3 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                  value={selectedPerson ? selectedPerson.name : ""}
                  onChange={(e) =>
                    setSelectedPerson(
                      selectedPerson
                        ? { ...selectedPerson, name: e.target.value }
                        : null
                    )
                  }
                />
              </div>

              <div className="flex flex-col w-full sm:w-1/2 px-4 mt-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="text"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 mt-3 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                  value={selectedPerson ? selectedPerson.mobile : ""}
                  onChange={(e) =>
                    setSelectedPerson(
                      selectedPerson
                        ? { ...selectedPerson, mobile: e.target.value }
                        : null
                    )
                  }
                />
              </div>
            </div>

            <div className="flex flex-col w-full px-4 mt-4">
              <label
                htmlFor="personalEmail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Personal Email address
              </label>
              <input
                id="personalEmail"
                name="personalEmail"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 mt-3 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                value={selectedPerson ? selectedPerson.privateEmail : ""}
                onChange={(e) =>
                  setSelectedPerson(
                    selectedPerson
                      ? { ...selectedPerson, privateEmail: e.target.value }
                      : null
                  )
                }
              />
            </div>

            <div className="flex flex-col w-full px-4 mt-4">
              <label
                htmlFor="companyEmail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Company Email Address
              </label>
              <input
                type="text"
                name="companyEmail"
                id="companyEmail"
                autoComplete="tel"
                className="block w-full rounded-md border-0 mt-3 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                value={selectedPerson ? selectedPerson.companyEmail : ""}
                onChange={(e) =>
                  setSelectedPerson(
                    selectedPerson
                      ? { ...selectedPerson, companyEmail: e.target.value }
                      : null
                  )
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col w-full sm:w-1/2 px-4 mt-4">
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  autoComplete="designation"
                  className="block w-full rounded-md border-0 mt-3 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                  value={selectedPerson ? selectedPerson.designation : ""}
                  onChange={(e) =>
                    setSelectedPerson(
                      selectedPerson
                        ? { ...selectedPerson, designation: e.target.value }
                        : null
                    )
                  }
                />
              </div>

              <div className="flex flex-col w-full sm:w-1/2 px-4 mt-4">
                <label
                  htmlFor="specializedField"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Specialized Areas
                </label>
                <input
                  type="text"
                  name="specializedField"
                  id="specializedField"
                  autoComplete="skills"
                  className="block w-full rounded-md border-0 mt-3 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                  value={selectedPerson ? selectedPerson.specializedField : ""}
                  onChange={(e) =>
                    setSelectedPerson(
                      selectedPerson
                        ? {
                            ...selectedPerson,
                            specializedField: e.target.value,
                          }
                        : null
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 flex items-center justify-end gap-x-6">
          <button
            onClick={handleUpdateDetails}
            className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
         {/* Update Confirmation Dialog */}
      <Dialog
        open={isConfirmationOpen}
        onClose={() => setConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notification */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Employee details updated successfully."
      />
      </div>
    </div>
  );
}
