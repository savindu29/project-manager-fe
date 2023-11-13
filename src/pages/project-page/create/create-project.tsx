import React, {useState} from 'react';
import MiniDrawer from '../../../layout';
import { styled } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CreateSearch from '../../../components/search/createSearch';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];



const CreateProject = () => {
  const [visible,SetChecked]=useState(false);

    const checkBox = () =>{
        SetChecked(!visible)
    }

    const checkBox2 =() =>{
        setVisible(!visiblity)
    }

    const checkbox3 = () =>{
        setVisi(!a)
    }

    const checkbox4 = () =>{
        setv(!b)
    }
    
    
    const [age, setAge] = React.useState('');
    
    const [showForm, setShowForm] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [todos, setTodos] = useState<{ title: string; description: string; date: string }[]>([]);

    const handleAddTodo = () => {
        if (title && description && date) {
          setTodos([...todos, { title, description, date }]);
          // Clear the form after adding a todo
          setTitle('');
          setDescription('');
          setDate('');
          setShowForm(false)
        }
      };
    


    const [b, setv] = useState(false);

    const [visiblity, setVisible] = useState(false);

    const [a, setVisi] = useState(false);

    const [personName, setPersonName] = React.useState<string[]>([]);

    const [personNames, setPersonNames] = React.useState<string[]>([]);


    const handleChanges = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChanges2 = (event: SelectChangeEvent<typeof personNames>) => {
        const {
            target: { value },
        } = event;
        setPersonNames(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const Example = () => {
        const [startDate, setStartDate] = useState(new Date());}
  
  return (
    <div className="space-y-12" >
            <div >
                
                <div className="text">
                    New Project
                </div>
                <form>
                    <h2 className="font-semibold text-lg">Project Details</h2>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Project Name</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                            <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Initiation Date</label>
                                <div className="mt-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                            <DatePicker 
                                            
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                                                "& .MuiOutlinedInput-root": {
                                                 "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                                 height: "35px",
                                                 borderRadius: "6px",
                                                },
                                               }}                                        />
                                           
                                        </LocalizationProvider>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Project Priority</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Project Status</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Latest Project Status</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                            <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Status Date</label>
                                <div className="mt-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                            <DatePicker 
                                            
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                                                "& .MuiOutlinedInput-root": {
                                                 "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                                 height: "35px",
                                                 borderRadius: "6px",
                                                },
                                               }}                                        />
                                           
                                        </LocalizationProvider>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Proposal Due Date Date</label>
                                <div className="mt-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                            <DatePicker 
                                            
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                                                "& .MuiOutlinedInput-root": {
                                                 "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                                 height: "35px",
                                                 borderRadius: "6px",
                                                },
                                               }}                                        />
                                           
                                        </LocalizationProvider>
                                </div>
                            </div> 
                            <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Proposal Submitted Date</label>
                                <div className="mt-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                            <DatePicker 
                                            
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                                                "& .MuiOutlinedInput-root": {
                                                 "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                                 height: "35px",
                                                 borderRadius: "6px",
                                                },
                                               }}                                        />
                                           
                                        </LocalizationProvider>
                                </div>
                            </div> 
                            <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Proposed Implementation Start Date</label>
                                <div className="mt-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                            <DatePicker 
                                            
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                                                "& .MuiOutlinedInput-root": {
                                                 "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                                 height: "35px",
                                                 borderRadius: "6px",
                                                },
                                               }}                                        />
                                           
                                        </LocalizationProvider>
                                </div>
                            </div>            
                            <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Proposed Implimentaion End Date</label>
                                <div className="mt-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                            <DatePicker 
                                            
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                                                "& .MuiOutlinedInput-root": {
                                                 "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                                 height: "35px",
                                                 borderRadius: "6px",
                                                },
                                               }}                                        />
                                           
                                        </LocalizationProvider>
                                </div>
                            </div>    
                            <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Actual Implementaion Start Date</label>
                                <div className="mt-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                            <DatePicker 
                                            
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                                                "& .MuiOutlinedInput-root": {
                                                 "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                                 height: "35px",
                                                 borderRadius: "6px",
                                                },
                                               }}                                        />
                                           
                                        </LocalizationProvider>
                                </div>
                            </div> 
                            <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Implimentaion Due Date</label>
                                <div className="mt-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                            <DatePicker 
                                            
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                                                "& .MuiOutlinedInput-root": {
                                                 "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                                 height: "35px",
                                                 borderRadius: "6px",
                                                },
                                               }}                                        />
                                           
                                        </LocalizationProvider>
                                </div>
                            </div> 
                            <div className="sm:col-span-3">
                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Actual Implimentaion End Date</label>
                                <div className="mt-2">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            
                                            <DatePicker 
                                            
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
                                                "& .MuiOutlinedInput-root": {
                                                 "&:hover > fieldset": { borderColor: "#C7C8CD" },
                                                 height: "35px",
                                                 borderRadius: "6px",
                                                },
                                               }}                                        />
                                           
                                        </LocalizationProvider>
                                </div>
                            </div>  
                            <div className="sm:col-span-4 mb-6">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Clarification Discussion Details</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-10 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>    
                            
                        </div>
                        <h2 className="font-semibold text-lg mt-6">Client Details</h2>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Client Name</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                </div>

                                <div className="sm:col-span-4 flex items-center">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 mr-2 ">New Client</label>
                                
                                    <input type="checkbox" value="1" checked={visible} onChange={checkBox}
                                    />

                                    
                                </div>
                                </div>
                                { visible &&
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Client Name</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Client Country</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Contact Person Name</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Mobile Number</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Fix Telephone Number</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Designation</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                </div>
                                }

                                <div className="sm:col-span-4 flex items-center mt-6">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 mr-2 ">Is this a Third Party Project</label>
                                
                                    <input type="checkbox" value="1" checked={visiblity} onChange={checkBox2}
                                    />
                                </div>
                                {visiblity &&
                                <div>
                                     <h2 className="font-semibold text-lg mt-6">Intermediary client Details</h2>
                                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Intermediary Client Name</label>
                                                <div className="mt-2"> 
                                                    <input
                                                        type="text"
                                                        
                                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                                    />
                                                 </div>
                                            </div>

                                                <div className="sm:col-span-4 flex items-center">
                                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 mr-2 ">New Intermediary Client</label>
                                                
                                                    <input type="checkbox" value="1" checked={a} onChange={checkbox3}
                                                    />

                                                    
                                                </div>
                                            </div>
                                            { a &&
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Intermediary Client Name</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Intermediary Client Country</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Intermediary Contact Person Name</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Intermediary Person's Email</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Mobile Number</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Fix Telephone Number</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Designation</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                </div>
                                }
                               
    
                                </div>
                                    
                                    
                                }
    
                            

                            <h2 className="font-semibold text-lg mt-8">Inova Project Lead</h2>
                                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3 mb-6">
                                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Project Lead's Name</label>
                                            <div className="mt-2"> 
                                            <CreateSearch />
                                                </div>
                                                
                                        </div>
                            

                        </div>
                        <h2 className="font-semibold text-lg mt-8">Project Estimators</h2>
                                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                        <div className="sm:col-span-3 mb-6">
                                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Project Estimator's Name</label>
                                            <div className="mt-2"> 
                                            <CreateSearch />
                                                </div>
                                                
                                        </div>
                                        <div className="sm:col-span-4 flex items-center">
                                            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 mr-2 ">New Project Estimator</label>
                                        
                                            <input type="checkbox" value="1" checked={b} onChange={checkbox4}
                                            />   
                                        </div>
                                    </div>
                                    { b &&
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Mobile Number</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Personal Email</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Company Email</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Designation</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Specialized Field</label>
                                        <div className="mt-2"> 
                                            <input
                                                type="text"
                                                
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                            />
                                        </div>
                                    </div>
                                   
                                </div>
                                }
                                    
                    
                    <h2 className="font-semibold text-lg mt-8">Cost</h2>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Total Effort (MD/MH)</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Quoted Value</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Quoting Rate</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">AMC Value</label>
                                <div className="mt-2"> 
                                    <input
                                        type="text"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">RFP Resources</label>
                                <div className="mt-2"> 
                                    <input
                                        type="file"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Output From Inova</label>
                                <div className="mt-2"> 
                                    <input
                                        type="file"
                                        
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"

                                    />
                                    </div>
                                    
                            </div>
                        </div>
                    </div>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <h2 className="font-semibold text-lg sm:col-span-3">To Do</h2>
                        <button type="button" className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Task'}</button>
                        </div>
                            {showForm && (
                            <form >
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                        <input 
                                        type="text" 
                                        value={title} 
                                        onChange={(e)=>setTitle(e.target.value)} 
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label>Description: </label>
                                        <input 
                                        type="text" 
                                        value={description} 
                                        onChange={(e)=>setDescription(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label>Date: </label>
                                        <input type="date" 
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                        value={date} onChange={(e)=>setDate(e.target.value)} />
                                        </div>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button
                                    className="rounded-md bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    type="button"
                                    onClick={handleAddTodo}
                                    >
                                    Add
                                    </button>
                                </div>

                            </form>
                            )}
                            {todos.length > 0 && (

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
                            <thead className="text-xs text-black uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray">Title</th>
                                <th scope="col" className="px-6 py-3 bg-gray">Description</th>
                                <th scope="col" className="px-6 py-3 bg-gray">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {todos.map((todo, index) => (
                                <tr className="bg-white border-b  dark:border-gray-700" key={index}>
                                <td className="px-6 py-4">{todo.title}</td>
                                <td className="px-6 py-4">{todo.description}</td>
                                <td className="px-6 py-4">{todo.date}</td>
                                </tr>
                            ))}
                            </tbody>
                            </table>

                            )}
                        </div>



                    
                        <label>Notes: </label>
                                        <input 
                                        type="text" 
                                        
                                        className="block w-full rounded-md border-0 py-12 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset  sm:text-sm sm:leading-6"
                                        />

                    
                  <button
                    type="submit"
                    className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                            
                    >
                    Save
                    </button>

               </form>
               </div>     
        </div>
  );
};

export default CreateProject;
