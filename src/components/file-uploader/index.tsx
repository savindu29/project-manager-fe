import React, { useState, ChangeEvent } from 'react';

interface MyFileInputProps {
    id: string;
    onSelectFiles: (id: string, files: File[]) => void;
}

const MyFileInput: React.FC<MyFileInputProps> = ({ id, onSelectFiles }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles(files);
        onSelectFiles(id, files);
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
        onSelectFiles(id, updatedFiles);
    };

    return (
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose Files</label>
            <div className="flex items-center space-x-4">
                <label htmlFor={`fileInput-${id}`} className="relative flex items-center justify-center h-10 w-40 bg-gray-200 text-gray-600 rounded-md cursor-pointer hover:bg-sky-400 focus-within:outline-none focus-within:ring focus-within:border-sky-300">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    <span>Browse</span>
                    <input
                        id={`fileInput-${id}`}
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFileChange}
                    />
                </label>
                <span className="text-gray-500">
                    {selectedFiles.length > 0
                        ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
                        : 'No files selected'}
                </span>
            </div>
            {selectedFiles.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h2>
                    <ul className="grid gap-2 grid-cols-2">
                        {selectedFiles.map((file, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between p-2 border border-gray-300 rounded-md bg-gray-100"
                            >
                                <span className="truncate mr-2">{`${file.name} - ${file.type}`}</span>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyFileInput;
