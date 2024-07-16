// NoSelectComponent.js
import React from "react";

/**
 * Component that prevents text selection within its children.
 * Useful for creating elements like buttons where text selection
 * should be disabled.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components or elements
 * @returns {JSX.Element} NoSelectComponent
 */
const NoSelectComponent = ({ children }) => {
  /**
   * Prevents default action on mouse down event.
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e - Mouse down event object
   */
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <div className="no-select" onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default NoSelectComponent;
