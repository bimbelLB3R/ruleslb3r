import { Radio } from 'antd';

import { useState, useEffect } from 'react';

const MyComponent = () => {
  const [selectedValues, setSelectedValues] = useState({});

  const data = [
    {
      name: 'group1',
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
        { label: 'Option 4', value: '4' },
      ],
    },
    {
      name: 'group2',
      options: [
        { label: 'Option A', value: 'A' },
        { label: 'Option B', value: 'B' },
        { label: 'Option C', value: 'C' },
        { label: 'Option D', value: 'D' },
      ],
    },
  ];

  useEffect(() => {
    // Retrieve the selected values from local storage on initial render
    data.forEach(({ name }) => {
      const savedValue = localStorage.getItem(name);
      if (savedValue) {
        setSelectedValues((selectedValues) => ({
          ...selectedValues,
          [name]: savedValue,
        }));
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((selectedValues) => ({
      ...selectedValues,
      [name]: value,
    }));
    // Save the selected value in local storage
    localStorage.setItem(name, value);
  };

  return (
    <div>
      {data.map(({ name, options }) => (
        <div key={name}>
          <h2>{name}</h2>
          <Radio.Group
            onChange={handleChange}
            value={selectedValues[name]}
            name={name}>
            {options.map(({ label, value }) => (
              <Radio key={value} value={value}>
                {label}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
