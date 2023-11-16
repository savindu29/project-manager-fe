import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

interface Country {
  label: string;
  value: string;
}

function CountrySelector() {
  const [value, setValue] = useState<Country | null>(null);

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (selectedOption: Country | null) => {
    setValue(selectedOption);
  }

  return (
    <Select
      options={options}
      value={value}
      onChange={changeHandler}
    />
  );
}

export default CountrySelector;