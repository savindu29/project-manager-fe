// MultipleSelect.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Framework } from './search-filter';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface MultipleSelectProps {
  items: Framework[];
  onSelectionChange: (selectedItems: number[]) => void;
  disabled:boolean;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({ items, onSelectionChange,disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSelection = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems((prevItems) => [...prevItems, itemId]);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    // Call the callback with the updated selected items whenever it changes
    onSelectionChange(selectedItems);
  }, [selectedItems, onSelectionChange]);

 
return (
  <div className="relative inline-block text-left w-full" ref={dropdownRef}>
    <div>
      <span className="rounded-md shadow-sm">
        <button
          type="button"
          className={`inline-flex w-full rounded-md border border-gray-300 px-4 py-2 ${disabled ? 'bg-zinc-100' : 'bg-white'} text-sm font-medium text-gray-700 focus:outline-none active:bg-gray-200 transition`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="flex items-center overflow-x-auto">
            {selectedItems.length > 0 ? (
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {selectedItems.map((itemId) => (
                  <div
                    key={itemId}
                    className="bg-indigo-500 text-white px-2 py-1 rounded-full flex items-center text-xs"
                  >
                    {items.find((item) => item.id === itemId)?.name}
                    <button
                      type="button"
                      className="ml-1 focus:outline-none text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(itemId);
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <span className="ml-3 block text-gray-500 truncate">Select Value</span>
            )}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </button>
      </span>
    </div>

    {isOpen && (
      <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {items.map((item) => (
            <div
              key={item.id}
              className={`${
                selectedItems.includes(item.id) ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'
              } flex justify-between items-center px-4 py-2 text-sm cursor-pointer`}
              role="menuitem"
              onClick={() => toggleSelection(item.id)}
            >
              <span>{item.name}</span>
              {selectedItems.includes(item.id) && '✓'}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
};

export default MultipleSelect;
