import React, { useEffect, useRef } from 'react';
import { MdClose } from "react-icons/md";
import "../assets/styles/PopupMessage.css"; // ستحتاج إلى ملف CSS لتنسيق النافذة المنبثقة

/**
 * PopupMessage component for displaying a popup message
 *
 * @param {Object} props - Component properties
 * @param {string} props.message - The message to display
 * @param {function} props.onClose - Function to call when the popup is closed
 * @returns {React.Element} - A React element rendering a popup message
 */
const PopupComponent = ({ message, onClose }) => {
    const popupRef = useRef(null);
  
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div className="popup-overlay">
        <div className="popup-box" ref={popupRef}>
          <button className="popup-close" onClick={onClose}>
            <MdClose />
          </button>
          <div className="popup-message">{message}</div>
        </div>
      </div>
    );
  };
  
  export default PopupComponent;