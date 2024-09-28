import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const MonthSelector = ({ onChange }) => {
const months = [
  { value: 1, label: 'มกราคม' },
  { value: 2, label: 'กุมภาพันธ์' },
  { value: 3, label: 'มีนาคม' },
  { value: 4, label: 'เมษายน' },
  { value: 5, label: 'พฤษภาคม' },
  { value: 6, label: 'มิถุนายน' },
  { value: 7, label: 'กรกฎาคม' },
  { value: 8, label: 'สิงหาคม' },
  { value: 9, label: 'กันยายน' },
  { value: 10, label: 'ตุลาคม' },
  { value: 11, label: 'พฤศจิกายน' },
  { value: 12, label: 'ธันวาคม' },
];

  const getCurrentMonth = () => {
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
    return months.find(month => month.value === currentMonth);
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  useEffect(() => {
    if (onChange) {
      onChange(selectedMonth.value);
    }
  }, [selectedMonth, onChange]);

  const handleChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
    if (onChange) {
      onChange(selectedOption.value);
    }
  };

  return (
    <div className="form-control">
      <Select
        id="month"
        value={selectedMonth}
        onChange={handleChange}
        options={months}
        classNamePrefix="react-select"
        className='w-48'
        placeholder="Select a month"
      />
    </div>
  );
};

export default MonthSelector;
