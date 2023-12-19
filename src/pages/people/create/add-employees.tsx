import {useState} from "react";
import axios, {AxiosError} from "axios";
import Alert from '@mui/material/Alert';
import { Collapse, Snackbar } from "@mui/material";
import { open } from "fs";
import {APP_API_BASE_URL} from "../../../apis";

const url = `${APP_API_BASE_URL}/api/v1/responsible-person/create`


export default function EmployeeCreateForm() {
  const [name, setName] = useState('');
  const [companyEmail, setEmail] = useState('');
  const [mobile, setMobileNumber] = useState('');
  const [privateEmail, setPemail] = useState('');
  const [designation, setDesignation] = useState('');
  const [specializedField, setSpecializedArea] = useState('');
  const [message, setMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const resp = await axios.post(url,{
        name:name,
        companyEmail:companyEmail,
        mobile:mobile,
        privateEmail: privateEmail,
        designation: designation,
        specializedField: specializedField
      });

      setSuccessMessage("Submission was successful.");
      setName("");
      setSpecializedArea("");
      setEmail("");
      setDesignation("");
      setPemail("");
      setMobileNumber("")
      console.log(resp.data);

    }catch (error:any ) {

      console.log(error.response);
    }

  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
       

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Information</h2>

          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
               Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            </div>

            

            <div className="sm:col-span-3">
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
                  onChange={(e) => setEmail(e.target.value)}
                  value={companyEmail}

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
                  onChange={(e) => setPemail(e.target.value)}
                  value={privateEmail}

                />
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
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
                  onChange={(e) => setMobileNumber(e.target.value)}
                  value={mobile}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
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
                  onChange={(e) => setDesignation(e.target.value)}
                  value={designation}
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
                  onChange={(e) => setSpecializedArea(e.target.value)}
                  value={specializedField}

                />
              </div>
            </div>
          </div>
        </div>

       
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="bg-black  text-semibold text-xs text-white px-4 py-2 rounded hover:cursor-pointer">
                
        
          Save
        </button>
       
      </div>

     
    </form>
  )
}
