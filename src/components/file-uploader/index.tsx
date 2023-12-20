import React, { useState, ChangeEvent } from "react";

interface MyFileInputProps {
  id: string;
  onSelectFiles: (
    id: string,
    files: { file: File; description: string }[]
  ) => void;
  isDisabled: boolean;
}

const MyFileInput: React.FC<MyFileInputProps> = ({
  id,
  onSelectFiles,
  isDisabled,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<
    { file: File; description: string }[]
  >([]);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
  const [descriptionInput, setDescriptionInput] = useState("");

  const openDescriptionModal = (index: number) => {
    setCurrentFileIndex(index);
    setDescriptionInput(selectedFiles[index]?.description || "");
    setShowDescriptionModal(true);
  };

  const closeDescriptionModal = () => {
    setCurrentFileIndex(null);
    setDescriptionInput("");
    setShowDescriptionModal(false);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const filesWithDescriptions: { file: File; description: string }[] = [];

    for (const file of files) {
      filesWithDescriptions.push({ file, description: "" });
      openDescriptionModal(filesWithDescriptions.length - 1);
    }

    setSelectedFiles(filesWithDescriptions);
    onSelectFiles(id, filesWithDescriptions);
  };

  const handleDescriptionChange = () => {
    if (currentFileIndex !== null) {
      const updatedFiles = [...selectedFiles];
      updatedFiles[currentFileIndex].description = descriptionInput;
      setSelectedFiles(updatedFiles);
      onSelectFiles(id, updatedFiles);
      closeDescriptionModal();
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Choose Files
      </label>
      <div className="flex items-center space-x-4">
        <label
          htmlFor={`fileInput-${id}`}
          className="flex items-center justify-center w-40 h-10 bg-gray-200 text-gray-600 rounded-md cursor-pointer  focus-within:outline-none focus-within:ring focus-within:border-sky-300"
        >
          <input
            id={`fileInput-${id}`}
            type="file"
            className="sr-only"
            multiple
            onChange={handleFileChange}
            disabled={isDisabled}
          />
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          <span>Browse</span>
        </label>
        <span className="text-gray-500">
          {selectedFiles.length > 0
            ? `${selectedFiles.length} file${
                selectedFiles.length > 1 ? "s" : ""
              } selected`
            : "No files selected"}
        </span>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-medium text-gray-700 mb-2">
            Selected Files:
          </h2>
          <ul className="grid gap-2 grid-cols-2">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex flex-col p-2 border border-gray-300 rounded-md bg-gray-100"
              >
                <span
                  className="truncate mb-2"
                  onClick={() => openDescriptionModal(index)}
                >
                  {`${file.description || "No description"} - ${
                    file.file.type
                  }`}
                </span>
                {/* <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFile(index)}
                >
                  Remove
                </button> */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Description Modal */}
      {currentFileIndex !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center  ${
            showDescriptionModal ? "" : "hidden"
          }`}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-md z-10 w-96">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rename
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-2 mb-2"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                className=" bg-sky-500 text-white rounded-md py-2 hover:bg-sky-700 mr-6 px-4"
                onClick={handleDescriptionChange}
              >
                Save Description
              </button>
              <button
                className=" bg-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-400 ml-6 px-4"
                onClick={closeDescriptionModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFileInput;
