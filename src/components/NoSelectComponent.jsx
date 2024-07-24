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
  return (
    <div
      className="no-select"
      onMouseDown={(e) => e.preventDefault()}
      draggable="false"
    >
      {children}
    </div>
  );
};

export default NoSelectComponent;
