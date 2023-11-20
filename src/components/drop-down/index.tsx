import React, { FC, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface DropdownProps {
  data: Array<{ id: number; name: string; [key: string]: any }>;
  dropdownFor: string;
  onSelect?: (value: { id: number; name: string; [key: string]: any } | null) => void;
}

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

const DropDown: FC<DropdownProps & { defaultSelectedId?: number }> = ({ data, dropdownFor, onSelect, defaultSelectedId }) => {
  const [selected, setSelected] = useState<{ id: number; name: string; [key: string]: any } | null>(null);

  useEffect(() => {
    // Set the initial selected value based on the defaultSelectedId prop
    const defaultSelected = data.find((item) => item.id === defaultSelectedId);
    if (defaultSelected) {
      setSelected(defaultSelected);
    }
  }, [data, defaultSelectedId]);
  return (
    <Listbox value={selected} onChange={(value) => { setSelected(value); onSelect && onSelect(value); }}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {selected ? (
                  <span className="ml-3 block truncate">{selected.name}</span>
                ) : (
                  <span className="ml-3 block text-gray-500 truncate">Select Value</span>
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {item.name}
                          </span>
                        </div>
                        {selected && (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default DropDown;