import React, {useState, useEffect, FC} from 'react';
import axios from 'axios';
import { HiPlus } from 'react-icons/hi';
import {APP_API_BASE_URL} from "../../../apis";

interface SearchResult {
  id: number;
  name: string;
  mobile: string;
  companyEmail: string;
  privateEmail: string;
  designation: string;
  specializedField: string;
}

interface SearchResponse {
  code: number;
  message: string;
  data: {
    count: number;
    data: SearchResult[];
  };
}

interface SearchFormProps {
  onAddClick: (selectedResultId: number) => void;
  disabled: boolean;
}

function SearchForm({ onAddClick, disabled }: SearchFormProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [isFocus, setFocus] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchText.trim() !== '') {
      fetchSearchResults(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const fetchSearchResults = async (text: string) => {
    try {
      const response = await axios.get<SearchResponse>(
          `${APP_API_BASE_URL}/api/v1/responsible-person/search?page=1&size=5&searchtext=${text}`
      );

      setSearchResults(response.data.data.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const buttonClick = (selectedResult: SearchResult) => {
    onAddClick(selectedResult.id);
    setSearchText('');
  };

 

  return (
    <form className="flex items-center w-full px-4 relative">
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
          className="bg-white border text-gray-900 text-sm rounded-lg block w-full pl-10 py-2.5 placeholder-gray-400 focus:outline-none focus:border-blue-300"
          placeholder="Search Employee ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          disabled={disabled}
          required
        />
      </div>
      <button

        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg border hover:bg-blue-600 focus:outline-none"
        disabled={true}
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

      {/* Display search results */}
      {isFocus && searchResults.length > 0 && (
        <div className="absolute z-20 top-12 bg-white border border-gray-300 w-auto rounded-lg shadow-lg">
          <ul>
            {searchResults.map((result) => (
              <li key={result.id} className="py-1 px-4 hover:bg-gray-100 px-4 py-2 flex w-[32rem]">
                <div className="w-full">
                  {result.name} - <span className="text-xs">{result.designation}</span>
                </div>
                <div className="flex justify-end w-20 px-4">
                  <button
                    type="button"
                    className="text-gray-400 bg-gray-200 p-2 rounded z-40"
                    onClick={() => buttonClick(result)}
                  >
                    <HiPlus />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

export default SearchForm;
