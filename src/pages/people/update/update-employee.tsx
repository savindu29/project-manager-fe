import React, {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import CustomizedInputBase from "../../../components/search";
import CustomizedInput from "../../../components/search/update-emplyee";



export default function EmployeeUpdateForm() {

    interface Person {
        id: any;
        name: string;
        companyEmail: string;
        mobile: string;
        privateEmail: string;
        designation: string;
        specializedField: string;
    }
    const [persons, setPersons] = useState<Person[]>([]); // Stores the list of persons
    
    const [names, setNames] = useState<string[]>([]);
    const [selectedName, setSelectedName] = useState<string>('');
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);


    useEffect(() => {
        // Fetch the list of persons from the Swagger API
        const fetchData = async () => {
            try {
                const response = await axios.get<{ data: Person[] }>("http://localhost:8000/api/v1/responsible-person/list");
                const data = response.data.data; // Extract the 'data' property from the response

                setPersons(data);
                console.log("persons",persons)// Set 'persons' to the array of persons

                if (data.length > 0) {
                    // Set the selected name to the first name in the list by default
                    setSelectedName(data[0].name);
                    console.log(selectedName)
                    setSelectedPerson(data[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const handleSelectName = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setSelectedName(selected);

        // Find the selected person's details based on the name
        const selectedPersonDetails = persons.find((person) => person.name === selected);

        setSelectedPerson(selectedPersonDetails || null);
        // Ensure that selectedPerson is set to null if no person is found
    }

    const handleSelectPerson = (selectedPerson: Person| null) => {
        setSelectedPerson(selectedPerson);
      };
    




    const handleUpdateDetails = async () => {
        try {
            if (selectedPerson) {
                // Exclude the id when sending the request
                const { id, ...dataWithoutId } = selectedPerson;

                // Send a PUT request to update the person's details
                const response = await axios.put(`http://localhost:8000/api/v1/responsible-person/update/${selectedPerson.id}`, dataWithoutId);

                // Handle the response as needed
                console.log('Details updated:', response.data);
            } else {
                console.error('No person selected.');
            }
        } catch (error) {
            console.error('Error updating details:', error);
        }
    };

    return (
        <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg mb-11">Update Inova Persons</h2>            <div className="flex">
            <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto mr-5 rounded-md shadow-lg">
            
            <div className="flex justify-center">
                <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg mb-3 font-serif">
                    Names
                </h2>
            </div>
            <CustomizedInput />
            <ul className="mt-5">
                {persons.map((person) => (
                <li
                    key={person.id}
                    onClick={() => handleSelectPerson(person)}
                    className={`cursor-pointer ${
                    selectedPerson?.id === person.id ? "text-blue-500" : ""
                    }`}
                >
                    {person.name}
                </li>
                ))}
            </ul>
            </div>
    
            <div className="w-3/4 p-4 ">
                <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg">
                    Details
                </h2>
                
                {selectedPerson && (
                    <div >
                        <div className="flex gap-8 mt-5">
                            <div className="flex flex-col w-full" >
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                                </label>
                                <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                                value={selectedPerson ? selectedPerson.name : ''}
                                onChange={(e) => setSelectedPerson(selectedPerson
                                    ? { ...selectedPerson, name: e.target.value }
                                    : null)}
                                />
                            </div>

                            <div className="flex flex-col w-full ">
                                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                                Mobile Number
                                </label>
                                <input
                                id="mobile"
                                name="mobile"
                                type="text"
                                autoComplete="tel"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                                value={selectedPerson ? selectedPerson.mobile : ''}
                                onChange={(e) => setSelectedPerson(selectedPerson
                                    ? { ...selectedPerson, mobile: e.target.value }
                                    : null)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mt-5">
                            <label htmlFor="personalEmail" className="block text-sm font-medium leading-6 text-gray-900">
                            Personal Email address
                            </label>
                            <input
                            id="personalEmail"
                            name="personalEmail"
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                            value={selectedPerson ? selectedPerson.privateEmail : ''}
                            onChange={(e) => setSelectedPerson(selectedPerson
                                ? { ...selectedPerson, privateEmail: e.target.value }
                                : null)}
                            />
                        </div>

                        <div className="flex flex-col mt-5 ">
                            <label htmlFor="companyEmail" className="block text-sm font-medium leading-6 text-gray-900">
                            Company Email Address
                            </label>
                            <input
                            type="text"
                            name="companyEmail"
                            id="companyEmail"
                            autoComplete="tel"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                            value={selectedPerson ? selectedPerson.companyEmail : ''}
                            onChange={(e) => setSelectedPerson(selectedPerson
                                ? { ...selectedPerson, companyEmail: e.target.value }
                                : null)}
                            />
                        </div>
                         <div className="flex gap-8 mt-5">
                            <div className="flex flex-col w-full ">
                            <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">
                            Designation
                            </label>
                            <input
                            type="text"
                            name="designation"
                            id="designation"
                            autoComplete="designation"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                            value={selectedPerson ? selectedPerson.designation : ''}
                            onChange={(e) => setSelectedPerson(selectedPerson
                                ? { ...selectedPerson, designation: e.target.value }
                                : null)}
                            />
                            </div>

                            <div className="flex flex-col w-full">
                                <label htmlFor="specializedField" className="block text-sm font-medium leading-6 text-gray-900">
                                Specialized Areas
                                </label>
                                <input
                                type="text"
                                name="specializedField"
                                id="specializedField"
                                autoComplete="skills"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                                value={selectedPerson ? selectedPerson.specializedField : ''}
                                onChange={(e) => setSelectedPerson(selectedPerson
                                    ? { ...selectedPerson, specializedField: e.target.value }
                                    : null)}
                                />
                            </div>
                        </div>

                    
                    </div>
                )}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                    onClick={handleUpdateDetails}
                    className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Update
                    </button>
                </div>
                </div>



        </div>
    </div>                        

    )
}
