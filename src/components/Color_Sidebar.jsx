import React, { useState, useEffect } from "react";
import "./Color_Sidebar.css"; 

function Color_Sidebar({ availableColors, onSelectColor }) 
{
  const [selectedColor, setSelectedColor] = useState(null);
  
  useEffect(() => {
    setSelectedColor(null); // Reset selected color when available colors change
  }, [availableColors]);

  const handleClick = (color) => {
    const newColor = selectedColor === color ? null : color;
    setSelectedColor(newColor);
    onSelectColor(newColor); // Pass null if deselected
  };

    return (
      <div className="color-sidebar">
        <h4>Filter by Color</h4>
        <div className="color-options">
          {availableColors.length === 0 ? (
            <p>No color filters available.</p>
          ) : (
            availableColors.map((color) => 
            (
              <button
                key={color}
                className={`color-button ${selectedColor === color ? "selected" : ""}`}
                onClick={() => handleClick(color)}
              >
                {color}
              </button>
              
            ))
          )}
        </div>
        
      </div>
    );
  }
  
  export default Color_Sidebar;
  