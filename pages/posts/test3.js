import { useState, useEffect } from 'react';
import { Radio } from 'antd';
const MyComponent = () => {
  const [selectedValues, setSelectedValues] = useState({});

  const data = [
    [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 },
      { label: 'Option 4', value: 4 },
    ],
    [
      { label: 'Option A', value: 'A' },
      { label: 'Option B', value: 'B' },
      { label: 'Option C', value: 'C' },
      { label: 'Option D', value: 'D' },
    ],
  ];
  useEffect(() => {
    // Retrieve the selected values from local storage on initial render
    data.forEach((group, index) => {
      const savedValue = localStorage.getItem(`group${index}`);
      if (savedValue) {
        setSelectedValues((selectedValues) => ({
          ...selectedValues,
          [`group${index}`]: savedValue,
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
      {data.map((options, index) => (
        <div key={`group${index}`}>
          <h2>Group {index + 1}</h2>
          <Radio.Group
            onChange={handleChange}
            value={selectedValues[`group${index}`]}
            name={`group${index}`}>
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
