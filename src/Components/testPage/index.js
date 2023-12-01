import React, { useState } from 'react';
import './App.css'; // Import your CSS file
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // Replace with your options

const CustomSearchDropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption : 'Select an option'}
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option, index) => (
            <div key={index} className="option" onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSearchDropdown;
