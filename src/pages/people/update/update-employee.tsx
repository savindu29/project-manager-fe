import React, {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";



export default function EmployeeUpdateForm() {

    interface Person {
        id: number;
        name: string;
        companyEmail: string;
        mobile: string;
        privateEmail: string;
        designation: string;
        specializedField: string;
    }

    const [persons, setPersons] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<string>('Roshen')
    const [updatedDetails, setUpdatedDetails] = useState<Person>({
        id: 16,
        name: 'Roshen',
        companyEmail: '',
        mobile: '',
        privateEmail: '',
        designation: '',
        specializedField: '',
    });

    // useEffect(() => {
    //     // Fetch the list of persons from the Swagger API
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get<Person[]>('YOUR_SWAGGER_API_URL');
    //             setPersons(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // const handleSelectPerson = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedName = e.target.value;
    //
    //     // Find the selected person based on the name
    //     const selectedPersonDetails = persons.find((person) => person.name === selectedName);
    //
    //     if (selectedPersonDetails) {
    //         setSelectedPerson(selectedPersonDetails);
    //         setUpdatedDetails({ ...selectedPersonDetails });
    //     }
    // };

    const getAPIData = async () => {
        const URL = "http://localhost:8000/api/v1/responsible-person/list";
        try {
            const result = await fetch(URL);
            if (result.ok) {
                const data = await result.json();
                // Handle the data as needed
                console.log(data);
            } else {
                console.error('Failed to fetch data:', result.status, result.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        useEffect(()=>{
            getAPIData()
        },[])

    };



    // const handleUpdateDetails = async () => {
    //     try {
    //         // Send a PUT request to update the person's details
    //         const response = await axios.put('http://localhost:8000/api/v1/responsible-person/list', updatedDetails);
    //
    //         // Handle the response as needed
    //         console.log('Details updated:', response.data);
    //     } catch (error) {
    //         console.error('Error updating details:', error);
    //     }
    // };
    return (
        <div>
            <label>Select a person: </label>
            {/*<select value={selectedPerson?.name} onChange={handleSelectPerson}>*/}
            {/*    <option value="">Select a person</option>*/}
            {/*    {persons.map((person) => (*/}
            {/*        <option key={person.id} value={person.name}>*/}
            {/*            {person.name}*/}
            {/*        </option>*/}
            {/*    ))}*/}

            {/*</select>*/}

            <select value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)}>

                <option value={"Roshen"}> Roshen </option>
                <option value={"Savindu Panagoda"}> Savindu </option>
            </select>


            <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                        value={updatedDetails.name}
                        onChange={(e) => setUpdatedDetails({ ...updatedDetails, name: e.target.value })}

                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                    />
                </div>
            </div>

            <div className="sm:col-span-4">
                <label htmlFor="companyEmail" className="block text-sm font-medium leading-6 text-gray-900">
                    Company Email address
                </label>
                <div className="mt-2">
                    <input
                        id="companyEmail"
                        name="companyEmail"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                        value={updatedDetails.companyEmail}
                        onChange={(e) => setUpdatedDetails({ ...updatedDetails, companyEmail: e.target.value })}

                    />
                </div>
            </div>

            <div className="sm:col-span-4">
                <label htmlFor="personalEmail" className="block text-sm font-medium leading-6 text-gray-900">
                    Personal Email address
                </label>
                <div className="mt-2">
                    <input
                        id="personalEmail"
                        name="personalEmail"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                        value={updatedDetails.privateEmail}
                        onChange={(e) => setUpdatedDetails({ ...updatedDetails, privateEmail: e.target.value })}

                    />
                </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                    Mobile Number
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                        value={updatedDetails.mobile}
                        onChange={(e) => setUpdatedDetails({ ...updatedDetails, mobile: e.target.value })}
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">
                    Designation
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="designation"
                        id="designation"
                        autoComplete="designation"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                        value={updatedDetails.designation}
                        onChange={(e) => setUpdatedDetails({ ...updatedDetails, designation: e.target.value })}
                    />
                </div>
            </div>

            <div className="col-span-full">
                <label htmlFor="skills" className="block text-sm font-medium leading-6 text-gray-900">
                    Specialized Areas
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="skills"
                        id="skills"
                        autoComplete="skills"
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                        value={updatedDetails.specializedField}
                        onChange={(e) => setUpdatedDetails({ ...updatedDetails, specializedField: e.target.value })}

                    />
                </div>
            <button
                // onClick={handleUpdateDetails}
                className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

            >
                Update Details
            </button>
        </div>
        </div>

    )
}
