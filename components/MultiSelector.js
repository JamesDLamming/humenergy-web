import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { components } from 'react-select';

const MultiSelector = ({
  optionsList,
  selectedOptions,
  setSelectedOptions,
  placeholderOpenText = 'Select...',
  placeholderClosedText = 'Search',
  ...props
}) => {
  // Custom sort function
  const sortOptions = (options) => {
    return options.sort((a, b) => {
      if (a.label === 'Other') return 1;
      if (b.label === 'Other') return -1;
      return a.label.localeCompare(b.label);
    });
  };

  // Apply custom sort function to optionsList and selectedOptions
  const sortedOptionsList = useMemo(
    () => sortOptions([...optionsList]),
    [optionsList]
  );

  // Handler for when new options are selected
  const handleSelectOptions = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const customDropdownSVG = () => {
    return (
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        {/* Explicitly set the fill color to black */}
        <path
          fill="black"
          d="M5.516 7.548c.436-.446 1.045-.481 1.576 0L10 10.405l2.908-2.857c.531-.481 1.141-.446 1.576 0 .436.445.408 1.197 0 1.642l-3.417 3.356c-.27.267-.631.408-.997.408s-.728-.141-.997-.408l-3.417-3.356c-.408-.445-.436-1.197 0-1.642z"
        />
      </svg>
    );
  };

  const CustomDropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {customDropdownSVG()}
      </components.DropdownIndicator>
    );
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: 'rgb(156 163 175 / var(--tw-border-opacity));',
      borderRadius: '0.5rem', // Tailwind's 'rounded-lg'
      boxShadow: state.isFocused ? '0 0 0 1px var(--bgMain)' : 'none',
      padding: state.hasValue
        ? '0.4rem 0.5rem 0.4rem 0.5rem'
        : '0.5rem 0.5rem 0.5rem 1rem', // Tailwind's 'py-2 px-4'
      minHeight: 'auto',
      lineHeight: '1.25',

      '&:hover': {
        borderColor: 'rgb(107 114 128 / var(--tw-border-opacity))',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    input: (provided) => ({
      ...provided,
      padding: '0',
      margin: '0', // Adjust margin to control the input height correctly
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--main)',
      margin: '0',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: '0px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--bgMain)',
      borderRadius: '2rem',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      padding: '0.1rem',
      marginLeft: '0.2rem',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'black',
      transition: 'all .2s ease',
      padding: '0',
      height: '1rem',
      width: '1rem',
      transform: state.selectProps.menuIsOpen,
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      pointerEvents: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.5rem', // Tailwind's 'rounded-lg'
      boxShadow:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Tailwind's 'shadow-sm'
      paddingTop: '0',
      marginTop: '0',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'var(--bgMain)' : 'white',
      padding: '0.5rem 1rem', // Tailwind's 'py-2 px-4'
      '&:hover': {
        backgroundColor: 'var(--bgMain)',
      },
    }),
  };

  const animatedComponents = makeAnimated();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div>
      <Select
        isMulti
        options={sortedOptionsList}
        components={{
          ...animatedComponents,
          DropdownIndicator: CustomDropdownIndicator,
        }}
        value={selectedOptions}
        onChange={setSelectedOptions}
        styles={customStyles}
        className={`basic-multi-select !rounded-lg !shadow-sm border-gray-400 hover:border-gray-500 ${props.className} leading-tight focus:outline-none focus:shadow-outline`}
        classNamePrefix="select"
        placeholder={menuIsOpen ? placeholderOpenText : placeholderClosedText}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
      />
    </div>
  );
};

export default MultiSelector;
