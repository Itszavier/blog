import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.css';

export interface Option {
  name: string;
  value: string | number;
  type: 'fontFamily' | 'paragraph' | 'heading'; // Added 'type' property
}

interface DropdownProps {
  options: Option[];
  selectedValue: string;
  onChange?: (option: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onChange = () => {},
}) => {
  const [defaultValue, setDefaultValue] = useState(selectedValue || "Paragraph");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setDefaultValue(option.name)
    onChange(option);
    setIsOpen(false);
    setHighlightedIndex(options.indexOf(option));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
    } else if (e.key === 'Enter') {
      onChange(options[highlightedIndex]);
      setDefaultValue(options[highlightedIndex].name)
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const getOptionStyle = (option: Option) => {
    let style = '';

    // Apply custom styles based on option type and value
    if (option.type === 'heading') {
      if (option.name === 'Heading 1') {
        style = `${styles.heading1}`;
      } else if (option.name === 'Heading 2') {
        style = `${styles.heading2}`;
      }else if (option.name === 'Heading 3'){
        style = `${styles.heading3}`
      }
    } 

    return style;
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles['dropdown-container']} ref={dropdownRef}>
      <div
        className={styles['custom-dropdown']}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {defaultValue}
        <span className={styles.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <div className={`${styles['dropdown-options']} ${styles.active}`} role="listbox">
          {options.map((option, index) => (
            <div
              key={index}
              className={`${styles['dropdown-option']} ${getOptionStyle(option)} ${highlightedIndex === index ? styles.highlighted : ''}`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={highlightedIndex === index}
              tabIndex={highlightedIndex === index ? 0 : -1}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
