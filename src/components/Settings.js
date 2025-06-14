import React, { useState, useEffect } from 'react';
import './Settings.css';

const colorPresets = [
  { name: 'Cyan', value: '#00bcd4' },
  { name: 'Blue', value: '#2196f3' },
  { name: 'Purple', value: '#9c27b0' },
  { name: 'Pink', value: '#e91e63' },
  { name: 'Red', value: '#f44336' },
  { name: 'Orange', value: '#ff9800' },
  { name: 'Yellow', value: '#ffeb3b' },
  { name: 'Green', value: '#4caf50' },
  { name: 'Teal', value: '#009688' },
  { name: 'Indigo', value: '#3f51b5' },
  { name: 'Brown', value: '#795548' },
  { name: 'Gray', value: '#607d8b' }
];

const Settings = ({ onThemeChange }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#00bcd4');

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedColor = localStorage.getItem('secondaryColor') || '#00bcd4';
    
    setDarkMode(savedDarkMode);
    setSelectedColor(savedColor);
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    onThemeChange({ darkMode: newDarkMode, secondaryColor: selectedColor });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    localStorage.setItem('secondaryColor', color);
    onThemeChange({ darkMode, secondaryColor: color });
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      
      <div className="settings-section">
        <h3>Theme</h3>
        <div className="theme-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeToggle}
            />
            <span className="slider round"></span>
          </label>
          <span className="theme-label">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
      </div>

      <div className="settings-section">
        <h3>Accent Color</h3>
        <div className="color-presets">
          {colorPresets.map((color) => (
            <button
              key={color.value}
              className={`color-preset ${selectedColor === color.value ? 'selected' : ''}`}
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorChange(color.value)}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings; 