import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Person {
    id: number;
    name: string;
    companyEmail: string;
    mobile: string;
    privateEmail: string;
    designation: string;
    specializedField: string;
}

function UpdatePersonDetails() {
    const [persons, setPersons] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<string>('');
    const [updatedDetails, setUpdatedDetails] = useState<Person>({
        id: 0,
        name: '',
        companyEmail: '',
        mobile: '',
        privateEmail: '',
        designation: '',
        specializedField: '',
    });

    useEffect(() => {
        // Fetch the list of persons from the Swagger API
        const fetchData = async () => {
            try {
                const response = await axios.get<Person[]>('YOUR_SWAGGER_API_URL');
                setPersons(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectPerson = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = e.target.value;
        setSelectedPerson(selectedName);

        // Find the selected person's details based on the name
        const selectedPersonDetails = persons.find((person) => person.name === selectedName);

        if (selectedPersonDetails) {
            // Populate the input fields with the selected person's details
            setUpdatedDetails({ ...selectedPersonDetails });
        }
    };

    const handleUpdateDetails = async () => {
        try {
            // Send a PUT request to update the person's details
            const response = await axios.put('YOUR_SWAGGER_API_URL', updatedDetails);

            // Handle the response as needed
            console.log('Details updated:', response.data);
        } catch (error) {
            console.error('Error updating details:', error);
        }
    };

    return (
        <div>
            <label>Select a person: </label>
            <select value={selectedPerson} onChange={handleSelectPerson}>
                <option value="">Select a person</option>
                {persons.map((person) => (
                    <option key={person.id} value={person.name}>
                        {person.name}
                    </option>
                ))}
            </select>

            <div>
                <input
                    type="text"
                    name="name"
                    value={updatedDetails.name}
                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, name: e.target.value })}
                />
                {/* Repeat the above input fields for other person details to update */}
            </div>
            <button onClick={handleUpdateDetails}>Update Details</button>
        </div>
    );
}

export default UpdatePersonDetails;
