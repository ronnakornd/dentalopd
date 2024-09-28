import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const YearSelector = ({ startYear = 1900, endYear = new Date().getFullYear()+1, onChange }) => {
  const [selectedYear, setSelectedYear] = useState({ value: endYear-1, label: endYear+542 });

  const handleChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    if (onChange) {
      onChange(selectedOption.value);
    }
  };

  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: year, label: year+543 });
  }

  useEffect(() => {
    if (onChange) {
      onChange(selectedYear.value);
    }
  }, [selectedYear, onChange]);

  return (
    <div >
      <Select
        id="year"
        value={selectedYear}
        onChange={handleChange}
        options={years}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default YearSelector;
