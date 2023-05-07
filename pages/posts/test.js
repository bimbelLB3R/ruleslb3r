import { Radio } from 'antd';

import { useState, useEffect } from 'react';

const Pilihan = () => {
  const [selectedValue, setSelectedValue] = useState(1);

  useEffect(() => {
    // Retrieve the selected value from local storage on initial render
    const savedValue = localStorage.getItem('selectedValue');
    if (savedValue) {
      setSelectedValue(savedValue);
    }
  }, []);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    // Save the selected value in local storage
    localStorage.setItem('selectedValue', e.target.value);
  };

  return (
    <Radio.Group onChange={handleChange} value={selectedValue}>
      <Radio value="1">Option 1</Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3">Option 3</Radio>
      <Radio value="4">Option 4</Radio>
    </Radio.Group>
  );
};

export default Pilihan;
